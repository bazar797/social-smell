export type Category = 'machista' | 'racista' | 'neutral';
export type TriggerAnswer = 'yes' | 'no';
export type Tone = 'serious' | 'humor';

export interface Question {
  id: string;
  text: string;
  category: Category;
  triggerAnswer: TriggerAnswer; // Answer that scores a point (only for machista/racista)
  tone: Tone; // Question tone: serious or humorous
}

export interface GameState {
  status: 'welcome' | 'playing' | 'finished';
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
  score: Score;
}

export interface Answer {
  questionId: string;
  answer: boolean; // true = Yes, false = No
}

export interface Score {
  machista: number;
  racista: number;
  totalMachista: number; // Total machista questions shown
  totalRacista: number;  // Total racista questions shown
}

export type ResultType = 
  | 'machista'      // High sexism, low racism
  | 'racista'       // Low sexism, high racism
  | 'ambos'         // High in both
  | 'ninguno';      // Low in both

export interface ResultText {
  type: ResultType;
  title: string;
  description: string;
  emoji?: string;
}

// Game configuration
export interface GameConfig {
  questionsPerGame: number;
  thresholdPercentage: number; // Percentage threshold for "high" (e.g., 50%)
}
