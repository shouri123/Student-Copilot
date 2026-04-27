'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  userId: string | null;
  userName: string | null;
  login: (id: string, name?: string) => void;
  logout: () => void;
  signup: (name: string) => string; // returns new userId
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load from localStorage on mount
    const savedId = localStorage.getItem('student_copilot_user_id');
    const savedName = localStorage.getItem('student_copilot_user_name');
    if (savedId) {
      setUserId(savedId);
      setUserName(savedName || 'Student');
    }
    setIsInitialized(true);
  }, []);

  const login = (id: string, name?: string) => {
    setUserId(id);
    setUserName(name || 'Student');
    localStorage.setItem('student_copilot_user_id', id);
    if (name) localStorage.setItem('student_copilot_user_name', name);
    router.push('/dashboard');
  };

  const logout = () => {
    setUserId(null);
    setUserName(null);
    localStorage.removeItem('student_copilot_user_id');
    localStorage.removeItem('student_copilot_user_name');
    router.push('/');
  };

  const signup = (name: string) => {
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    setUserId(newId);
    setUserName(name);
    localStorage.setItem('student_copilot_user_id', newId);
    localStorage.setItem('student_copilot_user_name', name);
    return newId;
  };

  return (
    <AuthContext.Provider value={{ userId, userName, login, logout, signup, isAuthenticated: !!userId }}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
