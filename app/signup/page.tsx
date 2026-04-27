'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/use-auth';
import styles from './signup.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('tech');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock signup logic
    const newId = signup(name);
    login(newId, name);
    
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className="mesh-bg" />
      
      <div className={`${styles.card} glass-card animate-fade-in-up`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={styles.logoText}>StudentCopilot</span>
          </div>
          <h1 className={styles.title}>Join the Elite Learning Residency</h1>
          <p className={styles.subtitle}>Commit to a long-term goal. Let the agents handle the growth engineering.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Alex Resident"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="alex@atelier.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="goal" className={styles.label}>Primary Trajectory</label>
            <select
              id="goal"
              className="input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="tech">Software Engineering & AI</option>
              <option value="business">Product Management & Strategy</option>
              <option value="design">Visual Arts & UX Design</option>
              <option value="academic">Advanced Research & Academia</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Choose Access Key</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Processing Residency...' : 'Secure My Spot →'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Already a resident?</span>
          <Link href="/login" className={styles.link}>Access the Atelier</Link>
        </div>
      </div>
    </div>
  );
}
