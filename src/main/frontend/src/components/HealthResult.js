import React, { useEffect, useState } from 'react';
import './HealthResult.css';
import Card from './Card.js';
import { useLocation, useHistory } from "react-router-dom";
import { getSessionCookie } from "../utils/session.js";

const HealthResult = () => {
    const session = getSessionCookie();
    const location = useLocation();
    const history = useHistory();
    const [healthData, setHealthData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = session && session.email ? `https://34.64.241.205:8080/health/byEmail/${session.email}` : null;
                if (url) {
                    fetch(url)
                        .then(res => res.text())  // 서버로부터 텍스트 형태로 데이터 받기
                        .then(data => {
                            const parsedData = JSON.parse(data);  // 텍스트를 JSON 객체로 파싱
                            console.log("Parsed Health Data:", parsedData);
                            if (parsedData.healthCheckResult) {
                                console.log("Health Check Result:", parsedData.healthCheckResult); // healthCheckResult 출력
                                if (parsedData.healthCheckResult.attendingPhysician) {
                                    console.log("Attending Physician:", parsedData.healthCheckResult.attendingPhysician); // attendingPhysician 출력
                                }
                            }
                            setHealthData(parsedData);  // 파싱된 데이터를 상태로 저장
                        })
                        .catch(error => {
                            console.error('Error fetching health data:', error);
                            setError('Failed to fetch health data');
                        });
                }
            } catch (error) {
                console.error('Error during fetch operation:', error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderCard = (title, value, min = null, max = null, isBloodPressure = false, type= null) => {
        let className = '';
        if (value === 'N/A' || value === null || value === undefined) {
            className = '';
            value = 'N/A';
        } else if (isBloodPressure) {
            const [systolic, diastolic] = value.split('/').map(Number);
            className = (systolic <= 139 && diastolic <= 89) ? 'normal' : 'abnormal';
        } else if (type === 'boolean') {
            className = value === "Normal" ? 'normal' : 'abnormal';
        } else if (type === 'proteinuria') {
            className = value === "Negative" ? 'normal' : 'abnormal';
        }
        else if (type === 'startsWithNormal') {
            className = value.startsWith("Normal") ? 'normal' : 'abnormal';
        }
        else if (min === null && max !== null) {
            className = (parseFloat(value) <= max) ? 'normal' : 'abnormal';
        }
        else if (min !== null && max !== null) {
            className = (parseFloat(value) >= min && parseFloat(value) <= max) ? 'normal' : 'abnormal';
        }
        return <Card title={title} status={value ? value : 'N/A'} className={className} />;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleRecommendClick = () => {
        const opinionsAndMeasures = healthData?.healthCheckResult?.attendingPhysician?.opinionsAndMeasures;

        if (opinionsAndMeasures) {
            history.push('/recommend', {
                opinionsAndMeasures
            });
        } else {
            console.log("No data to send or missing data fields");
        }
    };





    return (
        <div className="health-result">
            {healthData && healthData.healthCheckResult ? (
                <>
                    <p className="user-status">당신의 건강검진 결과입니다.</p>
                    <div className="cards-container">
                        {renderCard("신장", healthData.healthCheckResult.testItems.height)}
                        {renderCard("체중", healthData.healthCheckResult.testItems.weight)}
                        {renderCard("비만도", healthData.healthCheckResult.testItems.bodyFat, null, 110)}
                        {renderCard("시력", healthData.healthCheckResult.testItems.vision)}
                        {renderCard("청력", healthData.healthCheckResult.testItems.hearing)}
                        {renderCard("혈압", healthData.healthCheckResult.testItems.bloodPressure, null, null, true)}
                        {renderCard("요단백", healthData.healthCheckResult.testItems.urinalysis.proteinuria,null, null, false, 'proteinuria')}
                        {renderCard("혈색소", healthData.healthCheckResult.testItems.hemoglobin, 12, 16.5)}
                        {renderCard("혈당", healthData.healthCheckResult.testItems.bloodSugar, 70, 110)}
                        {renderCard("총콜레스테롤", healthData.healthCheckResult.testItems.bloodTest.totalCholesterol, null, 230)}
                        {renderCard("혈청 GOT", healthData.healthCheckResult.testItems.bloodTest.serumGOT, null, 40)}
                        {renderCard("혈청 GPT", healthData.healthCheckResult.testItems.bloodTest.serumGPT, null, 35)}
                        {renderCard("감마 GTP", healthData.healthCheckResult.testItems.bloodTest.gammaGTP, 8, 60)}
                        {renderCard("간염 검사", healthData.healthCheckResult.testItems.hepatitisTest, null, null, false, 'boolean')}
                        {renderCard("흉부 X-레이", healthData.healthCheckResult.testItems.chestXRay, null, null, false, 'startsWithNormal')}

                    </div>
                    <button className="next-button" onClick={handleRecommendClick}>추천 소견 보러가기</button>
                </>
            ) : (
                <div className="cards-container">
                    {renderCard("신장", null)}
                    {renderCard("체중", null)}
                    {renderCard("비만도", null, 18.5, 22.9)}
                    {renderCard("시력", null)}
                    {renderCard("청력", null)}
                    {renderCard("혈압", null, null, null, true)}
                    {renderCard("요단백", null, 5.5, 7.5)}
                    {renderCard("요 pH", null)}
                    {renderCard("혈색소", null, 12, 16)}
                    {renderCard("혈당", null, 70, 110)}
                    {renderCard("총콜레스테롤", null, 140, 200)}
                    {renderCard("혈청 GOT", null, null, 40)}
                    {renderCard("혈청 GPT", null, null, 35)}
                    {renderCard("감마 GTP", null, null, 60)}
                    {renderCard("간염 검사", null)}
                    {renderCard("흉부 X-레이", null)}
                    {renderCard("자궁경부 도말 검사", null)}
                    {renderCard("심전도 검사", null)}
                </div>
            )}
        </div>
    );
};

export default HealthResult;
