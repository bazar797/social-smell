import { useMemo } from 'react';
import type { Score, ResultType } from '../types';
import { getPercentages } from '../utils/scoring';
import resultsData from '../data/results.json';

interface ResultScreenProps {
  score: Score;
  resultType: ResultType;
  onRestart: () => void;
  onGoHome: () => void;
}

export function ResultScreen({ score, resultType, onRestart, onGoHome }: ResultScreenProps) {
  const percentages = getPercentages(score);
  const resultText = resultsData.results.find((r) => r.type === resultType);

  // Select a random image from the result
  const randomImage = useMemo(() => {
    if (!resultText?.images || resultText.images.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * resultText.images.length);
    return resultText.images[randomIndex];
  }, [resultText]);

  const getGradient = () => {
    switch (resultType) {
      case 'machista':
        return 'from-pink-600 to-purple-600';
      case 'racista':
        return 'from-orange-600 to-red-600';
      case 'ambos':
        return 'from-red-600 via-purple-600 to-orange-600';
      case 'ninguno':
        return 'from-green-600 to-teal-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <div className="w-full max-w-2xl text-center">
        <h1
          className={`text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}
        >
          {resultText?.title || 'Resultado'}
        </h1>

        {/* Humorous image */}
        {randomImage && (
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src={randomImage}
                alt="Resultado humorístico"
                className="w-full max-w-sm h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <p className="text-lg text-gray-200 leading-relaxed">
            {resultText?.description || 'No hay descripción disponible.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="text-4xl font-bold text-pink-400 mb-2">
              {percentages.machista}%
            </div>
            <div className="text-gray-400">Machista</div>
            <div className="text-sm text-gray-500 mt-1">
              {score.machista}/{score.totalMachista} respuestas
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {percentages.racista}%
            </div>
            <div className="text-gray-400">Racista</div>
            <div className="text-sm text-gray-500 mt-1">
              {score.racista}/{score.totalRacista} respuestas
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Volver a intentarlo
          </button>
          <button
            onClick={onGoHome}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-full transition-all duration-300 border border-white/20"
          >
            Volver al inicio
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Recuerda: esto es humor. Si te has ofendido, puede que el problema no sea el test.
        </p>
      </div>
    </div>
  );
}
