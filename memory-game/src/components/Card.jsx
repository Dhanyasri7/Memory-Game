import React from 'react';

const Card = ({ id, cardData, onCardFlip }) => {
    return <div 
    className={`card ${cardData?.status && 'flipped'} ${cardData?.status}`} 
    onClick={() => !cardData?.status && onCardFlip(id)}>
        <img src={cardData?.image} alt='element-image' />
    </div>
};

export default Card;