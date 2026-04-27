// ============================================================================
// Adaptive Student Copilot — Type Definitions
// Matches PRD state spec exactly
// ============================================================================

export type LearningStyle = 'visual' | 'hands-on' | 'sequential' | 'exploratory' | 'social' | 'unknown';
export type MotivationType = 'mastery' | 'urgency' | 'competition' | 'consistency' | 'confidence' | 'unknown';
export type BackgroundLevel = 'beginner' | 'intermediate' | 'advanced';

export type ChallengeType =
  | 'recall'
  | 'trap'
  | 'constraint'
  | 'roleplay'
  | 'connection'
  | 'spot_mistake'
  | 'teaching'
  | 'debugging'
  | 'design';

export type AgentType = 'goal' | 'skill_gap' | 'challenge' | 'psychology' | 'prediction' | 'planner';

export interface SkillData {
  confidence: number; // 0-10
  last_tested: string | null; // ISO date
  success_rate: number; // 0.0-1.0
  times_tested: number;
  contexts: string[];
}

export interface RepeatedError {
  topic: string;
  error: string;
  count: number;
}

export interface GoalData {
  title: string;
  timeline_days: number;
  current_phase: string;
  phase_progress_pct: number; // 0-100
  phases?: RoadmapPhase[];
}

export interface RoadmapPhase {
  number: number;
  title: string;
  duration_days: number;
  topics: string[];
  milestones: string[];
  resources: string[];
  status: 'upcoming' | 'active' | 'completed';
}

export interface PatternData {
  learning_style: LearningStyle;
  motivation_type: MotivationType;
  burnout_risk: number; // 0.0-1.0
  avg_daily_study_minutes: number;
  avoidance_signals: string[];
  repeated_errors: RepeatedError[];
}

export interface MemoryData {
  recent_topics: string[];
  last_mistake: { topic: string; error: string } | null;
  milestones_hit: string[];
  last_breakthrough: string | null; // ISO date
}

export interface ConsistencyData {
  streak_days: number;
  last_active: string; // ISO date
  this_week_active_days: number; // 0-7
  email_open_rate_7d: number; // 0.0-1.0
}

export interface PredictionData {
  dropout_risk: number; // 0.0-1.0
  days_until_predicted_dropout: number | null;
  next_breakthrough_topic: string | null;
  recommended_challenge_difficulty: number; // 1-10
}

export interface UserState {
  userId: string;
  userName?: string;
  goal: GoalData;
  skills: Record<string, SkillData>;
  patterns: PatternData;
  memory: MemoryData;
  consistency: ConsistencyData;
  predictions: PredictionData;
  challenge_history?: ChallengeType[];
  last_email_sent?: string;
  today_topic?: string;
  created_at?: string;
}

export interface AgentResponse {
  action_taken: string;
  reasoning: string;
  state_updates: Partial<UserState>;
  user_message: string;
  next_trigger: string;
}

export interface CheckInData {
  userId: string;
  topic: string;
  confidence_self_report: number; // 0-10
  time_spent_minutes: number;
  notes?: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  type: 'multiple_choice' | 'short_answer';
  options?: string[];
  correct_answer: string;
  explanation: string;
}

export interface QuizResult {
  userId: string;
  topic: string;
  score: number; // 0.0-1.0
  questions_total: number;
  questions_correct: number;
  timestamp: string;
}

export interface DailyEmail {
  subject_a: string;
  subject_b: string;
  greeting: string;
  yesterday_insight: string;
  today_plan: {
    study_topic: string;
    practice: string;
    review: string;
  };
  challenge: string;
  behavioral_nudge: string;
  streak_close: string;
}
