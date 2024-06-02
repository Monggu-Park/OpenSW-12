import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-text">분석 중입니다...</div>
            <div className="spinner"></div>
        </div>
    );
};

export default Loading;