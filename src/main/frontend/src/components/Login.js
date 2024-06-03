import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        id: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://34.64.241.205:8080/members/login", { // <-- 백엔드로 요청하는 부분
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            });
            console.log(response)
            if (response.ok) {
                history.push("/image-");
            } else {
                alert("로그인 실패");
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
                    value={loginInfo.id}
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