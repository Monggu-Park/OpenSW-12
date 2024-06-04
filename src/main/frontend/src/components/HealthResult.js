import React, { useEffect, useState } from 'react';
import './HealthResult.css';
import Card from './Card.js';
import { useLocation, useHistory } from "react-router-dom";

const HealthResult = () => {
    const location = useLocation();
    const history = useHistory();
    const [ocrResult, setOcrResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location.state && location.state.ocrResult) {
                    setOcrResult(location.state.ocrResult);
                } else {
                    const response = await fetch('http://34.64.241.205:8080/OcrToJson');
                    if (!response.ok) {
                        throw new Error('Error fetching health data');
                    }
                    const data = await response.json();
                    setOcrResult(data.HealthCheckResult);
                }
            } catch (error) {
                console.error('Error fetching health data:', error);
                const tempData = {
                    Name: "임채린",
                    ResidentRegistrationNumber: "020210-1111111",
                    BusinessName: "동국대학교",
                    StoreName: "학교",
                    DepartmentName: "데이터사이언스",
                    Result: "Normal A (Healthy)",
                    ReferenceValues: "정상",
                    TestType: "Type 1 Checkup",
                    Height: "170",
                    Weight: "65",
                    BodyFat: "20",
                    Vision: "1.0",
                    Hearing: "15",
                    BloodPressure: "120/80",
                    UrineTest: "Negative",
                    Proteinuria: "6.0",
                    pH: "7.0",
                    Hemoglobin: "14",
                    BloodSugar: "90",
                    TotalCholesterol: "180",
                    SerumGOT: "30",
                    SerumGPT: "80",
                    GammaGTP: "40",
                    HepatitisTest: "정상",
                    ChestXRay: "정상",
                    CervicalSmear: "정상",
                    Electrocardiogram: "정상",
                    DoctorName: "의사명",
                    OpinionsAndMeasures: "소견 및 조치사항",
                    MedicalInstitutionCode: "요양기관기호",
                    ExaminationAgencyName: "검진기관명",
                    ExaminationDate: "검진일",
                    JudgmentDate: "판정일",
                    NotificationDate: "통보일"
                };
                setOcrResult(tempData);
            }
        };

        fetchData();
    }, [location]);

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
        history.push('/recommend', { name: ocrResult.Name });
    };
    const renderCard = (title, value, min = null, max = null, isBloodPressure = false) => {
        let className = '';
        if (value === 'N/A' || value === null) {
            className = '';
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
                    <p className="user-status">{ocrResult.Name}님의 건강검진 결과입니다.</p>
                    <div className="cards-container">
                        {renderCard("신장", ocrResult.Height)}
                        {renderCard("체중", ocrResult.Weight)}
                        {renderCard("비만도", ocrResult.BodyFat, 18.5, 22.9)}
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