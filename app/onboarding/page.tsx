'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type Step = 'goal' | 'background' | 'timeline' | 'loading' | 'roadmap';

interface RoadmapPhase {
  number: number;
  title: string;
  duration_days: number;
  topics: string[];
  milestones: string[];
  resources: string[];
  status: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('goal');
  const [goalText, setGoalText] = useState('');
  const [background, setBackground] = useState('beginner');
  const [timeline, setTimeline] = useState(6);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [roadmapMessage, setRoadmapMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = 'demo-user-' + Date.now().toString(36);

  const handleSubmitGoal = async () => {
    setStep('loading');
    setIsSubmitting(true);

    try {
      // Initialize user state
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName: 'Student' }),
      });

      // Call Goal Agent
      const res = await fetch('/api/agents/goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          goalText,
          background,
          timeline: timeline * 30,
        }),
      });

      const data = await res.json();

      if (data.state_updates?.goal?.phases) {
        setRoadmap(data.state_updates.goal.phases);
      }
      setRoadmapMessage(data.user_message || '');

      // Store userId for dashboard
      if (typeof window !== 'undefined') {
        localStorage.setItem('copilot_userId', userId);
        localStorage.setItem('copilot_goalText', goalText);
      }

      setStep('roadmap');
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      setStep('goal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.onboarding}>
      {/* Progress indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressSteps}>
          {['Goal', 'Background', 'Timeline', 'Roadmap'].map((label, i) => {
            const stepIndex = ['goal', 'background', 'timeline', 'roadmap'].indexOf(step === 'loading' ? 'roadmap' : step);
            return (
              <div
                key={label}
                className={`${styles.progressStep} ${i <= stepIndex ? styles.progressStepActive : ''}`}
              >
                <div className={styles.progressDot}>
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span className={styles.progressLabel}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.stepContainer}>
        {/* Step 1: Goal */}
        {step === 'goal' && (
          <div className={`${styles.stepContent} animate-fade-in-up`}>
            <h1 className={styles.stepTitle}>What do you want to master?</h1>
            <p className={styles.stepSubtitle}>
              Be specific. &quot;Learn Python&quot; is vague. &quot;Become an AI engineer who can deploy production ML models&quot; is a goal.
            </p>
            <textarea
              className={`input ${styles.goalInput}`}
              placeholder="I want to become an AI engineer in 6 months, starting from Python basics to deploying ML models in production..."
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              rows={4}
              id="goal-input"
            />
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setStep('background')}
              disabled={goalText.trim().length < 10}
              id="next-to-background"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Background */}
        {step === 'background' && (
          <div className={`${styles.stepContent} animate-fade-in-up`}>
            <h1 className={styles.stepTitle}>Where are you starting from?</h1>
            <p className={styles.stepSubtitle}>
              Be honest. Overestimating your level wastes time.
            </p>
            <div className={styles.backgroundGrid}>
              {[
                {
                  level: 'beginner',
                  emoji: '🌱',
                  title: 'Beginner',
                  desc: 'New to this domain. Need fundamentals.',
                },
                {
                  level: 'intermediate',
                  emoji: '🌿',
                  title: 'Intermediate',
                  desc: 'Know basics. Can follow tutorials. Can\'t build alone.',
                },
                {
                  level: 'advanced',
                  emoji: '🌳',
                  title: 'Advanced',
                  desc: 'Can build independently. Want to level up specific skills.',
                },
              ].map((option) => (
                <button
                  key={option.level}
                  className={`${styles.backgroundCard} glass-card ${background === option.level ? styles.backgroundCardActive : ''}`}
                  onClick={() => setBackground(option.level)}
                  id={`bg-${option.level}`}
                >
                  <span className={styles.backgroundEmoji}>{option.emoji}</span>
                  <h3 className={styles.backgroundTitle}>{option.title}</h3>
                  <p className={styles.backgroundDesc}>{option.desc}</p>
                </button>
              ))}
            </div>
            <div className={styles.stepActions}>
              <button className="btn btn-ghost" onClick={() => setStep('goal')}>← Back</button>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setStep('timeline')}
                id="next-to-timeline"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Timeline */}
        {step === 'timeline' && (
          <div className={`${styles.stepContent} animate-fade-in-up`}>
            <h1 className={styles.stepTitle}>How much time do you have?</h1>
            <p className={styles.stepSubtitle}>
              Be realistic. Ambitious timelines with consistent effort beat long timelines with sporadic work.
            </p>
            <div className={styles.timelineSlider}>
              <div className={styles.timelineValue}>
                <span className={styles.timelineNumber}>{timeline}</span>
                <span className={styles.timelineUnit}>months</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={timeline}
                onChange={(e) => setTimeline(parseInt(e.target.value))}
                className={styles.slider}
                id="timeline-slider"
              />
              <div className={styles.timelineLabels}>
                <span>1 month</span>
                <span>6 months</span>
                <span>12 months</span>
              </div>
            </div>
            <div className={styles.stepActions}>
              <button className="btn btn-ghost" onClick={() => setStep('background')}>← Back</button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSubmitGoal}
                disabled={isSubmitting}
                id="generate-roadmap"
              >
                {isSubmitting ? 'Generating...' : 'Generate My Roadmap →'}
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {step === 'loading' && (
          <div className={`${styles.stepContent} ${styles.loadingContent} animate-fade-in`}>
            <div className={styles.loadingSpinner} />
            <h2 className={styles.loadingTitle}>Building your roadmap...</h2>
            <p className={styles.loadingSubtitle}>
              6 AI agents are analyzing your goal, calibrating difficulty, and designing your path.
            </p>
            <div className={styles.loadingAgents}>
              {['Goal Agent', 'Skill Mapper', 'Challenge Calibrator', 'Psychology Profiler'].map((agent, i) => (
                <div key={agent} className={`${styles.loadingAgent} animate-fade-in stagger-${i + 1}`}>
                  <span className={styles.loadingDot} />
                  {agent}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Roadmap */}
        {step === 'roadmap' && (
          <div className={`${styles.stepContent} animate-fade-in-up`}>
            <div className={styles.roadmapHeader}>
              <h1 className={styles.stepTitle}>Your roadmap is ready 🚀</h1>
              <p className={styles.stepSubtitle}>
                {roadmapMessage.split('\n')[0]}
              </p>
            </div>

            <div className={styles.roadmapTimeline}>
              {roadmap.map((phase, i) => (
                <div
                  key={i}
                  className={`${styles.phaseCard} glass-card animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}
                >
                  <div className={styles.phaseHeader}>
                    <div className={styles.phaseNumber}>Phase {phase.number}</div>
                    <span className={`badge ${phase.status === 'active' ? 'badge-emerald' : 'badge-blue'}`}>
                      {phase.status === 'active' ? '● Active' : `${phase.duration_days} days`}
                    </span>
                  </div>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <div className={styles.phaseTopics}>
                    {phase.topics.map((topic, j) => (
                      <span key={j} className={styles.topicTag}>{topic}</span>
                    ))}
                  </div>
                  <div className={styles.phaseMilestones}>
                    <h4 className={styles.milestoneLabel}>Milestones</h4>
                    {phase.milestones.map((m, j) => (
                      <div key={j} className={styles.milestone}>
                        <span className={styles.milestoneCheck}>○</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => router.push('/dashboard')}
              id="go-to-dashboard"
              style={{ marginTop: '32px' }}
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
