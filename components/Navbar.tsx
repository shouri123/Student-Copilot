'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { userId, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>StudentCopilot</span>
        </Link>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={logout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
