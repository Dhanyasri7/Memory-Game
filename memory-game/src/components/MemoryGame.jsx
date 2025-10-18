import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getElements } from '../helper/elements.js';

const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', pairs: 8, gridSize: '4x4' }, // 4x4 = 16 cards = 8 pairs
  hard: { name: 'Hard', pairs: 18, gridSize: '6x6' } // 6x6 = 36 cards = 18 pairs
};

const MemoryGame = ({ darkMode }) => {
  const [cardsData, setCardsData] = useState([]);
  const [flippedCard, setFlippedCard] = useState(-1);
  const [attempts, setAttempts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [bestTimes, setBestTimes] = useState({});
  const [score, setScore] = useState(0);
  const [totalFlips, setTotalFlips] = useState(0);

  const currentMaxCards = DIFFICULTY_LEVELS[difficulty].pairs;

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Load best times from localStorage
  useEffect(() => {
    const savedBestTimes = localStorage.getItem('memoryGameBestTimes');
    if (savedBestTimes) {
      setBestTimes(JSON.parse(savedBestTimes));
    }
  }, []);

  // Initialize game
  useEffect(() => {
    if (!gameStarted) {
      setCardsData(getElements(currentMaxCards));
    }
  }, [difficulty, currentMaxCards, gameStarted]);

  const checkForMatch = (currentCardId) => {
    setTotalFlips(prev => prev + 1);
    
    if (cardsData[currentCardId].name === cardsData[flippedCard].name) {
      cardsData[currentCardId].status = 'match';
      cardsData[flippedCard].status = 'match';
      setCardsData([...cardsData]);
      setMatchedCount(prev => prev + 1);

      // Play match sound
      playSound('match');

      // Update score (bonus for quick matches)
      const matchBonus = Math.max(100 - gameTime, 50);
      setScore(prev => prev + matchBonus);

      if (matchedCount + 1 === currentMaxCards) {
        setTimeout(() => {
          setGameOver(true);
          setGameStarted(false);
          
          // Check for best time
          const currentBestTime = bestTimes[difficulty];
          if (!currentBestTime || gameTime < currentBestTime) {
            const newBestTimes = { ...bestTimes, [difficulty]: gameTime };
            setBestTimes(newBestTimes);
            localStorage.setItem('memoryGameBestTimes', JSON.stringify(newBestTimes));
          }
          
          // Play win sound and confetti
          playSound('win');
          showConfetti();
        }, 500);
      }
    } else {
      // count only wrong attempts
      setAttempts(prev => prev + 1);

      cardsData[currentCardId].status = 'mismatch';
      cardsData[flippedCard].status = 'mismatch';
      setCardsData([...cardsData]);

      // Play mismatch sound
      playSound('mismatch');

      setTimeout(() => {
        cardsData[currentCardId].status = '';
        cardsData[flippedCard].status = '';
        setCardsData([...cardsData]);
      }, 1000);
    }
    setFlippedCard(-1);
  };

  const onCardFlip = (id) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    if (flippedCard === -1) {
      setFlippedCard(id);
      cardsData[id].status = 'flipped';
      setCardsData([...cardsData]);
      playSound('flip');
    } else {
      checkForMatch(id);
    }
  };

  // Sound effects
  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let frequency;
    
    switch (type) {
      case 'flip':
        frequency = 440;
        break;
      case 'match':
        frequency = 660;
        break;
      case 'mismatch':
        frequency = 220;
        break;
      case 'win':
        frequency = 880;
        break;
      default:
        frequency = 440;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Confetti effect
  const showConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'confetti-fall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 3000);
      }, i * 50);
    }
  };

  const resetGame = () => {
    setCardsData(getElements(currentMaxCards));
    setFlippedCard(-1);
    setAttempts(0);
    setMatchedCount(0);
    setGameOver(false);
    setGameStarted(false);
    setGameTime(0);
    setScore(0);
    setTotalFlips(0);
  };

  const changeDifficulty = (newDifficulty) => {
    if (gameStarted && !gameOver) return; // Don't change during active game
    
    setDifficulty(newDifficulty);
    resetGame();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <p className="subtitle">Test your memory and have fun — let's start! 🎉</p>

      {/* Game Controls */}
      <div className="game-controls">
        <div className="difficulty-selector">
          <label>Difficulty: </label>
          {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
            <button
              key={key}
              className={`difficulty-btn ${difficulty === key ? 'active' : ''}`}
              onClick={() => changeDifficulty(key)}
              disabled={gameStarted && !gameOver}
            >
              {level.name} ({level.gridSize})
            </button>
          ))}
        </div>
      </div>

      {/* Game Stats */}
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(gameTime)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Flips:</span>
          <span className="stat-value">{totalFlips}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Best Time:</span>
          <span className="stat-value">
            {bestTimes[difficulty] ? formatTime(bestTimes[difficulty]) : '--:--'}
          </span>
        </div>
      </div>

      <div className="game">
        <div className={`cards ${difficulty}`}>
          {cardsData?.map((cardData, index) =>
            <Card
              key={index}
              id={index}
              cardData={cardData}
              onCardFlip={onCardFlip}
            />
          )}
        </div>
      </div>

      {gameOver && (
        <div className="overlay">
          <div className="message-box">
            <p><b>🎉 Congratulations! 🎉</b></p>
            <p>You completed {DIFFICULTY_LEVELS[difficulty].name} mode!</p>
            <div className="final-stats">
              <p>Time: {formatTime(gameTime)}</p>
              <p>Score: {score}</p>
              <p>Total Flips: {totalFlips}</p>
              <p>Wrong Attempts: {attempts}</p>
              {bestTimes[difficulty] && gameTime === bestTimes[difficulty] && (
                <p className="new-record">🏆 New Best Time! 🏆</p>
              )}
            </div>
            <button className="play-again" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
