import math from "mathjs";
class Calculator {
  constructor() {
    this._clearValues();
  }

  get buttons() {
    return [
      { name: "ac", label: "AC", type: "clear" },
      { name: "plusMinus", label: "+/-", type: "plusMinus" },
      { name: "delete", label: "<Del", type: "delete" },
      { name: "divide", label: "/", type: "operator" },
      { name: "seven", label: "7", type: "number" },
      { name: "eight", label: "8", type: "number" },
      { name: "nine", label: "9", type: "number" },
      { name: "multiply", label: "*", type: "operator" },
      { name: "four", label: "4", type: "number" },
      { name: "five", label: "5", type: "number" },
      { name: "six", label: "6", type: "number" },
      { name: "minus", label: "-", type: "operator" },
      { name: "one", label: "1", type: "number" },
      { name: "two", label: "2", type: "number" },
      { name: "three", label: "3", type: "number" },
      { name: "plus", label: "+", type: "operator" },
      { name: "cancel", label: "C", type: "clear" },
      { name: "decimal", label: ".", type: "decimal" },
      { name: "zero", label: "0", type: "number" },
      { name: "equals", label: "=", type: "equalsTo" }
    ];
  }

  _clearValues() {
    this.currentValue = "";
    this.display = "";
    this.result = "";
    this.lastButton = "";
  }

  _addDecimalPlace() {
    let decimal;
    if (this.currentValue.indexOf(".") < 0) {
      decimal = this.currentValue === "" ? "0." : ".";
      this.currentValue += decimal;
      this.display += decimal;
    }
  }

  _deleteLastValue() {
    if (this.display === "") {
      return;
    }

    const lastValue = this.display.endsWith(" ") ? 3 : 1;
    this.display = this.display.substring(0, this.display.length - lastValue);
    // TODO Get current value from display
    if (this.lastButton === "number" && this.currentValue !== "") {
      this.currentValue = this.currentValue.substring(
        0,
        this.currentValue.length - 1
      );
    }
  }

  _togglePlusMinusSign() {
    if (this.currentValue === "") {
      this.currentValue = "-";
      this.display += "-";
      return;
    } else if (this.currentValue === "-") {
      this.currentValue = "";
      this.display = this.display.substring(0, this.display.length - 1);
      return;
    }

    // remove currentValue from display
    this.display = this.display.substring(
      0,
      this.display.length - this.currentValue.length
    );

    // toggle sign
    this.currentValue = (parseFloat(this.currentValue) * -1).toString();

    // rewrite display
    this.display += this.currentValue;
  }

  _calculateResult() {
    try {
      this.result = String(math.eval(this.display));
    } catch (error) {
      this.result = "Error";
    }
  }

  updateCurrentValue(button) {
    if (!(button.type && button.label && button.name)) {
      return;
    }

    // ac and c button
    if (button.type === "clear") {
      this._clearValues();
    }

    // delete button is pressed
    if (button.type === "delete") {
      this._deleteLastValue();
    } else if (this.lastButton === "equalsTo") {
      // return if equalsTo button is pressed more than once
      if (button.type === "equalsTo") {
        return;
      }

      // clear display on new calculation
      this.currentValue = "";
      this.display = "";
      this.result = "";
    }

    // assign number to current value
    if (button.type === "number") {
      this.currentValue += button.label;
      this.display += button.label;
    }

    //check if plusMinus is pressed
    if (button.type === "plusMinus") {
      this._togglePlusMinusSign();
    }

    // assign decimal to current value
    if (button.type === "decimal") {
      this._addDecimalPlace();
    }

    // when operator sign is pressed
    // delete current value
    if (button.type === "operator") {
      if (this.lastButton === "operator" || this.lastButton === "decimal") {
        this._deleteLastValue();
      }

      // add zero for empty display
      if (this.display === "") {
        this.display = "0";
      }

      this.display += ` ${button.label} `;
      this.currentValue = "";
    }

    if (button.type === "equalsTo") {
      if (this.display === "") {
        this.currentValue = "";
        this.display = "";
        this.result = "0";
      } else {
        // add extra zero to create a valid expression
        const addExtraZero =
          this.lastButton === "operator" || this.lastButton === "decimal";
        if (addExtraZero) {
          this.display += "0";
        }

        // get the result
        this._calculateResult();

        this.display += ` ${button.label} `;
      }
    }

    this.lastButton = button.type;
  }

  getResult() {
    return { calculation: this.display, result: this.result };
  }
}

export default Calculator;
