import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '../../../../lib/agents/engine';
import { getUserState, updateUserState, initializeUser } from '../../../../lib/state/store';
import { AgentType } from '../../../../lib/types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ module: string }> }
) {
  let resolvedModuleName = 'unknown';
  try {
    const resolvedParams = await params;
    resolvedModuleName = resolvedParams.module;
    const agentModule = resolvedParams.module as AgentType;
    const body = await request.json();
    const { userId, userName, context } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let state = getUserState(userId);
    if (!state) {
      state = initializeUser(userId, userName);
    }

    // Pass the context object dynamically to the agent
    const response = await runAgent(agentModule, state, context || {});

    if (response.state_updates && Object.keys(response.state_updates).length > 0) {
      updateUserState(userId, response.state_updates);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(`Agent module error (${resolvedModuleName}):`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
