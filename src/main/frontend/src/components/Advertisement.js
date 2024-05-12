import React from "react";
import { useHistory } from "react-router-dom";
import "./Advertisement.css";
import healthImage from "../assets/ad_image.png";

function Advertisement() {
    const history = useHistory();

    const handleSignupClick = () => {
        history.push("/signup");
    };
    return (
        <div className="container_adv">
            <div className="advertisement">
                <div className="content">
                    <div className="text">
                        <div className="title">
                            <div className="upper">
                                건강검진표,
                                <br />
                                건강메이트
                            </div>
                            <div className="lower">와 분석해보아요</div>
                        </div>
                        <img src={healthImage} alt="건강검진" className="image" />
                    </div>
                </div>
                <button onClick={handleSignupClick} className="button_adv">
                    내 건강검진표 등록하기{" "}
                </button>
            </div>
        </div>
    );
}

export default Advertisement;
