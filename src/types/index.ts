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

export type IntensityLevel = 
  | 'muy-alto'    // 70-100%
  | 'alto'        // 50-69%
  | 'moderado'    // 30-49%
  | 'bajo'        // 10-29%
  | 'minimo';     // 0-9%

export type ResultType = 
  | 'muy-machista'              // M: 70-100%, R: 0-29%
  | 'machista'                  // M: 50-69%, R: 0-29%
  | 'poco-machista'             // M: 30-49%, R: 0-29%
  | 'muy-racista'               // M: 0-29%, R: 70-100%
  | 'racista'                   // M: 0-29%, R: 50-69%
  | 'poco-racista'              // M: 0-29%, R: 30-49%
  | 'muy-ambos'                 // M: 70-100%, R: 70-100%
  | 'ambos-alto'                // M: 50-100%, R: 50-100% (not both ≥70%)
  | 'ambos-moderado'            // M: 30-49%, R: 30-49%
  | 'machista-tintes-racista'   // M: 50-100%, R: 30-49%
  | 'racista-tintes-machista'   // M: 30-49%, R: 50-100%
  | 'ninguno';                  // M: 0-29%, R: 0-29%

export interface ResultText {
  type: ResultType;
  title: string;
  description: string;
  emoji: string;
  images: string[];
}

// Game configuration
export interface GameConfig {
  questionsPerGame: number;
  thresholdPercentage: number; // Percentage threshold for "high" (e.g., 50%)
}
