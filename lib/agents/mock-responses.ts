// ============================================================================
// Mock Responses — Realistic agent responses for demo without API key
// ============================================================================

import { AgentResponse, AgentType } from '../types';

export function getMockResponse(agentType: AgentType, userGoal?: string): AgentResponse {
  switch (agentType) {
    case 'goal':
      return {
        action_taken: 'Goal structured',
        reasoning: 'User provided text indicating desire to become AI Engineer. Set to 180 days, intermediate level.',
        state_updates: {
          goal: {
            title: userGoal || 'Become an AI Engineer',
            timeline_days: 180,
            current_phase: 'Phase 1',
            phase_progress_pct: 0
          }
        },
        user_message: 'I have formalized your goal: Become an AI Engineer within 180 days at an intense pace. Let us generate the roadmap next.',
        next_trigger: 'roadmap',
      };

    case 'roadmap':
      return {
        action_taken: 'Roadmap generated',
        reasoning: 'Generated 5 phases focusing on foundational math, ML core, Deep Learning, and MLOps.',
        state_updates: {
          goal: {
            title: 'Become an AI Engineer',
            timeline_days: 180,
            current_phase: 'Phase 1: Foundations',
            phase_progress_pct: 0,
            phases: [
              {
                number: 1,
                title: 'Foundations',
                duration_days: 30,
                topics: ['Python Advanced', 'Linear Algebra', 'Probability & Statistics'],
                milestones: ['Solve 20 coding challenges'],
                resources: ['Mathematics for ML'],
                status: 'active'
              }
            ]
          }
        },
        user_message: 'Your roadmap is ready. Phase 1 begins today: Foundations (30 days). We will master Python and Linear Algebra.',
        next_trigger: 'none',
      };

    case 'memory':
      return {
        action_taken: 'Memory compressed',
        reasoning: 'User repeatedly struggled with recursion and avoided probability. Storing as high-value signals.',
        state_updates: {
          memory: {
            recent_topics: ['Python Advanced'],
            last_mistake: { topic: 'Recursion', error: 'Base case missing' },
            milestones_hit: [],
            last_breakthrough: null
          },
          patterns: {
            learning_style: 'hands-on',
            motivation_type: 'mastery',
            burnout_risk: 0.2,
            avg_daily_study_minutes: 45,
            avoidance_signals: ['Probability'],
            repeated_errors: []
          }
        },
        user_message: '',
        next_trigger: 'none',
      };

    case 'skill_gap':
      return {
        action_taken: 'Skill gap identified',
        reasoning: 'Analyzed GitHub commits: modularity is poor. Confidence in probability is 2. Avoidance detected.',
        state_updates: {},
        user_message: 'Top gap: You cannot apply matrix operations confidently and your codebase modularity is poor. You have avoided math for 6 days.',
        next_trigger: 'challenge',
      };

    case 'challenge':
      return {
        action_taken: 'Challenge generated',
        reasoning: 'Using forced constraint challenge for avoided math topic.',
        state_updates: {},
        user_message: '**Challenge:** Implement matrix multiplication in Python using ONLY nested loops. Maximum 10 lines of code. No NumPy.',
        next_trigger: 'planner',
      };

    case 'planner':
      return {
        action_taken: 'Plan assembled',
        reasoning: 'Combined study topic, challenge, and behavioral nudge.',
        state_updates: {},
        user_message: `Today's Plan:\n- Study: Eigenvalues\n- Challenge: Matrix Multiplication\nInsight: You learn best by building. We will focus on hands-on coding.\nWarning: You skipped math yesterday. Do not make it a habit.`,
        next_trigger: 'none',
      };

    case 'progress':
      return {
        action_taken: 'Progress analyzed',
        reasoning: 'User improved in Python but stagnated in Probability.',
        state_updates: {},
        user_message: 'Your problem-solving in Python is improving quickly, but your theoretical understanding is below the expected level.',
        next_trigger: 'none',
      };

    case 'social':
      return {
        action_taken: 'Social comparison generated',
        reasoning: 'Compared to peers at Day 12.',
        state_updates: {
          social_metrics: {
            peer_percentile: 85,
            consistency_vs_peers: 1.2
          }
        },
        user_message: 'Users at your level:\n✔ Most have mastered Python loops.\n⚠️ You are behind in: Probability distribution understanding.',
        next_trigger: 'none',
      };

    case 'competitive':
      return {
        action_taken: 'Rankings generated',
        reasoning: 'Calculated leaderboard standing.',
        state_updates: {},
        user_message: `Today's Ranking:\n1. Alex (15 day streak)\n2. You (12 day streak)\n3. Sarah (10 day streak)`,
        next_trigger: 'none',
      };

    case 'reality_check':
      return {
        action_taken: 'Reality check delivered',
        reasoning: 'User marked 2 hours of study but committed no code.',
        state_updates: {},
        user_message: 'You spent 2 hours learning but produced no code. This is passive learning. Fix: Open your editor and implement the concept immediately.',
        next_trigger: 'none',
      };

    case 'persona':
      return {
        action_taken: 'Persona updated',
        reasoning: 'User grinds through tasks but avoids deep theoretical dives.',
        state_updates: {
          persona: 'Grinder'
        },
        user_message: 'You are behaving like a Grinder. You put in the hours, but you avoid the hard, confusing concepts. Fix: Spend 20 minutes today struggling with something you do not understand.',
        next_trigger: 'none',
      };

    case 'resource_suggestion':
      return {
        action_taken: 'Resources suggested',
        reasoning: 'User is a TECH profile lacking real-time system experience.',
        state_updates: {},
        user_message: 'You lack real-time system experience.\nBuild: Chat app with WebSockets.\nLinks:\n- GeeksforGeeks: WebSockets Basics\n- GitHub: reference-chat-app-repo',
        next_trigger: 'none',
      };

    default:
      return {
        action_taken: 'Unknown agent type',
        reasoning: 'No matching agent block',
        state_updates: {},
        user_message: 'Error: Unknown agent type',
        next_trigger: 'none',
      };
  }
}
