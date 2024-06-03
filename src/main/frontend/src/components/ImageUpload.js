import React, { useState } from "react";
import "./ImageUpload.css";
import imageicon from "../assets/imageicon.png";
import { useHistory } from "react-router-dom";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const history = useHistory();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img);
            processImage(img);
        }
    };

    // OCR 처리 함수
    const processImage = async (imgFile) => {
        const formData = new FormData();
        formData.append('file', imgFile);

        try {
            const response = await fetch('http://34.64.241.205:8080/uploadAndOcr', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('OCR API request failed');
            }

            const result = await response.json();
            history.push({pathname: "/healthresult", state:{ocrResult: result}});
        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    return (
        <div className="container_upload">
            <div
                className="upload-container"
                onClick={() => document.getElementById("fileInput").click()}
            >
                <div className="uploadInfo">건강검진표 사진을 등록하세요</div>
                <br/>
                <img src={imageicon} alt="이미지아이콘" className="imageicon"/>
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    );
};

export default ImageUpload;