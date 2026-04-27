// ============================================================================
// State Store — In-memory user state management
// For hackathon: uses in-memory Map (resets on server restart)
// Production: swap with database
// ============================================================================

import { UserState, SkillData } from '../types';

const store = new Map<string, UserState>();

export function getDefaultState(userId: string, userName?: string): UserState {
  return {
    userId,
    userName: userName || 'Student',
    goal: {
      title: '',
      timeline_days: 0,
      current_phase: '',
      phase_progress_pct: 0,
      phases: [],
    },
    skills: {},
    patterns: {
      learning_style: 'unknown',
      motivation_type: 'unknown',
      burnout_risk: 0,
      avg_daily_study_minutes: 0,
      avoidance_signals: [],
      repeated_errors: [],
    },
    memory: {
      recent_topics: [],
      last_mistake: null,
      milestones_hit: [],
      last_breakthrough: null,
    },
    consistency: {
      streak_days: 0,
      last_active: new Date().toISOString(),
      this_week_active_days: 0,
      email_open_rate_7d: 1.0,
    },
    predictions: {
      dropout_risk: 0,
      days_until_predicted_dropout: null,
      next_breakthrough_topic: null,
      recommended_challenge_difficulty: 3,
    },
    challenge_history: [],
    created_at: new Date().toISOString(),
  };
}

export function getUserState(userId: string): UserState | null {
  const state = store.get(userId);
  if (!state) return null;
  return applyConfidenceDecay({ ...state });
}

export function setUserState(userId: string, state: UserState): void {
  store.set(userId, state);
}

export function initializeUser(userId: string, userName?: string): UserState {
  const state = getDefaultState(userId, userName);
  store.set(userId, state);
  return state;
}

export function updateUserState(userId: string, updates: Partial<UserState>): UserState {
  const current = store.get(userId) || getDefaultState(userId);
  const merged = deepMerge(current as unknown as Record<string, unknown>, updates as unknown as Record<string, unknown>) as unknown as UserState;
  store.set(userId, merged);
  return merged;
}

/**
 * CONFIDENCE DECAY RULE (from PRD):
 * If a skill's last_tested is > 7 days ago, automatically reduce confidence by 1.
 */
export function applyConfidenceDecay(state: UserState): UserState {
  const now = new Date();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  const updatedSkills: Record<string, SkillData> = {};

  for (const [name, skill] of Object.entries(state.skills)) {
    const lastTested = skill.last_tested ? new Date(skill.last_tested) : null;
    const daysSince = lastTested ? (now.getTime() - lastTested.getTime()) : Infinity;

    if (daysSince > sevenDaysMs && skill.confidence > 0) {
      updatedSkills[name] = {
        ...skill,
        confidence: Math.max(0, skill.confidence - 1),
      };
    } else {
      updatedSkills[name] = { ...skill };
    }
  }

  return { ...state, skills: updatedSkills };
}

export function getAllUsers(): UserState[] {
  return Array.from(store.values());
}

// Deep merge utility
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
