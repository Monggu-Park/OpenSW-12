import React from 'react';
import './Healthresult.css';
import Card from './Card.js';

const Healthresult = () => {
    return (
        <div className="health-result">
            <p className="user-status">###님은 “#######” 입니다.</p>
            <div className="cards-container">
                <Card title="## 수치" status="정상" />
                <Card title="## 수치" status="비정상" />
                <Card title="## 수치" status="정상" />
                <Card title="## 수치" status="비정상" />
                <Card title="## 수치" status="정상" />
                <Card title="## 수치" status="비정상" />
            </div>
        </div>
    );
};

export default Healthresult;
