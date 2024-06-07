import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getSessionCookie } from "../utils/session.js";
import './Recommend.css';

const Recommend = () => {
    const session = getSessionCookie();
    const location = useLocation();
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("fetchRecommendation 함수 호출됨");
        // location.state에서 opinionsAndMeasures를 추출
        const { opinionsAndMeasures } = location.state || {};

        if (!opinionsAndMeasures) {
            setError(true);
            setLoading(false);
            console.error("No opinions and measures data available.");
            return;
        }

        setRecommendation(opinionsAndMeasures);
        setLoading(false);
        setError(false);
    }, []);

    const handleConfirm = () => {
        history.push("/");
    };

    return (
        <div className="recommend-container">
            {recommendation ? (
                <>
                    <p className="user-status">추천 드립니다.</p>
                    <div className="recommendations">
                        <div className="recommend-card">
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
                                    <p>{recommendation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="confirm-button" onClick={handleConfirm}>확 인</button>
                </>
            ) : (
                <div className="recommendation-error">
                    <p>추천 드립니다!</p>
                    <div className="recommendations">
                        <div className="recommend-card">
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
                                    <p>{recommendation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="confirm-button" onClick={handleConfirm}>확 인</button>
                </div>
            )}
        </div>
    );
};

export default Recommend;
