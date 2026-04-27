// ============================================================================
// Agent Engine — Orchestrates agent calls via Gemini API or mock fallback
// ============================================================================

import { AgentType, AgentResponse, UserState } from '../types';
import { MASTER_PROMPT } from './master-prompt';
import { AGENT_BLOCKS } from './agent-blocks';
import { getMockResponse } from './mock-responses';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

export async function runAgent(
  agentType: AgentType,
  userState: UserState,
  extraInputs?: Record<string, unknown>
): Promise<AgentResponse> {
  // If no API key, use mock responses
  if (!GEMINI_API_KEY) {
    console.log(`[Agent Engine] No API key — using mock response for ${agentType}`);
    return getMockResponse(agentType, extraInputs?.user_goal_text as string);
  }

  try {
    const systemPrompt = MASTER_PROMPT + '\n\n' + AGENT_BLOCKS[agentType];

    const userMessage = JSON.stringify({
      user_state: userState,
      ...extraInputs,
    }, null, 2);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: userMessage }],
            },
          ],
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status}`);
      return getMockResponse(agentType, extraInputs?.user_goal_text as string);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return parseAgentResponse(rawText, agentType, extraInputs?.user_goal_text as string);
  } catch (error) {
    console.error(`Agent engine error for ${agentType}:`, error);
    return getMockResponse(agentType, extraInputs?.user_goal_text as string);
  }
}

function parseAgentResponse(rawText: string, agentType: AgentType, userGoal?: string): AgentResponse {
  try {
    // Try to extract JSON from the response
    let jsonStr = rawText.trim();

    // Remove markdown code fences if present
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);

    // Validate required fields
    return {
      action_taken: parsed.action_taken || 'Agent completed task',
      reasoning: parsed.reasoning || 'No reasoning provided',
      state_updates: parsed.state_updates || {},
      user_message: parsed.user_message || 'No message generated',
      next_trigger: parsed.next_trigger || 'none',
    };
  } catch {
    console.error('Failed to parse agent response, falling back to mock');
    return getMockResponse(agentType, userGoal);
  }
}

/**
 * Run the full daily orchestration pipeline:
 * SkillGap → Memory → Planner → Challenge
 */
export async function runDailyOrchestration(userState: UserState): Promise<{
  skillGap: AgentResponse;
  memory: AgentResponse;
  planner: AgentResponse;
  challenge: AgentResponse;
}> {
  const skillGap = await runAgent('skill_gap', userState);
  const memory = await runAgent('memory', userState, {
    recent_events: skillGap.user_message,
  });
  const planner = await runAgent('planner', userState, {
    memory_updates: memory.user_message,
    current_phase_topics: userState.goal.phases?.find(p => p.status === 'active')?.topics || [],
  });
  const challenge = await runAgent('challenge', userState, {
    today_plan: planner.user_message,
    top_gap: skillGap.user_message,
    challenge_history: userState.challenge_history || [],
  });

  return { skillGap, memory, planner, challenge };
}
