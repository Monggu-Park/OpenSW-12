import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import Advertisement from "./components/Advertisement.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ImageUpload from "./components/ImageUpload.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Advertisement} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/image-upload" component={ImageUpload} />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
