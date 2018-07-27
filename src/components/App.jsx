import React from "react";
import Header from "./Header";
import Display from "./Display";
import Buttons from "./Buttons";
import buttonList from "../buttonList";
import "../css/App.css";
import "../css/bootstrap-grid.css";

const App = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-12 offset-0 col-sm-8 offset-sm-2 col-md-4 offset-md-4">
          <main className="app">
            <Header />
            <Display />
            <Buttons buttonList={buttonList} />
          </main>
        </div>
      </div>
    </section>
  );
};

export default App;
