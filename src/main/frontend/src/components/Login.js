import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        id: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 로그인 처리 로직을 여기에 작성하세요.
        try {
            const response = await fetch("http://localhost:8000/members/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            });

            if (response.ok) {
                history.push("/");

                const buttonAdvHandler = () => {
                    history.push("/ImageUpload");
                };
                window.addEventListener("buttonAdvClicked", buttonAdvHandler);
            } else {
                console.error("로그인 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <div className="container_login">
            <div className="title_login">로그인</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={loginInfo.username}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="아이디"
                />
                <input
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="비밀번호"
                />
                <br />
                <button type="submit" className="login_button">
                    확인
                </button>
            </form>
        </div>
    );
};

export default Login;
