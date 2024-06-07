import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { getSessionCookie, setSessionCookie } from "../utils/session.js";

const Login = (props) => {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
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
        const url = "https://34.64.241.205:8080";

        try {
            const response = await fetch(url + "/members/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            });

            if (response.ok) {
                const msg = await response.text();
                if (msg === "Login Failed" || msg === "Password wrong") {
                    history.push("/");
                    console.error(msg);
                    alert("로그인 실패")
                } else {
                    setSessionCookie({ email: loginInfo.email });
                    props.setSession(getSessionCookie());
                    alert("로그인 성공!");
                    history.push("/image-");

                    //   const buttonAdvHandler = () => {
                    //     history.push("/Image-upload");
                    //   };
                    //   window.addEventListener("buttonAdvClicked", buttonAdvHandler);
                }
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
        /* 로그아웃
    const LogoutHandler = ({ history }) => {
      useEffect(
        () => {
          Cookies.remove("session");
          history.push("/login");
        },
        [history]
      );

      return <div>Logging out!</div>;
    };
        */
    };

    return (
        <div className="container_login">
            <div className="title_login">로그인</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="이메일"
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
