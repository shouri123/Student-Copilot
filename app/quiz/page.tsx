'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const DEMO_QUIZ: Question[] = [
  {
    id: 1,
    topic: 'Linear Algebra',
    question: 'What is the result of multiplying a 3×2 matrix by a 2×4 matrix?',
    options: ['3×4 matrix', '2×2 matrix', '3×2 matrix', 'Not possible'],
    correct: 0,
    explanation: 'When multiplying an m×n matrix by an n×p matrix, the result is an m×p matrix. So 3×2 × 2×4 = 3×4.',
  },
  {
    id: 2,
    topic: 'Linear Algebra',
    question: 'The dot product of vectors [1,2,3] and [4,5,6] is:',
    options: ['15', '32', '21', '48'],
    correct: 1,
    explanation: 'Dot product = (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32',
  },
  {
    id: 3,
    topic: 'Python',
    question: 'What does `[x**2 for x in range(5)]` produce?',
    options: ['[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[0, 2, 4, 6, 8]', '[1, 2, 3, 4, 5]'],
    correct: 1,
    explanation: 'range(5) gives 0,1,2,3,4. Squaring each: 0,1,4,9,16.',
  },
  {
    id: 4,
    topic: 'NumPy',
    question: 'What is broadcasting in NumPy?',
    options: [
      'Sending arrays to multiple processes',
      'Automatically expanding arrays to compatible shapes for operations',
      'Converting arrays to strings for display',
      'Copying arrays to GPU memory',
    ],
    correct: 1,
    explanation: 'Broadcasting is NumPy\'s ability to perform operations on arrays of different shapes by automatically expanding the smaller array.',
  },
  {
    id: 5,
    topic: 'Linear Algebra',
    question: 'A matrix multiplied by its transpose is always:',
    options: ['Diagonal', 'Symmetric', 'Invertible', 'Zero'],
    correct: 1,
    explanation: 'For any matrix A, the product A×Aᵀ is always symmetric because (AAᵀ)ᵀ = (Aᵀ)ᵀ × Aᵀ = A × Aᵀ.',
  },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(DEMO_QUIZ.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = DEMO_QUIZ[currentQ];
  const isAnswered = answers[currentQ] !== null;
  const isCorrect = answers[currentQ] === question.correct;
  const score = answers.filter((a, i) => a === DEMO_QUIZ[i].correct).length;
  const total = DEMO_QUIZ.length;
  const pct = Math.round((score / total) * 100);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQ < DEMO_QUIZ.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className={styles.quiz}>
        <div className={`${styles.resultCard} glass-card animate-fade-in-up`}>
          <div className={styles.resultScore}>
            <span className={styles.resultNumber}>{score}/{total}</span>
            <span className={styles.resultPct}>{pct}%</span>
          </div>
          <h2 className={styles.resultTitle}>
            {pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good progress' : '💪 Keep pushing'}
          </h2>
          <p className={styles.resultMessage}>
            {pct >= 80
              ? 'Your understanding is solid. Confidence increased.'
              : pct >= 60
                ? 'Decent foundation but some gaps remain. Your challenge tomorrow will target the weak spots.'
                : 'Below 60% — these topics need more work. Your challenge difficulty has been reduced to help you build back up.'}
          </p>
          <div className={styles.resultBreakdown}>
            {DEMO_QUIZ.map((q, i) => (
              <div
                key={i}
                className={`${styles.resultItem} ${answers[i] === q.correct ? styles.resultCorrect : styles.resultWrong}`}
              >
                <span>{answers[i] === q.correct ? '✓' : '✗'}</span>
                <span>{q.topic}: {q.question.substring(0, 50)}...</span>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => window.location.href = '/dashboard'}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      {/* Progress */}
      <div className={styles.quizProgress}>
        <span className={styles.quizCounter}>{currentQ + 1} / {total}</span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>
        <span className={`badge ${question.topic === 'Linear Algebra' ? 'badge-violet' : question.topic === 'Python' ? 'badge-blue' : 'badge-emerald'}`}>
          {question.topic}
        </span>
      </div>

      {/* Question */}
      <div className={`${styles.questionCard} glass-card animate-fade-in`}>
        <h2 className={styles.questionText}>{question.question}</h2>
        <div className={styles.options}>
          {question.options.map((option, i) => {
            let optionClass = styles.option;
            if (isAnswered) {
              if (i === question.correct) optionClass += ` ${styles.optionCorrect}`;
              else if (i === answers[currentQ] && !isCorrect) optionClass += ` ${styles.optionWrong}`;
            }
            if (i === answers[currentQ]) optionClass += ` ${styles.optionSelected}`;

            return (
              <button
                key={i}
                className={optionClass}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                id={`option-${i}`}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`${styles.explanation} animate-fade-in ${isCorrect ? styles.explanationCorrect : styles.explanationWrong}`}>
            <span className={styles.explanationIcon}>{isCorrect ? '✓' : '✗'}</span>
            <div>
              <h4>{isCorrect ? 'Correct!' : 'Not quite.'}</h4>
              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        {isAnswered && (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            style={{ marginTop: '16px', alignSelf: 'flex-end' }}
            id="next-question"
          >
            {currentQ < DEMO_QUIZ.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  );
}
