import React, { useState } from "react";
import "./ImageUpload.css";
import imageicon from "../assets/imageicon.png";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [extractedText, setExtractedText] = useState("");
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img);
            setPreviewUrl(URL.createObjectURL(img));
            processImage(img);
        }
    };

    // OCR 처리 함수
    const processImage = async (imgFile) => {
        const apiUrl = 'https://nkgni4pqcj.apigw.ntruss.com/custom/v1/29889/001c1d3c55d655539d49f75d0442857b3a534af173ce8574830b6395a4183e04/general';
        const secretKey = 'TFdVUVFVZERYUkxtb05DVkpGVFNJY1dhaXJvaFhHenc=';
        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-OCR-SECRET': secretKey
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('OCR API request failed');
            }

            const result = await response.json();
            setExtractedText(result);
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
                <img src={imageicon} alt="이미지아이콘" className="imageicon"/>{" "}
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>
            {previewUrl && (
                <div>
                    <img src={previewUrl} alt="Image Preview" className="image-preview"/>
                    <div className="extracted-text">{extractedText}</div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;