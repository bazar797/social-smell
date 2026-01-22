import { useGame } from './hooks/useGame';
import { Welcome } from './components/Welcome';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const {
    status,
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    resultType,
    startGame,
    answerQuestion,
    resetGame,
  } = useGame();

  if (status === 'welcome') {
    return <Welcome onStart={startGame} />;
  }

  if (status === 'playing' && currentQuestion) {
    return (
      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        onAnswer={answerQuestion}
      />
    );
  }

  if (status === 'finished' && resultType) {
    return (
      <ResultScreen
        score={score}
        resultType={resultType}
        onRestart={() => startGame()}
        onGoHome={resetGame}
      />
    );
  }

  return null;
}

export default App;
