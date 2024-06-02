import React from 'react';
import './Card.css';

const Card = ({ title, status }) => {
    return (
        <div className={`card ${status === '비정상' ? 'abnormal' : ''}`}>
            <div className="card-content">
                <p className="card-title">{title}</p>
                <p className="card-graph">그래프</p>
                <p className="card-status">{status}</p>
            </div>
        </div>
    );
};

export default Card;
