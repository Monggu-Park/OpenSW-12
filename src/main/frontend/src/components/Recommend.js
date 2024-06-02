import React from 'react';
import './Recommend.css';

const Recommend = () => {
    return (
        <div className="recommend-container">
            <p className="user-status">###님은 “#######” 입니다.</p>
            <div className="recommendations">
                <div className="recommend-card">
                    <h2>### 님에게 좋은 음식</h2>
                    <p className="highlight">생강차, 양배추, 브로콜리</p>
                    <p>
                        생강차는 ~~~~
                    </p>
                    <p>
                        양배추에는 ~~~
                    </p>
                </div>
                <div className="recommend-card">
                    <h2>### 님에게 좋은 운동</h2>
                    <p className="highlight">30분이상 걷기</p>
                    <p>
                        스트레스 감소: ~~~
                    </p>
                    <p>
                        면역력 강화: ~~~
                    </p>
                    <p>
                        정서적 안정: ~~~
                    </p>
                </div>
            </div>
            <button className="confirm-button">확 인</button>
        </div>
    );
};

export default Recommend;
