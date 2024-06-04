import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Recommend.css';

const Recommend = () => {
    const location = useLocation();
    const history = useHistory();
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { name } = location.state || {};

    useEffect(() => {
        const fetchRecommendation = async () => {
            console.log("fetchRecommendation 함수 호출됨");
            if (!name) {
                setError(true);
                setLoading(false);
                return;
            }
            const prompt = `${name}님에게 좋은 음식과 운동을 추천해 주세요.`;  //prompt 수정해야함
            setError(false);
            try {
                const response = await fetch(`http://34.64.241.205:8080/api/v1/ai/generate?promptMessage=${encodeURIComponent(prompt)}`);
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Data:', data);
                setRecommendation(data.message);
            } catch (error) {
                console.error('Error fetching recommendation:', error);
                setError(true);
            }
            setLoading(false);
        };

        fetchRecommendation();
    }, [name]);

    const handleConfirm = () => {
        history.push("/");
    };

    return (
        <div className="recommend-container">
            {name ? (
                <>
                    <p className="user-status">{name}님께 추천 드립니다.</p>
                    <div className="recommendations">
                        <div className="recommend-card">
                            {loading ? (
                                <div className="recommendation-loading">
                                    <p>로딩 중...</p>
                                </div>
                            ) : error ? (
                                <div className="recommendation-error">
                                    <p>



                                        추천을 가져오는 데 실패했습니다.



                                    </p>
                                </div>
                            ) : (
                                recommendation && (
                                    <div className="recommendation-result">
                                        <p>{recommendation}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <button className="confirm-button" onClick={handleConfirm}>확 인</button>
                </>
            ) : (
                <div className="recommendation-error">
                    <p>'이름 정보가 없음'님께 추천드립니다.</p>
                    <div className="recommendations">
                        <div className="recommend-card">
                            {loading ? (
                                <div className="recommendation-loading">
                                    <p>로딩 중...</p>
                                </div>
                            ) : error ? (
                                <div className="recommendation-error">
                                    <p>



                                        추천을 가져오는 데 실패했습니다.



                                    </p>
                                </div>
                            ) : (
                                recommendation && (
                                    <div className="recommendation-result">
                                        <p>{recommendation}</p>
                                    </div>
                                )
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
