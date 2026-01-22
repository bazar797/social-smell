import { useState, useCallback, useMemo, useRef } from 'react';
import type { Question, Score, ResultType, GameConfig } from '../types';
import {
  selectRandomQuestions,
  calculateScore,
  determineResult,
} from '../utils/scoring';
import questionsData from '../data/questions.json';

type GameStatus = 'welcome' | 'playing' | 'finished';

const DEFAULT_CONFIG: GameConfig = {
  questionsPerGame: 20,
  thresholdPercentage: 50,
};

export function useGame(config: Partial<GameConfig> = {}) {
  const gameConfig = { ...DEFAULT_CONFIG, ...config };
  const questionsPerGameRef = useRef(gameConfig.questionsPerGame);
  
  const [status, setStatus] = useState<GameStatus>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, boolean>>(new Map());

  const allQuestions = questionsData.questions as Question[];

  const startGame = useCallback((questionCount?: number) => {
    const count = questionCount ?? questionsPerGameRef.current;
    questionsPerGameRef.current = count;
    
    const selected = selectRandomQuestions(allQuestions, count);
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers(new Map());
    setStatus('playing');
  }, [allQuestions]);

  const answerQuestion = useCallback(
    (answer: boolean) => {
      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      const newAnswers = new Map(answers);
      newAnswers.set(currentQuestion.id, answer);
      setAnswers(newAnswers);

      if (currentIndex + 1 >= questions.length) {
        setStatus('finished');
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [questions, currentIndex, answers]
  );

  const resetGame = useCallback(() => {
    setStatus('welcome');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers(new Map());
  }, []);

  const score: Score = useMemo(() => {
    if (status !== 'finished') {
      return { machista: 0, racista: 0, totalMachista: 0, totalRacista: 0 };
    }
    return calculateScore(questions, answers);
  }, [status, questions, answers]);

  const resultType: ResultType | null = useMemo(() => {
    if (status !== 'finished') return null;
    return determineResult(score, gameConfig.thresholdPercentage);
  }, [status, score, gameConfig.thresholdPercentage]);

  const currentQuestion = questions[currentIndex] || null;
  const progress = questions.length > 0 
    ? ((currentIndex) / questions.length) * 100 
    : 0;

  return {
    // State
    status,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    progress,
    score,
    resultType,
    
    // Actions
    startGame,
    answerQuestion,
    resetGame,
  };
}
