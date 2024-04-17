import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
    const history = useHistory();

    const handleLogoClick = () => {
        history.push("/");
    };
    return (
        <div className="header">
            <img
                src={logo}
                alt="건강메이트 로고"
                className="logo"
                onClick={handleLogoClick}
            />{" "}
        </div>
    );
}

export default Header;
