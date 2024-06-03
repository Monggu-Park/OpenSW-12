import React from "react";
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

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Advertisement} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/image-" component={ImageUpload} />
                    <Route path="/sheet" component={Sheet} />
                    <Route path="/loading" component={Loading} />
                    <Route path="/healthresult" component={HealthResult} />
                    <Route path="/recommend" component={Recommend} />

                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
