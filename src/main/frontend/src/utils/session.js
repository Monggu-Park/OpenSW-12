import React from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setSessionCookie = (session) => {
    cookies.set("session", session, { expires: new Date(Date.now() + 3600000) });
};

export const getSessionCookie = () => {
    const sessionCookie = cookies.get("session");
    if (sessionCookie === undefined) {
        return { email: null };
    } else {
        return sessionCookie;
    }
};

export const SessionContext = React.createContext(getSessionCookie());