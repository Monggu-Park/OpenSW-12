
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Advertisement from "./components/Advertisement.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ImageUpload from "./components/ImageUpload.js";
import Sheet from "./components/Sheet.js";
import Loading from "./components/Loading.js";
import HealthResult from "./components/HealthResult.js";
import Recommend from "./components/Recommend.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SessionContext, getSessionCookie } from "./utils/session.js";

const Routes = () => {
    const [session, setSession] = useState(getSessionCookie());
    const [file, setFile] = useState(null);

    return (
        <SessionContext.Provider value={session}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={Advertisement} />
                    <Route path="/login">
                        <Login setSession={setSession} />
                    </Route>
                    <Route path="/signup" component={Signup} />
                    <Route path="/image-">
                        <ImageUpload setFile={setFile} />
                    </Route>
                    <Route path="/sheet">
                        <Sheet file={file} />
                    </Route>
                    <Route path="/loading" component={Loading} />
                    <Route path="/healthresult" component={HealthResult} />
                    <Route path="/recommend" component={Recommend} />
                </Switch>
                <Footer />
            </Router>
        </SessionContext.Provider>
    );
};

function App() {
    return (
        <div className="App">
            <Routes />
        </div>
    );
}

export default App;

