import type { Question, Score, ResultType } from '../types';

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select questions with controlled distribution:
 * - Distribution: ~45% machista + ~45% racista + ~10% neutral
 * - Within machista and racista: 50% serious, 50% humor
 * - Shuffles randomly so the pattern is not noticeable
 */
export function selectRandomQuestions(
  allQuestions: Question[],
  count: number
): Question[] {
  // Separate by category
  const machistas = allQuestions.filter((q) => q.category === 'machista');
  const racistas = allQuestions.filter((q) => q.category === 'racista');
  const neutrales = allQuestions.filter((q) => q.category === 'neutral');

  // Separate by tone within each category
  const machistasSerious = machistas.filter((q) => q.tone === 'serious');
  const machistasHumor = machistas.filter((q) => q.tone === 'humor');
  const racistasSerious = racistas.filter((q) => q.tone === 'serious');
  const racistasHumor = racistas.filter((q) => q.tone === 'humor');

  // Distribution: ~45% machista, ~45% racista, ~10% neutral
  const neutralCount = Math.max(2, Math.floor(count * 0.1));
  const remaining = count - neutralCount;
  
  // Handle odd numbers: machista gets the extra question
  const machistasCount = Math.ceil(remaining / 2);
  const racistasCount = remaining - machistasCount;

  // 50% serious, 50% humor per category (machistas)
  const machistasSeriousCount = Math.ceil(machistasCount * 0.5);
  const machistasHumorCount = machistasCount - machistasSeriousCount;

  // 50% serious, 50% humor per category (racistas)
  const racistasSeriousCount = Math.ceil(racistasCount * 0.5);
  const racistasHumorCount = racistasCount - racistasSeriousCount;

  // Select machista questions (mix serious + humor)
  const selectedMachistasSerious = shuffleArray(machistasSerious).slice(0, machistasSeriousCount);
  const selectedMachistasHumor = shuffleArray(machistasHumor).slice(0, machistasHumorCount);
  const selectedMachistas = [...selectedMachistasSerious, ...selectedMachistasHumor];

  // Select racista questions (mix serious + humor)
  const selectedRacistasSerious = shuffleArray(racistasSerious).slice(0, racistasSeriousCount);
  const selectedRacistasHumor = shuffleArray(racistasHumor).slice(0, racistasHumorCount);
  const selectedRacistas = [...selectedRacistasSerious, ...selectedRacistasHumor];

  // Select neutral questions
  const selectedNeutrales = shuffleArray(neutrales).slice(0, neutralCount);

  // Combine and shuffle all selected questions
  const allSelected = [
    ...selectedMachistas,
    ...selectedRacistas,
    ...selectedNeutrales,
  ];

  return shuffleArray(allSelected);
}

/**
 * Calculate score based on answers
 */
export function calculateScore(
  questions: Question[],
  answers: Map<string, boolean>
): Score {
  let machista = 0;
  let racista = 0;
  let totalMachista = 0;
  let totalRacista = 0;

  questions.forEach((question) => {
    const userAnswer = answers.get(question.id);
    if (userAnswer === undefined) return;

    if (question.category === 'machista') {
      totalMachista++;
      const triggerIsYes = question.triggerAnswer === 'yes';
      if ((triggerIsYes && userAnswer) || (!triggerIsYes && !userAnswer)) {
        machista++;
      }
    } else if (question.category === 'racista') {
      totalRacista++;
      const triggerIsYes = question.triggerAnswer === 'yes';
      if ((triggerIsYes && userAnswer) || (!triggerIsYes && !userAnswer)) {
        racista++;
      }
    }
    // Neutral questions don't score points
  });

  return {
    machista,
    racista,
    totalMachista,
    totalRacista,
  };
}

/**
 * Determine result type based on score
 */
export function determineResult(
  score: Score,
  thresholdPercentage: number = 50
): ResultType {
  const machistaPercentage =
    score.totalMachista > 0
      ? (score.machista / score.totalMachista) * 100
      : 0;
  const racistaPercentage =
    score.totalRacista > 0
      ? (score.racista / score.totalRacista) * 100
      : 0;

  const isMachista = machistaPercentage >= thresholdPercentage;
  const isRacista = racistaPercentage >= thresholdPercentage;

  if (isMachista && isRacista) return 'ambos';
  if (isMachista) return 'machista';
  if (isRacista) return 'racista';
  return 'ninguno';
}

/**
 * Get percentages for display
 */
export function getPercentages(score: Score): {
  machista: number;
  racista: number;
} {
  return {
    machista:
      score.totalMachista > 0
        ? Math.round((score.machista / score.totalMachista) * 100)
        : 0,
    racista:
      score.totalRacista > 0
        ? Math.round((score.racista / score.totalRacista) * 100)
        : 0,
  };
}
