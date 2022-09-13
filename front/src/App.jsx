import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./common/components/include/Footer";
import Header from "./common/components/include/Header";
import { getSession } from "./config/session/session";
import PageRouter from "./container/PageRouter";


function App() {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (getSession("Authorization") !== null) {
      setIsLogined(true);
      // console.log("true");
    } else {
      setIsLogined(false);
      // console.log("false");
    }
  }, []);

  return (
    <div>
      <Header isLogined={isLogined} setIsLogined={setIsLogined} />
      <PageRouter />
      <Footer />
    </div>
  );
}

export default App;
