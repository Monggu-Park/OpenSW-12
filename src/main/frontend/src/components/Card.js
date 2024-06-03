import React from 'react';
import './Card.css';

const Card = ({ title, status, className }) => {
    return (
        <div className={`card ${className}`}>
            <h3>{title}</h3>
            <p className={`card-status ${className}`}>{status}</p>
        </div>
    );
};

export default Card;
