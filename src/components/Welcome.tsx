import { useState } from 'react';

interface WelcomeProps {
  onStart: (questionCount: number) => void;
}

const QUESTION_OPTIONS = [10, 20, 30, 40];

export function Welcome({ onStart }: WelcomeProps) {
  const [questionCount, setQuestionCount] = useState(20);

  const getDurationText = (count: number) => {
    if (count <= 10) return '1 min';
    if (count <= 20) return '2 min';
    if (count <= 30) return '3 min';
    return '4 min';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6 overflow-hidden">
      <div className="w-full max-w-3xl text-center relative overflow-hidden">
        {/* Título principal con animación */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight break-words">
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            ¿Eres más
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            MACHISTA
          </span>
          <span className="text-white mx-3">o</span>
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            RACISTA
          </span>
          <span className="text-white">?</span>
        </h1>

        {/* Subtítulo provocador */}
        <p className="text-xl md:text-2xl text-gray-200 mb-4 font-medium">
          Descubre lo que no quieres saber de ti mismo
        </p>
        <p className="text-lg text-gray-400 mb-8">
          {questionCount} preguntas. {getDurationText(questionCount)}. Una verdad incómoda.
        </p>

        {/* Selector de número de preguntas */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <label htmlFor="question-count" className="text-gray-300 text-sm">
            ¿Cuánto quieres sufrir?
          </label>
          <select
            id="question-count"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:bg-white/20 transition-colors"
          >
            {QUESTION_OPTIONS.map((count) => (
              <option key={count} value={count} className="bg-gray-900 text-white">
                {count} preguntas
              </option>
            ))}
          </select>
        </div>

        {/* Prueba social */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-gray-900"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 border-2 border-gray-900"></div>
          </div>
          <p className="text-gray-300 text-sm">
            <span className="font-bold text-white">+53.847</span> personas ya han descubierto la verdad
          </p>
        </div>

        {/* CTA Principal */}
        <button
          onClick={() => onStart(questionCount)}
          className="group relative px-12 py-5 min-h-[48px] bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 hover:from-pink-500 hover:via-red-500 hover:to-orange-500 text-white text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/40 mb-8"
        >
          <span className="relative z-10">¿Te atreves a descubrirlo?</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
        </button>

        {/* Badges de características */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-2xl mb-1">{questionCount}</div>
            <div className="text-xs text-gray-400">Preguntas</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-2xl mb-1">{getDurationText(questionCount)}</div>
            <div className="text-xs text-gray-400">Duración</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-2xl mb-1">100%</div>
            <div className="text-xs text-gray-400">Anónimo</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-2xl mb-1">0%</div>
            <div className="text-xs text-gray-400">Políticamente correcto</div>
          </div>
        </div>

        {/* Estadística provocadora */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm">
            Solo el <span className="text-red-400 font-bold">12%</span> de los participantes ha salido "limpio" del test.
            <br />
            <span className="text-gray-500">¿Serás uno de ellos?</span>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-600">
          *Esto es humor satírico. No tiene ninguna validez científica.
          <br />
          Si te ofendes fácilmente, este no es tu sitio.
        </p>
      </div>
    </div>
  );
}
