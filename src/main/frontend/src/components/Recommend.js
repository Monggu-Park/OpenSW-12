import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getSessionCookie } from "../utils/session.js";
import './Recommend.css';

const Recommend = () => {
    const session = getSessionCookie();
    const location = useLocation();
    const history = useHistory();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("fetchRecommendation 함수 호출됨");
        const { opinionsAndMeasures } = location.state || {};

        if (!opinionsAndMeasures) {
            setError(true);
            setLoading(false);
            console.error("No opinions and measures data available.");
            return;
        }

        // 추천 텍스트를 파싱하여 리스트 형태로 변환
        const steps = opinionsAndMeasures.replace(/^\{generation=\d+\.\s+/, '')
            .replace(/\}\s*$/, '')
            .split(/\s*\d+\.\s+/)
            .filter(step => step.trim() !== '');
        setRecommendations(steps);
        setLoading(false);
        setError(false);
    }, []);

    const handleConfirm = () => {
        history.push("/");
    };

    return (
        <div className="recommend-container">
            {recommendations.length > 0 ? (
                <>
                    <p className="user-status">당신께 추천 드립니다☺!</p>
                    <div className="recommendations">
                        {recommendations.map((step, index) => (
                            <div key={index} className="recommend-card">
                                <p>{index + 1}. {step}</p>
                            </div>
                        ))}
                    </div>
                    <button className="confirm-button" onClick={handleConfirm}>확 인</button>
                </>
            ) : (
                <div className="recommendation-error">
                    <p>로딩 중...</p>
                    {loading ? (
                        <div className="recommendation-loading">
                            <p>로딩 중...</p>
                        </div>
                    ) : error ? (
                        <div className="recommendation-error">
                            <p>추천을 가져오는 데 실패했습니다.</p>
                        </div>
                    ) : (
                        <div className="recommendation-result">
                            <p>추천 정보가 없습니다.</p>
                        </div>
                    )}
                    <button className="confirm-button" onClick={handleConfirm}>확 인</button>
                </div>
            )}
        </div>
    );
};

export default Recommend;
