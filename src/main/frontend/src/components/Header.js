import React , {useContext} from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { SessionContext, setSessionCookie } from "../utils/session.js";

function Header() {
    const history = useHistory();
    const {session, setSession} = useContext(SessionContext);

    const handleLogoClick = () => {
        history.push("/");
    };


    const handleLogout = () => {
        setSessionCookie({ email: null });
        setSession({ email: null});
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
            {session.email ? (
                <button onClick={handleLogout} className="log_button">
                    로그아웃
                </button>
            ) : (
                <button onClick={() => history.push("/login")} className="log_button">
                    로그인
                </button>
            )}
        </div>
    );
}

export default Header;
