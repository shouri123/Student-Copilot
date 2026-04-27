import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '../lib/hooks/use-auth';

export const metadata: Metadata = {
  title: "Adaptive Student Copilot — AI-Powered Learning Mentor",
  description: "A multi-agent AI learning system that tracks behavior, detects gaps, predicts failure, and engineers breakthroughs. Your personal learning coach powered by AI.",
  keywords: ["AI tutor", "learning copilot", "adaptive learning", "student mentor", "AI education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="mesh-bg" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
