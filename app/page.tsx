'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push('/onboarding');
  };

  return (
    <div className={styles.landing}>
      {/* Floating orbs background */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={styles.logoText}>StudentCopilot</span>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.heroBadge} animate-fade-in`}>
            <span className={styles.badgeDot} />
            Multi-Agent AI Learning System
          </div>

          <h1 className={`${styles.heroTitle} animate-fade-in-up stagger-1`}>
            Stop studying.<br />
            <span className={styles.heroGradient}>Start growing.</span>
          </h1>

          <p className={`${styles.heroSubtitle} animate-fade-in-up stagger-2`}>
            An AI copilot that tracks your behavior, detects invisible gaps,
            predicts when you&apos;ll quit, and engineers breakthroughs.
            Not a chatbot. A coach.
          </p>

          <div className={`${styles.heroCTA} animate-fade-in-up stagger-3`}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleGetStarted}
              disabled={isLoading}
              id="get-started-btn"
            >
              {isLoading ? 'Loading...' : 'Set Your Goal →'}
            </button>
            <p className={styles.heroCaption}>
              Free. No credit card. Start in 30 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophy}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Built on a different philosophy
          </h2>
          <div className={styles.principleGrid}>
            {[
              {
                icon: '🎯',
                title: 'Behavior > Content',
                desc: 'We track what you DO, not what you say you did. "Studied for 3 hours" is noise. "Failed gradient descent 3 times" is signal.',
              },
              {
                icon: '🔍',
                title: 'Validation > Self-Report',
                desc: 'Every check-in is unverified until a micro-quiz confirms it. No more lying to yourself about what you know.',
              },
              {
                icon: '📊',
                title: 'Patterns > Events',
                desc: 'Missing one day is irrelevant. Avoiding algorithms for a week is an avoidance pattern. We act on patterns.',
              },
              {
                icon: '⚡',
                title: 'Predict > React',
                desc: 'We detect dropout signals before you feel them. Challenge rate dropping? Engagement fading? We intervene first.',
              },
              {
                icon: '🔥',
                title: 'Challenge > Comfort',
                desc: 'The system isn\'t here to make learning easy. It\'s here to make growth inevitable. Discomfort IS the product.',
              },
              {
                icon: '🎯',
                title: 'Focus > Volume',
                desc: 'Maximum 1 daily challenge. Maximum 3 focus items. More is less. Focus is the leverage point.',
              },
            ].map((principle, i) => (
              <div
                key={i}
                className={`${styles.principleCard} glass-card animate-fade-in-up stagger-${i + 1}`}
              >
                <span className={styles.principleIcon}>{principle.icon}</span>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className={styles.agents}>
        <div className="container">
          <h2 className={styles.sectionTitle}>6 AI Agents working for you</h2>
          <p className={styles.sectionSubtitle}>
            Every day, a team of specialized agents analyzes your progress,
            detects gaps, and orchestrates your next move.
          </p>
          <div className={styles.agentGrid}>
            {[
              { name: 'Goal Agent', desc: 'Builds your personalized roadmap', color: 'var(--accent-blue)' },
              { name: 'Skill Gap Agent', desc: 'Detects invisible knowledge gaps', color: 'var(--accent-violet)' },
              { name: 'Challenge Agent', desc: 'Creates daily personalized challenges', color: 'var(--accent-emerald)' },
              { name: 'Psychology Agent', desc: 'Learns how YOU learn best', color: 'var(--accent-amber)' },
              { name: 'Prediction Agent', desc: 'Predicts dropout before it happens', color: 'var(--accent-rose)' },
              { name: 'Planner Agent', desc: 'Orchestrates your daily learning plan', color: 'var(--accent-cyan)' },
            ].map((agent, i) => (
              <div
                key={i}
                className={`${styles.agentCard} glass-card`}
                style={{ '--agent-color': agent.color } as React.CSSProperties}
              >
                <div className={styles.agentDot} />
                <h3 className={styles.agentName}>{agent.name}</h3>
                <p className={styles.agentDesc}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.finalCTA}>
        <div className="container-narrow">
          <h2 className={styles.ctaTitle}>
            Ready to stop guessing and start growing?
          </h2>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleGetStarted}
            id="bottom-cta-btn"
          >
            Set Your Goal →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Built with 6 AI agents × Gemini API × relentless focus on behavior</p>
      </footer>
    </div>
  );
}
