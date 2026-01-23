import type { ResultType } from '../types';

export interface ShareData {
  resultTitle: string;
  resultEmoji: string;
  resultType: ResultType;
  machistaPercentage: number;
  racistaPercentage: number;
}

/**
 * Detectar si Web Share API está disponible
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Obtener emoji según intensidad del porcentaje
 */
function getIntensityEmoji(percentage: number): string {
  if (percentage >= 70) return '🔴';
  if (percentage >= 50) return '🟠';
  if (percentage >= 30) return '🟡';
  return '🟢';
}

/**
 * Obtener texto personalizado según el tipo de resultado
 */
function getShareTextForResult(resultType: ResultType, data: ShareData): string {
  const { resultEmoji, resultTitle, machistaPercentage, racistaPercentage } = data;
  const machistaEmoji = getIntensityEmoji(machistaPercentage);
  const racistaEmoji = getIntensityEmoji(racistaPercentage);
  const appUrl = window.location.origin;

  const baseText = `${resultEmoji} ¡Mi resultado en El Espejo del Alma! ${resultEmoji}

${resultEmoji} ${resultTitle} ${resultEmoji}

📊 Machista: ${machistaPercentage}% ${machistaEmoji}
📊 Racista: ${racistaPercentage}% ${racistaEmoji}`;

  // Textos personalizados por cada resultado
  const customTexts: Record<ResultType, string> = {
    'muy-machista': `
He alcanzado el nivel máximo en machismo. Mi mentalidad viene con garantía extendida desde 1950.

¿Te atreves a descubrir tu verdad incómoda?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'machista': `
Tengo más sesgos de género que un anuncio de detergente de los 80.

¿Y tú? ¿Te atreves?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'poco-machista': `
No soy machista profesional, solo practico de vez en cuando.

¿Cuál será tu resultado?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'muy-racista': `
He alcanzado el nivel élite de los prejuicios raciales. Mi mente es tan cerrada que la luz no entra.

¿Te atreves a hacer el test?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'racista': `
Mis prejuicios raciales están bien establecidos. Mi radar de estereotipos está finamente calibrado.

¿Y tú qué serás?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'poco-racista': `
Tengo algunos prejuicios ocasionales que salen cuando creo que nadie escucha.

¿Cuál es tu verdad?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'muy-ambos': `
¡He desbloqueado el logro más difícil! Soy como un bingo de discriminación.

¿Tú también? Descúbrelo:
👉 ${appUrl}

#ElEspejoDelAlma`,

    'ambos-alto': `
He conseguido el paquete premium: machismo Y racismo en dosis generosas.

¿Cuál será tu combo?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'ambos-moderado': `
He logrado el equilibrio perfecto... de sesgos. Soy el menú del día de los prejuicios.

¿Tú también tienes de todo?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'machista-tintes-racista': `
Mi especialidad es el machismo, pero me gusta experimentar con el racismo de vez en cuando.

¿Cuál es tu especialidad?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'racista-tintes-machista': `
Mi fuerte es el racismo, pero no desprecio un buen sesgo de género de vez en cuando.

¿Cuál es tu mix?
👉 ${appUrl}

#ElEspejoDelAlma`,

    'ninguno': `
Soy prácticamente un unicornio de la igualdad... o he mentido más que un político en campaña.

¿Tú qué serás?
👉 ${appUrl}

#ElEspejoDelAlma`,
  };

  return baseText + (customTexts[resultType] || customTexts.ninguno);
}

/**
 * Generar texto completo para compartir
 */
export function generateShareText(data: ShareData): string {
  return getShareTextForResult(data.resultType, data);
}

/**
 * Compartir usando Web Share API nativa
 */
export async function shareNative(data: ShareData): Promise<boolean> {
  if (!canUseWebShare()) {
    return false;
  }

  try {
    await navigator.share({
      title: 'Mi resultado en El Espejo del Alma',
      text: generateShareText(data),
      url: window.location.origin,
    });
    return true;
  } catch (error) {
    // Usuario canceló o error
    console.log('Share cancelled or failed:', error);
    return false;
  }
}

/**
 * Compartir por WhatsApp
 */
export function shareWhatsApp(data: ShareData): void {
  const text = generateShareText(data);
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Compartir por Telegram
 */
export function shareTelegram(data: ShareData): void {
  const text = generateShareText(data);
  const encodedText = encodeURIComponent(text);
  const appUrl = encodeURIComponent(window.location.origin);
  const url = `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Copiar texto al portapapeles
 */
export async function copyToClipboard(data: ShareData): Promise<boolean> {
  const text = generateShareText(data);

  // Método moderno (Clipboard API)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.log('Clipboard API failed, using fallback:', error);
      return copyToClipboardFallback(text);
    }
  }

  // Fallback para navegadores antiguos
  return copyToClipboardFallback(text);
}

/**
 * Fallback para copiar al portapapeles en navegadores antiguos
 */
function copyToClipboardFallback(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-999999px';
  textarea.style.top = '-999999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (error) {
    console.log('Fallback copy failed:', error);
    document.body.removeChild(textarea);
    return false;
  }
}
