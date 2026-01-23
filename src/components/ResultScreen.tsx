import { useMemo } from 'react';
import type { Score, ResultType, IntensityLevel } from '../types';
import { getPercentages, getIntensityLevel } from '../utils/scoring';
import resultsData from '../data/results.json';

interface ResultScreenProps {
  score: Score;
  resultType: ResultType;
  onRestart: () => void;
  onGoHome: () => void;
}

interface IntensityBarProps {
  percentage: number;
  label: string;
}

function IntensityBar({ percentage, label }: IntensityBarProps) {
  const level = getIntensityLevel(percentage);
  
  // Color basado en intensidad
  const getBarColor = (level: IntensityLevel): string => {
    switch (level) {
      case 'muy-alto':
        return 'bg-red-500';
      case 'alto':
        return 'bg-orange-500';
      case 'moderado':
        return 'bg-yellow-500';
      case 'bajo':
        return 'bg-green-500';
      case 'minimo':
        return 'bg-green-400';
      default:
        return 'bg-gray-500';
    }
  };

  const getBadgeColor = (level: IntensityLevel): string => {
    switch (level) {
      case 'muy-alto':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'alto':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'moderado':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'bajo':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'minimo':
        return 'bg-green-400/20 text-green-200 border-green-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getBadgeIcon = (level: IntensityLevel): string => {
    switch (level) {
      case 'muy-alto':
        return '🔴';
      case 'alto':
        return '🟠';
      case 'moderado':
        return '🟡';
      case 'bajo':
        return '🟢';
      case 'minimo':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getBadgeText = (level: IntensityLevel): string => {
    switch (level) {
      case 'muy-alto':
        return 'MUY ALTO';
      case 'alto':
        return 'ALTO';
      case 'moderado':
        return 'MODERADO';
      case 'bajo':
        return 'BAJO';
      case 'minimo':
        return 'MÍNIMO';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-xl font-bold text-white">{percentage}%</span>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
        <div
          className={`h-full ${getBarColor(level)} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Badge de nivel */}
      <div className="flex justify-end">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(level)}`}>
          <span>{getBadgeIcon(level)}</span>
          <span>{getBadgeText(level)}</span>
          <span>{getBadgeIcon(level)}</span>
        </span>
      </div>
    </div>
  );
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
    // Gradientes basados en el tipo de resultado
    if (resultType.includes('machista') && !resultType.includes('racista') && !resultType.includes('ambos')) {
      return 'from-pink-600 to-purple-600';
    }
    if (resultType.includes('racista') && !resultType.includes('machista') && !resultType.includes('ambos')) {
      return 'from-orange-600 to-red-600';
    }
    if (resultType.includes('ambos')) {
      return 'from-red-600 via-purple-600 to-orange-600';
    }
    if (resultType === 'ninguno') {
      return 'from-green-600 to-teal-600';
    }
    // Mix de ambos (machista-tintes-racista, racista-tintes-machista)
    return 'from-pink-600 via-purple-600 to-orange-600';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <div className="w-full max-w-2xl text-center">
        {/* Título con emojis antes y después */}
        <h1
          className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}
        >
          {resultText?.emoji} {resultText?.title || 'Resultado'} {resultText?.emoji}
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

        {/* Barras de intensidad con badges */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6 text-gray-200">Tu Análisis de Prejuicios</h3>
          
          <IntensityBar percentage={percentages.machista} label="📊 Machista" />
          <div className="text-xs text-gray-500 mb-6 text-right">
            {score.machista}/{score.totalMachista} respuestas activadas
          </div>

          <IntensityBar percentage={percentages.racista} label="📊 Racista" />
          <div className="text-xs text-gray-500 text-right">
            {score.racista}/{score.totalRacista} respuestas activadas
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-6 min-h-[48px] bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Volver a intentarlo
          </button>
          <button
            onClick={onGoHome}
            className="px-8 py-6 min-h-[48px] bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-full transition-all duration-300 border border-white/20"
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
