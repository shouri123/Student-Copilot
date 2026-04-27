'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

interface SkillData {
  confidence: number;
  last_tested: string | null;
  success_rate: number;
  times_tested: number;
  contexts: string[];
}

interface RoadmapPhase {
  number: number;
  title: string;
  duration_days: number;
  topics: string[];
  milestones: string[];
  resources: string[];
  status: string;
}

interface UserState {
  userId: string;
  userName?: string;
  goal: {
    title: string;
    timeline_days: number;
    current_phase: string;
    phase_progress_pct: number;
    phases?: RoadmapPhase[];
  };
  skills: Record<string, SkillData>;
  patterns: {
    learning_style: string;
    motivation_type: string;
    burnout_risk: number;
    avg_daily_study_minutes: number;
    avoidance_signals: string[];
    repeated_errors: { topic: string; error: string; count: number }[];
  };
  memory: {
    recent_topics: string[];
    last_mistake: { topic: string; error: string } | null;
    milestones_hit: string[];
    last_breakthrough: string | null;
  };
  consistency: {
    streak_days: number;
    last_active: string;
    this_week_active_days: number;
    email_open_rate_7d: number;
  };
  predictions: {
    dropout_risk: number;
    days_until_predicted_dropout: number | null;
    next_breakthrough_topic: string | null;
    recommended_challenge_difficulty: number;
  };
}

// Demo data for instant dashboard display
function getDemoState(): UserState {
  return {
    userId: 'demo',
    userName: 'Alex',
    goal: {
      title: 'Become an AI Engineer',
      timeline_days: 180,
      current_phase: 'Phase 1: Foundations',
      phase_progress_pct: 35,
      phases: [
        { number: 1, title: 'Foundations', duration_days: 30, topics: ['Python Advanced', 'Linear Algebra', 'Probability & Statistics', 'NumPy & Pandas'], milestones: ['Solve 20 Python challenges', 'Implement matrix ops from scratch'], resources: ['Mathematics for ML Ch.1-4', 'fast.ai Lesson 1-3'], status: 'active' },
        { number: 2, title: 'Machine Learning Core', duration_days: 35, topics: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn'], milestones: ['Build 3 ML models'], resources: ['Hands-On ML Ch.1-8'], status: 'upcoming' },
        { number: 3, title: 'Deep Learning', duration_days: 40, topics: ['Neural Networks', 'CNNs', 'Transformers', 'PyTorch'], milestones: ['Fine-tune a transformer'], resources: ['fast.ai Part 2'], status: 'upcoming' },
        { number: 4, title: 'AI Engineering', duration_days: 40, topics: ['MLOps', 'Model Deployment', 'LLM Integration'], milestones: ['Deploy a model to production'], resources: ['MLOps Zoomcamp'], status: 'upcoming' },
        { number: 5, title: 'Portfolio & Mastery', duration_days: 35, topics: ['System Design', 'Portfolio Projects'], milestones: ['2 portfolio projects'], resources: ['System Design Interview'], status: 'upcoming' },
      ],
    },
    skills: {
      'Python Advanced': { confidence: 6, last_tested: new Date().toISOString(), success_rate: 0.78, times_tested: 12, contexts: ['list comprehensions', 'decorators', 'generators'] },
      'Linear Algebra': { confidence: 3, last_tested: new Date(Date.now() - 3 * 86400000).toISOString(), success_rate: 0.4, times_tested: 5, contexts: ['basic operations'] },
      'Probability & Statistics': { confidence: 2, last_tested: new Date(Date.now() - 6 * 86400000).toISOString(), success_rate: 0.3, times_tested: 3, contexts: [] },
      'NumPy & Pandas': { confidence: 5, last_tested: new Date(Date.now() - 1 * 86400000).toISOString(), success_rate: 0.7, times_tested: 8, contexts: ['array ops', 'dataframes'] },
    },
    patterns: {
      learning_style: 'hands-on',
      motivation_type: 'mastery',
      burnout_risk: 0.25,
      avg_daily_study_minutes: 52,
      avoidance_signals: ['Probability & Statistics'],
      repeated_errors: [{ topic: 'Linear Algebra', error: 'Confuses dot product with element-wise multiplication', count: 3 }],
    },
    memory: {
      recent_topics: ['Python generators', 'NumPy broadcasting', 'Matrix multiplication'],
      last_mistake: { topic: 'Linear Algebra', error: 'Confused dot product with element-wise multiplication' },
      milestones_hit: ['Solved 10 Python challenges', 'Built first data pipeline'],
      last_breakthrough: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    consistency: {
      streak_days: 12,
      last_active: new Date().toISOString(),
      this_week_active_days: 5,
      email_open_rate_7d: 0.85,
    },
    predictions: {
      dropout_risk: 0.08,
      days_until_predicted_dropout: null,
      next_breakthrough_topic: 'Python Advanced',
      recommended_challenge_difficulty: 6,
    },
  };
}

export default function DashboardPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'email'>('overview');
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  useEffect(() => {
    // Use demo state for immediate display
    setState(getDemoState());
  }, []);

  const generateChallenge = useCallback(async () => {
    if (!state) return;
    setIsLoadingChallenge(true);
    try {
      const res = await fetch('/api/agents/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: state.userId }),
      });
      const data = await res.json();
      setChallenge(data.user_message);
    } catch {
      setChallenge("**Today's Challenge: Matrix Mastery** (Difficulty: 4/10)\n\nImplement these 3 matrix operations in Python using ONLY nested loops (no NumPy):\n1. Matrix multiplication for two 3×3 matrices\n2. Matrix transpose\n3. Determinant of a 2×2 matrix\n\nConstraint: Each function must be 10 lines or fewer.\nTime limit: 30 minutes.");
    }
    setIsLoadingChallenge(false);
  }, [state]);

  const generateEmail = useCallback(async () => {
    if (!state) return;
    setIsLoadingEmail(true);
    try {
      const res = await fetch('/api/agents/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: state.userId }),
      });
      const data = await res.json();
      setEmail(data.user_message);
    } catch {
      setEmail("Day 12 — and you're still here. That's not nothing.\n\nYesterday you wrestled with matrix operations. Your transpose was clean. Your determinant had an indexing bug.\n\n📖 Study: Eigenvalues & Eigenvectors (30 min)\n🔨 Practice: Today's challenge\n🔄 Review: Python list comprehensions (10 min)\n\n🔥 Day 12. Top 15% of learners. Keep building.");
    }
    setIsLoadingEmail(false);
  }, [state]);

  if (!state) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const skillEntries = Object.entries(state.skills);
  const maxConfidence = 10;

  const getConfidenceColor = (conf: number): string => {
    if (conf >= 7) return 'var(--accent-emerald)';
    if (conf >= 4) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  const getConfidenceLabel = (conf: number): string => {
    if (conf >= 9) return 'Mastery';
    if (conf >= 7) return 'Proficient';
    if (conf >= 5) return 'Developing';
    if (conf >= 3) return 'Beginner';
    return 'Awareness';
  };

  const getBurnoutColor = (risk: number): string => {
    if (risk >= 0.7) return 'var(--accent-rose)';
    if (risk >= 0.4) return 'var(--accent-amber)';
    return 'var(--accent-emerald)';
  };

  return (
    <div className={styles.dashboard}>
      <Navbar />

      <div className={styles.dashboardContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>
              Hey {state.userName} <span className={styles.wave}>👋</span>
            </h1>
            <p className={styles.headerGoal}>{state.goal.title}</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.streakBadge}>
              <span className={`${styles.fireEmoji} animate-fire`}>🔥</span>
              <div>
                <span className={styles.streakNumber}>{state.consistency.streak_days}</span>
                <span className={styles.streakLabel}>day streak</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'skills' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills Map
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'email' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('email'); if (!email) generateEmail(); }}
          >
            Daily Email
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className={styles.grid}>
            {/* Phase Progress */}
            <div className={`${styles.card} glass-card animate-fade-in stagger-1`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Phase Progress</h3>
                <span className="badge badge-blue">{state.goal.current_phase}</span>
              </div>
              <div className={styles.phaseProgress}>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${state.goal.phase_progress_pct}%` }} />
                </div>
                <span className={styles.progressPct}>{state.goal.phase_progress_pct}%</span>
              </div>
              <div className={styles.phaseTimeline}>
                {state.goal.phases?.map((phase, i) => (
                  <div
                    key={i}
                    className={`${styles.phaseItem} ${phase.status === 'active' ? styles.phaseActive : ''} ${phase.status === 'completed' ? styles.phaseCompleted : ''}`}
                  >
                    <div className={styles.phaseDot} />
                    <span className={styles.phaseLabel}>P{phase.number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Radar (simplified bar chart) */}
            <div className={`${styles.card} glass-card animate-fade-in stagger-2`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Skill Confidence</h3>
              </div>
              <div className={styles.skillBars}>
                {skillEntries.map(([name, skill]) => (
                  <div key={name} className={styles.skillBar}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{name}</span>
                      <span className={styles.skillLevel} style={{ color: getConfidenceColor(skill.confidence) }}>
                        {getConfidenceLabel(skill.confidence)}
                      </span>
                    </div>
                    <div className={styles.skillTrack}>
                      <div
                        className={styles.skillFill}
                        style={{
                          width: `${(skill.confidence / maxConfidence) * 100}%`,
                          background: getConfidenceColor(skill.confidence),
                        }}
                      />
                      <span className={styles.skillScore}>{skill.confidence}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Challenge */}
            <div className={`${styles.card} ${styles.challengeCard} glass-card animate-fade-in stagger-3`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Today&apos;s Challenge</h3>
                <span className="badge badge-violet">
                  Difficulty: {state.predictions.recommended_challenge_difficulty}/10
                </span>
              </div>
              {challenge ? (
                <div className={styles.challengeContent}>
                  {challenge.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('**') ? styles.challengeBold : styles.challengeLine}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              ) : (
                <div className={styles.challengeEmpty}>
                  <button
                    className="btn btn-primary"
                    onClick={generateChallenge}
                    disabled={isLoadingChallenge}
                    id="generate-challenge"
                  >
                    {isLoadingChallenge ? 'Generating...' : '⚡ Generate Challenge'}
                  </button>
                  <p className={styles.challengeHint}>
                    AI will create a personalized challenge based on your skill gaps
                  </p>
                </div>
              )}
            </div>

            {/* Insights Panel */}
            <div className={`${styles.card} glass-card animate-fade-in stagger-4`}>
              <h3 className={styles.cardTitle}>Behavioral Insights</h3>
              <div className={styles.insightGrid}>
                <div className={styles.insight}>
                  <span className={styles.insightIcon}>🧠</span>
                  <div>
                    <span className={styles.insightLabel}>Learning Style</span>
                    <span className={styles.insightValue}>{state.patterns.learning_style}</span>
                  </div>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightIcon}>🎯</span>
                  <div>
                    <span className={styles.insightLabel}>Motivation</span>
                    <span className={styles.insightValue}>{state.patterns.motivation_type}</span>
                  </div>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightIcon}>📊</span>
                  <div>
                    <span className={styles.insightLabel}>Avg. Study Time</span>
                    <span className={styles.insightValue}>{state.patterns.avg_daily_study_minutes} min/day</span>
                  </div>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightIcon}>📈</span>
                  <div>
                    <span className={styles.insightLabel}>Active Days</span>
                    <span className={styles.insightValue}>{state.consistency.this_week_active_days}/7 this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Burnout & Predictions */}
            <div className={`${styles.card} glass-card animate-fade-in stagger-5`}>
              <h3 className={styles.cardTitle}>Risk Meters</h3>
              <div className={styles.meterGrid}>
                <div className={styles.meter}>
                  <div className={styles.meterHeader}>
                    <span>Burnout Risk</span>
                    <span style={{ color: getBurnoutColor(state.patterns.burnout_risk) }}>
                      {Math.round(state.patterns.burnout_risk * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${state.patterns.burnout_risk * 100}%`,
                        background: getBurnoutColor(state.patterns.burnout_risk),
                      }}
                    />
                  </div>
                </div>
                <div className={styles.meter}>
                  <div className={styles.meterHeader}>
                    <span>Dropout Risk</span>
                    <span style={{ color: getBurnoutColor(state.predictions.dropout_risk) }}>
                      {Math.round(state.predictions.dropout_risk * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${state.predictions.dropout_risk * 100}%`,
                        background: getBurnoutColor(state.predictions.dropout_risk),
                      }}
                    />
                  </div>
                </div>
                {state.predictions.next_breakthrough_topic && (
                  <div className={styles.breakthrough}>
                    <span className={styles.breakthroughIcon}>✨</span>
                    <div>
                      <span className={styles.breakthroughLabel}>Next Breakthrough</span>
                      <span className={styles.breakthroughTopic}>{state.predictions.next_breakthrough_topic}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Avoidance & Errors */}
            <div className={`${styles.card} glass-card animate-fade-in`}>
              <h3 className={styles.cardTitle}>Patterns Detected</h3>
              {state.patterns.avoidance_signals.length > 0 && (
                <div className={styles.patternSection}>
                  <h4 className={styles.patternLabel}>⚠️ Avoidance Patterns</h4>
                  {state.patterns.avoidance_signals.map((topic, i) => (
                    <div key={i} className={styles.avoidanceItem}>
                      <span className="badge badge-amber">{topic}</span>
                      <span className={styles.avoidanceText}>Not practiced in 5+ days</span>
                    </div>
                  ))}
                </div>
              )}
              {state.patterns.repeated_errors.length > 0 && (
                <div className={styles.patternSection}>
                  <h4 className={styles.patternLabel}>🔄 Repeated Errors</h4>
                  {state.patterns.repeated_errors.map((err, i) => (
                    <div key={i} className={styles.errorItem}>
                      <span className="badge badge-rose">{err.topic}</span>
                      <p className={styles.errorText}>{err.error} ({err.count}x)</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className={`${styles.skillsTab} animate-fade-in`}>
            <div className={styles.skillsHeader}>
              <h2>Skill Confidence Map</h2>
              <p className={styles.skillsSubtitle}>0-2 Awareness · 3-4 Beginner · 5-6 Developing · 7-8 Proficient · 9-10 Mastery</p>
            </div>
            <div className={styles.skillsGrid}>
              {skillEntries.map(([name, skill]) => (
                <div key={name} className={`${styles.skillCard} glass-card`}>
                  <div className={styles.skillCardHeader}>
                    <h3>{name}</h3>
                    <div
                      className={styles.skillBubble}
                      style={{ background: getConfidenceColor(skill.confidence) }}
                    >
                      {skill.confidence}
                    </div>
                  </div>
                  <div className={styles.skillMeta}>
                    <div className={styles.skillMetaItem}>
                      <span>Success Rate</span>
                      <span>{Math.round(skill.success_rate * 100)}%</span>
                    </div>
                    <div className={styles.skillMetaItem}>
                      <span>Times Tested</span>
                      <span>{skill.times_tested}</span>
                    </div>
                    <div className={styles.skillMetaItem}>
                      <span>Level</span>
                      <span style={{ color: getConfidenceColor(skill.confidence) }}>
                        {getConfidenceLabel(skill.confidence)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.skillBarFull}>
                    <div
                      className={styles.skillBarFillFull}
                      style={{
                        width: `${(skill.confidence / 10) * 100}%`,
                        background: getConfidenceColor(skill.confidence),
                      }}
                    />
                  </div>
                  {skill.confidence >= 7 && skill.success_rate >= 0.75 && skill.times_tested >= 5 && (
                    <div className={styles.masteryBadge}>✅ Confirmed Mastery</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className={`${styles.emailTab} animate-fade-in`}>
            <div className={styles.emailPreview}>
              <div className={styles.emailHeader}>
                <div className={styles.emailMeta}>
                  <span className={styles.emailFrom}>From: StudentCopilot</span>
                  <span className={styles.emailSubject}>📌 Day {state.consistency.streak_days} — Your challenge is ready</span>
                </div>
              </div>
              <div className={styles.emailBody}>
                {email ? (
                  email.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('📖') || line.startsWith('🔨') || line.startsWith('🔄') || line.startsWith('🔥') ? styles.emailHighlight : ''}>
                      {line}
                    </p>
                  ))
                ) : (
                  <div className={styles.emailEmpty}>
                    <div className={styles.loadingSpinner} />
                    <p>Generating your daily email...</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={generateEmail}
              disabled={isLoadingEmail}
              style={{ marginTop: '16px' }}
            >
              {isLoadingEmail ? 'Regenerating...' : '🔄 Regenerate Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
