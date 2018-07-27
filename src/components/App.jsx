import React from "react";
import Header from "./Header";
import Display from "./Display";
import Buttons from "./Buttons";
import "../css/App.css";

const App = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <main className="app">
            <Header />
            <Display />
            <Buttons />
          </main>
        </div>
      </div>
    </section>
  );
};

export default App;
