import React, {useState} from "react";
import "./ImageUpload.css";
import imageicon from "../assets/imageicon.png";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img);
            setPreviewUrl(URL.createObjectURL(img));
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
                <img src={previewUrl} alt="Image Preview" className="image-preview"/>
            )}
        </div>
    );
};

export default ImageUpload;
