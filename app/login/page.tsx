'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/use-auth';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
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
          <h1 className={styles.title}>Welcome back to the Atelier</h1>
          <p className={styles.subtitle}>Enter your credentials to continue your growth cycle.</p>
        </div>

        {error && (
          <div className="error-banner" style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>User ID / Email</label>
            <input
              type="text"
              id="email"
              className="input"
              placeholder="atelier_resident_01"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Access Key</label>
              <Link href="#" className={styles.forgot}>Forgot?</Link>
            </div>
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
            {isLoading ? 'Verifying...' : 'Enter the Atelier →'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className={styles.link}>Join the residency</Link>
        </div>
      </div>
    </div>
  );
}
