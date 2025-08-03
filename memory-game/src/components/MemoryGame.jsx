import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getElements } from '../helper/elements.js';


const MAX_CARDS = 2;

const MemoryGame = () => {
  const [cardsData, setCardsData] = useState([]);
  const [flippedCard, setFlippedCard] = useState(-1);
  const [attempts, setAttempts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCardsData(getElements(MAX_CARDS));
  }, []);

  const checkForMatch = (currentCardId) => {
    if (cardsData[currentCardId].name === cardsData[flippedCard].name) {
      cardsData[currentCardId].status = 'match';
      cardsData[flippedCard].status = 'match';
      setCardsData([...cardsData]);
      setMatchedCount(prev => prev + 1);

      if (matchedCount + 1 === MAX_CARDS) {
        setTimeout(() => setGameOver(true), 500);
      }
    } else {
      // count only wrong attempts
      setAttempts(prev => prev + 1);

      cardsData[currentCardId].status = 'mismatch';
      cardsData[flippedCard].status = 'mismatch';
      setCardsData([...cardsData]);

      setTimeout(() => {
        cardsData[currentCardId].status = '';
        cardsData[flippedCard].status = '';
        setCardsData([...cardsData]);
      }, 1000);
    }
    setFlippedCard(-1);
  };

  const onCardFlip = (id) => {
    if (flippedCard === -1) {
      setFlippedCard(id);
      cardsData[id].status = 'flipped';
      setCardsData([...cardsData]);
    } else {
      checkForMatch(id);
    }
  };

  const resetGame = () => {
    setCardsData(getElements(MAX_CARDS));
    setFlippedCard(-1);
    setAttempts(0);
    setMatchedCount(0);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <p className="subtitle">Test your memory and have fun — let’s start! 🎉</p>

      <div className="game">
        <div className="cards">
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
      <p>You matched all cards in {attempts} wrong attempts</p>
      <button className="play-again" onClick={resetGame}>Play Again</button>
    </div>
  </div>
)}
    </div>
  );
};

export default MemoryGame;
