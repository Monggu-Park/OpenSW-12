import React, { useEffect, useState } from 'react';
import './HealthResult.css';
import Card from './Card.js';
import { useLocation, useHistory } from "react-router-dom";
import { getSessionCookie } from "../utils/session.js";

const HealthResult = () => {
    const session = getSessionCookie();
    const location = useLocation();
    const history = useHistory();
    const [ocrResult, setOcrResult] = useState(null);
    const [loading, setLoading] = useState(true);  // 로딩 상태 초기화
    const [error, setError] = useState(null);  // 에러 상태 초기화

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // 데이터를 가져오는 동안 로딩 상태 활성화
            try {
                if (location.state && location.state.ocrResult) {
                    console.log("Data from location.state:", location.state.ocrResult);
                    setOcrResult(location.state.ocrResult);
                } else if (session && session.email) {
                    const url = `http://34.64.241.205:8080/health/byEmail/${session.email}`;
                    fetch(url)
                        .then(res => res.text())  // 여기를 text로 받아오도록 수정
                        .then(data => {
                            console.log("Data from server:", data);
                            setOcrResult(data);  // 텍스트 데이터를 직접 설정
                        })
                        .catch(error => {
                            throw new Error('Error fetching health data');
                        });
                }
            } catch (error) {
                console.error('Error fetching health data:', error);
                setError(error.message);  // 에러 상태 설정
            } finally {
                setLoading(false);  // 로딩 상태 비활성화
            }
        };

        fetchData();
    }, [location, session]);

    if (loading) {
        return <div>Loading...</div>;  // 로딩 중 표시
    }

    if (error) {
        return <div>Error: {error}</div>;  // 에러 메시지 표시
    }

    const isNormalValue = (value, min, max) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    };

    const isMaxValueNormal = (value, max) => {
        const num = parseFloat(value);
        return !isNaN(num) && num <= max;
    };

    const isBloodPressureNormal = (value) => {
        const [systolic, diastolic] = value.split('/').map(Number);
        return !isNaN(systolic) && !isNaN(diastolic) && (systolic <= 139 || diastolic <= 89);
    };

    const handleRecommendClick = () => {
        history.push('/recommend', { name: ocrResult ? ocrResult.Name : 'N/A' });
    };

    const renderCard = (title, value, min = null, max = null, isBloodPressure = false) => {
        let className = '';
        if (value === 'N/A' || value === null || value === undefined) {
            className = '';
            value='N/A';
        } else if (isBloodPressure) {
            className = isBloodPressureNormal(value) ? 'normal' : 'abnormal';
        } else if (min !== null && max !== null) {
            className = isNormalValue(value, min, max) ? 'normal' : 'abnormal';
        } else if (max !== null) {
            className = isMaxValueNormal(value, max) ? 'normal' : 'abnormal';
        }
        return <Card title={title} status={value ? value : 'N/A'} className={className} />;
    };

    return (
        <div className="health-result">
            {ocrResult ? (
                <>
                    <p className="user-status">{ocrResult.Name ? ocrResult.Name : 'N/A'}님의 건강검진 결과입니다.</p>
                    <div className="cards-container">
                        {renderCard("신장", ocrResult.Height)}
                        {renderCard("체중", ocrResult?.Weight)}
                        {renderCard("비만도", ocrResult?.BodyFat, 18.5, 22.9)}
                        {renderCard("시력", ocrResult.Vision)}
                        {renderCard("청력", ocrResult.Hearing)}
                        {renderCard("혈압", ocrResult.BloodPressure, null, null, true)}
                        {renderCard("요단백", ocrResult.Proteinuria, 5.5, 7.5)}
                        {renderCard("요 pH", ocrResult.pH)}
                        {renderCard("혈색소", ocrResult.Hemoglobin, 12, 16)}
                        {renderCard("혈당", ocrResult.BloodSugar, 70, 110)}
                        {renderCard("총콜레스테롤", ocrResult.TotalCholesterol, 140, 200)}
                        {renderCard("혈청 GOT", ocrResult.SerumGOT, null, 40)}
                        {renderCard("혈청 GPT", ocrResult.SerumGPT, null, 35)}
                        {renderCard("감마 GTP", ocrResult.GammaGTP, null, 60)}
                        {renderCard("간염 검사", ocrResult.HepatitisTest)}
                        {renderCard("흉부 X-레이", ocrResult.ChestXRay)}
                        {renderCard("자궁경부 도말 검사", ocrResult.CervicalSmear)}
                        {renderCard("심전도 검사", ocrResult.Electrocardiogram)}
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
