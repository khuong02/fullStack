import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/Header";
import Body from "./components/Body";
import Footer from "./components/footer/Footer";

function App() {
  const header = useRef();

  return (
    <div className="App">
      <Router>
        <Header />
          <Body />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
