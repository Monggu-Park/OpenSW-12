import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const history = useHistory();
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        id: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({
            ...signupInfo,
            [name]: value,
        });

        if (name === "confirmPassword" && signupInfo.password) {
            const confirmPasswordElement = document.getElementById("confirmPassword");
            if (value === signupInfo.password) {
                confirmPasswordElement.classList.remove("error");
                confirmPasswordElement.classList.add("success");
            } else {
                confirmPasswordElement.classList.remove("success");
                confirmPasswordElement.classList.add("error");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signupInfo.password !== signupInfo.confirmPassword) {
            alert("Passwords do not match");
        } else {
            try {
                const response = await fetch("http://localhost:8080/members/save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify(signupInfo),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data === "Member added success") {
                        alert("회원가입 완료");
                        history.push("/");
                    } else if (data === "This Email already Exist") {
                        alert("이미 회원입니다.");
                        history.push("/login");
                    } else {
                        alert(data);
                    }
                } else {
                    alert("회원가입 실패");
                }
            } catch (error) {
                console.error("오류 발생:", error);
            }
        }
    };

    return (
        <div className="container_signup">
            <div className="title_signup">회원가입</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={signupInfo.username}
                    onChange={handleChange}
                    className="input-field_signup"
                    placeholder="이름"
                />
                <br />
                <input
                    type="text"
                    name="id"
                    value={signupInfo.id}
                    onChange={handleChange}
                    className="input-field_signup"
                    placeholder="아이디"
                />
                <br />
                <input
                    type="password"
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    className="input-field_signup"
                    placeholder="비밀번호"
                />
                <br />
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={signupInfo.confirmPassword}
                    onChange={handleChange}
                    className="input-field_signup"
                    placeholder="비밀번호 확인"
                />
                <br />
                <input
                    type="email"
                    name="email"
                    value={signupInfo.email}
                    onChange={handleChange}
                    className="input-field_signup"
                    placeholder="이메일"
                />
                <br />
                <button type="submit" className="signup_button">
                    확인
                </button>
                <p className="login_link">
                    <Link to="/login">이미 회원입니다</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
