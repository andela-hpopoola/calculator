import React, { Component } from "react";
import Header from "./Header";
import Display from "./Display";
import Buttons from "./Buttons";
import Calculator from "../lib/Calculator";
import "../css/App.css";
import "../css/bootstrap-grid.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculation: "",
      result: "0"
    };
    this.calculator = new Calculator();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(button) {
    this.calculator.updateCurrentValue(button);
    this.setState(this.calculator.getResult());
  }

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-12 offset-0 col-sm-8 offset-sm-2 col-md-4 offset-md-4">
            <main className="app">
              <Header />
              <Display
                calculation={this.state.calculation}
                result={this.state.result}
              />
              <Buttons
                onClick={this.handleClick}
                buttonList={this.calculator.buttons}
              />
            </main>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
