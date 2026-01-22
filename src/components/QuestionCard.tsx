import type { Question } from '../types';
import { ProgressBar } from './ProgressBar';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <ProgressBar current={currentIndex} total={totalQuestions} />

       <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-2xl">
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-12 leading-relaxed">
          {question.text}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 px-8 py-6 min-h-[48px] bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/25"
          >
            Sí
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex-1 px-8 py-6 min-h-[48px] bg-red-600 hover:bg-red-500 text-white text-xl font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25"
          >
            No
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        Pulsa Sí o No para continuar
      </p>
    </div>
  );
}
