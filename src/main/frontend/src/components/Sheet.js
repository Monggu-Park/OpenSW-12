import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Sheet.css";
import Loading from "./Loading.js";
import { getSessionCookie } from "../utils/session.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

function Sheet(props) {
    const [ocrText, setOcrText] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchOcrResult();
    }, []);
    const history = useHistory();
    /*
    const [ocrResult, setOcrResult] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const result = localStorage.getItem("ocrResult");
        if (result) {
            setOcrResult(JSON.parse(result));
        }
    }, []);*/
    /*
        if (!ocrResult) {
            return <div>Loading...</div>;
        }*/
    const fetchOcrResult = async () => {
        const url = "http://34.64.241.205:8080";
        const session = getSessionCookie();
        const formData = new FormData();
        console.log(props.file);
        if (props.file !== null && session.email !== null) {
            formData.append("file", props.file);
            console.log("go SCAN!");
            try {
                const response = await fetch(
                    url + "/health/uploadAndOcr/" + session.email,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                console.log("OCR DONE!");
                const data = await response.text();
                setOcrText(data); // OCR 결과 설정
            } catch (error) {
                console.error("OCR API error:", error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        }
    };

    const handleSheetClick = () => {
        history.push("/healthresult");
    };
    return (
        <div className="container_sheet">
            <div className="sheet">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="content_sheet">
                        <div className="text_sheet">
                            <div className="info">
                                {ocrText ? (
                                    <>
                                        <button onClick={handleSheetClick} className="goButton">결과 보러가기</button>
                                    </>
                                ) : (
                                    "이미지를 업로드하면 여기에 검진 결과가 표시됩니다."
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sheet;