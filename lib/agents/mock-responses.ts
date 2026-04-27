// ============================================================================
// Mock Responses — Realistic agent responses for demo without API key
// ============================================================================

import { AgentResponse, AgentType } from '../types';

export function getMockResponse(agentType: AgentType, userGoal?: string): AgentResponse {
  switch (agentType) {
    case 'goal':
      return {
        action_taken: 'Generated 5-phase learning roadmap for AI Engineering',
        reasoning: `User goal: "${userGoal || 'Become an AI Engineer'}". Background: intermediate. Timeline: 180 days. This is achievable with focused effort. Critical skills identified: Python ML libraries, neural network architecture, deployment pipelines.`,
        state_updates: {
          goal: {
            title: userGoal || 'Become an AI Engineer',
            timeline_days: 180,
            current_phase: 'Phase 1: Foundations',
            phase_progress_pct: 0,
            phases: [
              {
                number: 1,
                title: 'Foundations',
                duration_days: 30,
                topics: ['Python Advanced', 'Linear Algebra', 'Probability & Statistics', 'NumPy & Pandas'],
                milestones: ['Solve 20 Python coding challenges', 'Implement matrix operations from scratch', 'Build a data analysis pipeline'],
                resources: ['Chapter 1-4 of "Mathematics for ML"', 'fast.ai Practical Deep Learning Course (Lesson 1-3)', 'Kaggle Learn: Pandas Course'],
                status: 'active' as const,
              },
              {
                number: 2,
                title: 'Machine Learning Core',
                duration_days: 35,
                topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering', 'Scikit-learn'],
                milestones: ['Build 3 ML models from scratch', 'Achieve >85% accuracy on a Kaggle dataset', 'Write a model evaluation report'],
                resources: ['Chapters 1-8 of "Hands-On ML with Scikit-Learn"', 'Andrew Ng ML Specialization (Courses 1-2)', 'Kaggle Competitions: Titanic + Housing Prices'],
                status: 'upcoming' as const,
              },
              {
                number: 3,
                title: 'Deep Learning',
                duration_days: 40,
                topics: ['Neural Networks', 'CNNs', 'RNNs/LSTMs', 'Transformers', 'PyTorch'],
                milestones: ['Implement a CNN for image classification', 'Build an LSTM text generator', 'Fine-tune a pre-trained transformer'],
                resources: ['fast.ai Course Part 2', 'PyTorch official tutorials', '"Deep Learning" by Goodfellow (Chapters 6-10)'],
                status: 'upcoming' as const,
              },
              {
                number: 4,
                title: 'AI Engineering',
                duration_days: 40,
                topics: ['MLOps', 'Model Deployment', 'API Design', 'Vector Databases', 'LLM Integration'],
                milestones: ['Deploy a model to production', 'Build a RAG application', 'Create an AI-powered API'],
                resources: ['MLOps Zoomcamp', 'LangChain documentation', 'Designing ML Systems by Chip Huyen'],
                status: 'upcoming' as const,
              },
              {
                number: 5,
                title: 'Portfolio & Mastery',
                duration_days: 35,
                topics: ['System Design', 'Portfolio Projects', 'Technical Writing', 'Interview Prep'],
                milestones: ['Complete 2 portfolio projects', 'Write 3 technical blog posts', 'Pass 5 mock system design interviews'],
                resources: ['System Design Interview by Alex Xu', 'GitHub portfolio best practices', 'Pramp mock interviews'],
                status: 'upcoming' as const,
              },
            ],
          },
          skills: {
            'Python Advanced': { confidence: 0, last_tested: null, success_rate: 0, times_tested: 0, contexts: [] },
            'Linear Algebra': { confidence: 0, last_tested: null, success_rate: 0, times_tested: 0, contexts: [] },
            'Probability & Statistics': { confidence: 0, last_tested: null, success_rate: 0, times_tested: 0, contexts: [] },
            'NumPy & Pandas': { confidence: 0, last_tested: null, success_rate: 0, times_tested: 0, contexts: [] },
          },
        },
        user_message: `Here's your 180-day roadmap to AI Engineering:\n\n**Phase 1: Foundations (30 days)** — Build rock-solid Python skills, mathematical intuition, and data manipulation. You'll solve 20 coding challenges and build your first data pipeline.\n\n**Phase 2: ML Core (35 days)** — Supervised & unsupervised learning from scratch. You'll build 3 models and compete on Kaggle.\n\n**Phase 3: Deep Learning (40 days)** — Neural nets, CNNs, transformers. You'll fine-tune pre-trained models and build real applications.\n\n**Phase 4: AI Engineering (40 days)** — Production deployment, MLOps, RAG systems. This is where you become an engineer, not just a data scientist.\n\n**Phase 5: Portfolio & Mastery (35 days)** — Ship projects, write about them, prep for interviews.\n\n**Critical skills that will make or break you:** Python fluency, neural network intuition, and deployment confidence.\n\nYour first challenge arrives tomorrow. Let's go.`,
        next_trigger: 'send_first_challenge_in_24h',
      };

    case 'skill_gap':
      return {
        action_taken: 'Identified top skill gap: Linear Algebra application weakness',
        reasoning: 'Linear Algebra confidence is 2 (awareness only), last tested 9 days ago (decayed from 3). User has avoided math-related topics for 6 days — avoidance pattern detected. This is blocking Phase 1 progress since matrix operations are a prerequisite for ML.',
        state_updates: {
          skills: {
            'Linear Algebra': { confidence: 2, last_tested: new Date(Date.now() - 9 * 86400000).toISOString(), success_rate: 0.3, times_tested: 3, contexts: ['basic operations'] },
          },
          patterns: {
            learning_style: 'hands-on' as const,
            motivation_type: 'mastery' as const,
            burnout_risk: 0.25,
            avg_daily_study_minutes: 45,
            avoidance_signals: ['Linear Algebra', 'Probability'],
            repeated_errors: [{ topic: 'Linear Algebra', error: 'Confuses dot product with element-wise multiplication', count: 3 }],
          },
        },
        user_message: 'Top gap: You cannot apply matrix operations confidently. You\'ve been avoiding math topics for 6 days. Tomorrow\'s challenge will break this avoidance pattern.',
        next_trigger: 'generate_challenge_for_linear_algebra',
      };

    case 'challenge':
      return {
        action_taken: 'Generated constraint challenge for Linear Algebra',
        reasoning: 'Top gap is Linear Algebra (confidence: 2). User has hands-on learning style → implementation challenge. Motivation type: mastery → frame as skill evolution. Difficulty: 2 + 2 = 4. Last 2 challenge types were recall and trap → using constraint type.',
        state_updates: {},
        user_message: `**Today's Challenge: Matrix Mastery** (Difficulty: 4/10)\n\nImplement these 3 matrix operations in Python using ONLY nested loops (no NumPy):\n\n1. Matrix multiplication for two 3×3 matrices\n2. Matrix transpose\n3. Determinant of a 2×2 matrix\n\nConstraint: Each function must be 10 lines or fewer.\n\nTime limit: 30 minutes.\n\nThis builds the intuition that NumPy abstracts away. When you understand what's happening under the hood, debugging ML code becomes dramatically easier.\n\n---\n**Bonus (optional):** Extend your determinant function to handle 3×3 matrices using cofactor expansion.`,
        next_trigger: 'quiz_on_linear_algebra_in_24h',
      };

    case 'psychology':
      return {
        action_taken: 'Detected learning patterns: hands-on learner, mastery-motivated, low burnout risk',
        reasoning: 'Behavioral evidence: User completed 80% of implementation challenges vs 40% of reading-based ones → hands-on preference. User spent extra time on challenging problems rather than skipping → mastery motivation. 5/7 active days this week, consistent study times → burnout_risk = 0.2.',
        state_updates: {
          patterns: {
            learning_style: 'hands-on' as const,
            motivation_type: 'mastery' as const,
            burnout_risk: 0.2,
            avg_daily_study_minutes: 52,
            avoidance_signals: ['Linear Algebra'],
            repeated_errors: [],
          },
        },
        user_message: 'Pattern detected: You learn best by building, not reading. Future challenges will prioritize implementation over theory. Your consistency is strong — keep showing up.',
        next_trigger: 'update_challenge_style_preferences',
      };

    case 'prediction':
      return {
        action_taken: 'Calculated predictions: low dropout risk, breakthrough approaching in Python',
        reasoning: 'Streak: 12 days (strong). Completion rate: 0.73 (good). Email open rate: 0.85. No check-in gaps. Python Advanced confidence at 6, approaching mastery threshold of 7. Dropout risk calculation: 0 + 0 + 0 + 0 + 0 = 0.05 (baseline).',
        state_updates: {
          predictions: {
            dropout_risk: 0.05,
            days_until_predicted_dropout: null,
            next_breakthrough_topic: 'Python Advanced',
            recommended_challenge_difficulty: 6,
          },
        },
        user_message: 'You\'re approaching a breakthrough in Python. 2-3 more successful challenges and you\'ll hit mastery level. Keep pushing.',
        next_trigger: 'check_breakthrough_readiness_in_3_days',
      };

    case 'planner':
      return {
        action_taken: 'Assembled daily email for Day 12',
        reasoning: 'Streak: 12 days. Yesterday: completed constraint challenge on matrix ops. Top gap: Linear Algebra (confidence 3). Review candidate: Python Advanced (confidence 6). Motivation: mastery → growth-focused tone.',
        state_updates: {},
        user_message: `Day 12 — and you're still here. That's not nothing.\n\nYesterday you wrestled with matrix operations without NumPy. Your transpose function was clean. Your determinant function had an indexing bug — that's the kind of mistake that teaches you more than getting it right would have.\n\n**Today's Plan:**\n📖 Study: Eigenvalues & Eigenvectors — Chapter 4 of "Mathematics for ML" (30 min)\n🔨 Practice: Today's challenge (see below)\n🔄 Review: Python list comprehensions — write 5 one-liners from memory (10 min)\n\n**Challenge:** Implement a function that checks if a matrix is symmetric. Then write a second function that finds the trace. Constraint: Handle edge cases (non-square matrices, empty matrices). Under 25 minutes.\n\nYou've been avoiding the pure math topics. I get it — implementation feels more productive. But the math IS the foundation. Today we face it together.\n\n🔥 Day 12. You're in the top 15% of learners who make it this far. Don't stop building.`,
        next_trigger: 'send_email_then_quiz_in_24h',
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
