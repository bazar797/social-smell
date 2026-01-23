import { useState } from 'react';
import type { ResultType } from '../types';
import {
  canUseWebShare,
  shareNative,
  shareWhatsApp,
  shareTelegram,
  copyToClipboard,
  type ShareData,
} from '../utils/shareUtils';

interface ShareButtonsProps {
  resultTitle: string;
  resultEmoji: string;
  resultType: ResultType;
  machistaPercentage: number;
  racistaPercentage: number;
}

export function ShareButtons({
  resultTitle,
  resultEmoji,
  resultType,
  machistaPercentage,
  racistaPercentage,
}: ShareButtonsProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const shareData: ShareData = {
    resultTitle,
    resultEmoji,
    resultType,
    machistaPercentage,
    racistaPercentage,
  };

  const handleShare = async () => {
    const shared = await shareNative(shareData);
    if (!shared) {
      // Fallback: copiar al portapapeles
      const copied = await copyToClipboard(shareData);
      if (copied) {
        showToastMessage('✅ Texto copiado al portapapeles');
      } else {
        showToastMessage('❌ Error al copiar');
      }
    }
  };

  const handleWhatsApp = () => {
    shareWhatsApp(shareData);
  };

  const handleTelegram = () => {
    shareTelegram(shareData);
  };

  const handleCopy = async () => {
    const copied = await copyToClipboard(shareData);
    if (copied) {
      showToastMessage('✅ Texto copiado al portapapeles');
    } else {
      showToastMessage('❌ Error al copiar');
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000); // 4 segundos
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
        💬 Comparte tu resultado
      </h3>

      {/* Botón principal: Compartir (solo si Web Share disponible) */}
      {canUseWebShare() && (
        <button
          onClick={handleShare}
          className="w-full px-6 py-4 min-h-[48px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
        >
          📱 Compartir Resultado
        </button>
      )}

      {/* Texto separador */}
      <p className="text-sm text-gray-400 text-center mb-3">
        O enviar directamente por:
      </p>

      {/* Botones secundarios */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleWhatsApp}
          className="flex-1 px-4 py-3 min-h-[48px] bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <span>💬</span>
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleTelegram}
          className="flex-1 px-4 py-3 min-h-[48px] bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <span>✈️</span>
          <span>Telegram</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-3 min-h-[48px] bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <span>📋</span>
          <span>Copiar</span>
        </button>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full shadow-2xl animate-fade-in-up z-50 font-medium">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
