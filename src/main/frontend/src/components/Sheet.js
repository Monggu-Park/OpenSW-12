import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Sheet.css";

function Sheet() {/*
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

    return (
        <div className="container_sheet">
            <div className="sheet">
                <div className="content_sheet">
                    <div className="text_sheet">
                        <div className="info">
                            //건강검진표 추출 내용
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sheet;
