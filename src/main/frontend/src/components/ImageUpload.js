import React, { useState } from "react";
import "./ImageUpload.css";
import imageicon from "../assets/imageicon.png";
import { useHistory } from "react-router-dom";


const ImageUpload = (props) => {
    const [previewUrl, setPreviewUrl] = useState("");
    const history = useHistory();
    const url = "https://34.64.241.205:8080";

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            props.setFile(e.target.files[0]);
            //   const response = await fetch(url + "/health/upload/", {
            //     method: "POST",
            //     headers: { "Content-Type": "multipart/form-data" },
            //     data: formData,
            //   });

            // 이미지 선택 후 Sheet 페이지로 이동
            history.push("/sheet");

            // reader.readAsDataURL(img);
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
