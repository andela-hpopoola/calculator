import Calculator from "../../lib/Calculator";

const buttonList = [
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

describe("Calculator", () => {
  let calculator;
  let buttons;
  let button;

  const setDefaultValues = () => {
    calculator.currentValue = "12";
    calculator.display = "13.0 + 12";
    calculator.result = "0";
    calculator.lastButton = "number";
  };

  beforeEach(() => {
    calculator = new Calculator();
  });

  afterEach(() => {
    calculator._clearValues();
  });

  describe("Constructor", () => {
    it("should return empty values", () => {
      expect(calculator.currentValue).toBe("");
      expect(calculator.display).toBe("");
      expect(calculator.result).toBe("");
      expect(calculator.lastButton).toBe("");
    });
  });

  describe("get Buttons", () => {
    beforeEach(() => {
      buttons = calculator.buttons;
    });
    it("ensure button has the right value", () => {
      let count = 0;
      buttonList.forEach(btn => {
        expect(btn.name).toBe(buttons[count].name);
        expect(btn.label).toBe(buttons[count].label);
        expect(btn.type).toBe(buttons[count].type);
        count++;
      });
    });
  });

  describe("clearValues", () => {
    beforeEach(() => {
      setDefaultValues();
    });
    it("should clears all values", () => {
      calculator._clearValues();
      expect(calculator.currentValue).toBe("");
      expect(calculator.display).toBe("");
      expect(calculator.result).toBe("");
      expect(calculator.lastButton).toBe("");
    });
  });

  describe("addDecimalPlace", () => {
    it("returns decimal place with zero on empty currentValue", () => {
      calculator.currentValue = "";
      calculator._addDecimalPlace();
      expect(calculator.currentValue).toEqual("0.");
    });
    it("returns decimal place on existing currentValue", () => {
      calculator.currentValue = "25";
      calculator._addDecimalPlace();
      expect(calculator.currentValue).toEqual("25.");
    });

    describe("Existing decimal in currentValue", () => {
      it("ignores when decimal exists at the beginning", () => {
        calculator.currentValue = ".3";
        calculator._addDecimalPlace();
        expect(calculator.currentValue).toEqual(".3");
      });
      it("ignores when decimal is in the middle", () => {
        calculator.currentValue = "25.34";
        calculator._addDecimalPlace();
        expect(calculator.currentValue).toEqual("25.34");
      });
      it("ignores when decimal is at the end", () => {
        calculator.currentValue = "25.";
        calculator._addDecimalPlace();
        expect(calculator.currentValue).toEqual("25.");
      });
    });
  });

  describe("deleteLastValue", () => {
    it("deletes last value", () => {
      calculator.display = "13 + 12";
      calculator._deleteLastValue();
      expect(calculator.display).toEqual("13 + 1");
    });
    it("deletes operator with additional spaces", () => {
      calculator.display = "13 + ";
      calculator._deleteLastValue();
      expect(calculator.display).toEqual("13");
    });
    it("returns empty string when currentValue is empty", () => {
      calculator.display = "";
      calculator._deleteLastValue();
      expect(calculator.display).toEqual("");
    });
  });

  describe("togglePlusMinusSign", () => {
    describe("when currentValue has no number", () => {
      it("returns `minus` when currentValue is empty", () => {
        calculator.display = "12 + ";
        calculator.currentValue = "";
        calculator._togglePlusMinusSign();
        expect(calculator.currentValue).toEqual("-");
        expect(calculator.display).toEqual("12 + -");
      });
      it("returns an empty string when currentValue is `minus`", () => {
        calculator.currentValue = "-";
        calculator.display = "12 + -";
        calculator._togglePlusMinusSign();
        expect(calculator.currentValue).toEqual("");
        expect(calculator.display).toEqual("12 + ");
      });
      it("returns an empty value when currentValue is -", () => {
        calculator.currentValue = "-12";
        calculator._togglePlusMinusSign();
        expect(calculator.currentValue).toEqual("12");
      });

      describe("when used before an operator", () => {
        it("displays `minus` correctly", () => {
          calculator.currentValue = "12";
          calculator.display = "13 + 12";
          calculator._togglePlusMinusSign();
          expect(calculator.currentValue).toEqual("-12");
          expect(calculator.display).toEqual("13 + -12");
        });
        it("diplays number correctly when removed", () => {
          calculator.currentValue = "-12";
          calculator.display = "13 + -12";
          calculator._togglePlusMinusSign();
          expect(calculator.currentValue).toEqual("12");
          expect(calculator.display).toEqual("13 + 12");
        });
      });
    });

    describe("when currentValue is a valid number", () => {
      it("returns -12 when currentValue is 12", () => {
        calculator.currentValue = "12";
        calculator._togglePlusMinusSign();
        expect(calculator.currentValue).toEqual("-12");
      });
      it("returns 12 when currentValue is -12", () => {
        calculator.currentValue = "-12";
        calculator._togglePlusMinusSign();
        expect(calculator.currentValue).toEqual("12");
      });
    });
  });

  describe("calculateResult", () => {
    describe("with a valid operation", () => {
      it("returns 25 for 13.0 + 12", () => {
        calculator.display = "13.0 + 12";
        calculator._calculateResult();
        expect(calculator.result).toEqual("25");
      });
      it("returns 5 for 25 / 5", () => {
        calculator.display = "25 / 5";
        calculator._calculateResult();
        expect(calculator.result).toEqual("5");
      });
      it("returns 30 for 3 * 10", () => {
        calculator.display = "3 * 10";
        calculator._calculateResult();
        expect(calculator.result).toEqual("30");
      });
      it("returns 2 for 5 - 3", () => {
        calculator.display = "5 - 3";
        calculator._calculateResult();
        expect(calculator.result).toEqual("2");
      });
      it("returns 8.8 for 2.2 * 4", () => {
        calculator.display = "2.2 * 4";
        calculator._calculateResult();
        expect(calculator.result).toEqual("8.8");
      });
      it("returns 2.5 for 20 / 8", () => {
        calculator.display = "20 / 8";
        calculator._calculateResult();
        expect(calculator.result).toEqual("2.5");
      });
      it("returns 5 for 10 + -5", () => {
        calculator.display = "10 + -5";
        calculator._calculateResult();
        expect(calculator.result).toEqual("5");
      });
    });

    describe("with invalid operations", () => {
      it("returns Inifinity when divided by 0", () => {
        calculator.display = "5 / 0";
        calculator._calculateResult();
        expect(calculator.result).toEqual("Infinity");
      });
      it("returns Error for invalid operations", () => {
        calculator.display = "5 *";
        calculator._calculateResult();
        expect(calculator.result).toEqual("Error");
      });
    });
  });

  describe("updateCurrentValue", () => {
    beforeEach(() => {
      buttons = calculator.buttons;
    });

    describe("Invalid Button", () => {
      beforeEach(() => {
        setDefaultValues();
      });
      it("returns with a wrong parameter", () => {
        calculator.updateCurrentValue({ button: "unknown" });
        expect(calculator.currentValue).toEqual("12");
        expect(calculator.display).toEqual("13.0 + 12");
        expect(calculator.result).toEqual("0");
        expect(calculator.lastButton).toEqual("number");
      });
    });

    describe("ac", () => {
      beforeEach(() => {
        setDefaultValues();
      });
      it("clears all values when pressed", () => {
        calculator.updateCurrentValue(buttons[0]);
        expect(calculator.currentValue).toEqual("");
        expect(calculator.display).toEqual("");
        expect(calculator.result).toEqual("");
        expect(calculator.lastButton).toEqual("clear");
      });
    });

    describe("plusMinus", () => {
      beforeEach(() => {
        button = buttons[1];
        setDefaultValues();
      });
      it("renders the right values when pressed", () => {
        calculator.updateCurrentValue(button);
        expect(calculator.currentValue).toEqual("-12");
        expect(calculator.display).toEqual("13.0 + -12");
        expect(calculator.result).toEqual("0");
        expect(calculator.lastButton).toEqual("plusMinus");
      });
      it("renders previous value when pressed twice", () => {
        calculator.updateCurrentValue(button);
        calculator.updateCurrentValue(button);
        expect(calculator.currentValue).toEqual("12");
        expect(calculator.display).toEqual("13.0 + 12");
        expect(calculator.result).toEqual("0");
        expect(calculator.lastButton).toEqual("plusMinus");
      });
    });

    describe("delete", () => {
      beforeEach(() => {
        button = buttons[2];
        setDefaultValues();
      });
      it("deletes the last value when pressed", () => {
        calculator.updateCurrentValue(button);
        expect(calculator.currentValue).toEqual("1");
        expect(calculator.display).toEqual("13.0 + 1");
        expect(calculator.result).toEqual("0");
        expect(calculator.lastButton).toEqual("delete");
      });
      it("deletes equals to", () => {
        calculator.updateCurrentValue(buttons[19]); // equals to
        calculator.updateCurrentValue(button);
        expect(calculator.currentValue).toEqual("12");
        expect(calculator.display).toEqual("13.0 + 12");
        expect(calculator.result).toEqual("25");
        expect(calculator.lastButton).toEqual("delete");
      });
    });

    describe("operators", () => {
      let count;
      const operatorButtons = [15, 11, 7, 3];
      const operators = ["+", "-", "*", "/"];

      beforeEach(() => {
        setDefaultValues();
      });

      describe("when an operator is pressed", () => {
        beforeAll(() => {
          count = 0;
        });
        operatorButtons.forEach(position => {
          it(`renders the right operator`, () => {
            calculator.updateCurrentValue(buttons[position]);
            expect(calculator.currentValue).toEqual("");
            expect(calculator.display).toEqual(
              `13.0 + 12 ${operators[count]} `
            );
            expect(calculator.result).toEqual("0");
            expect(calculator.lastButton).toEqual("operator");
            count++;
          });
        });
      });

      describe("when another operator is pressed", () => {
        beforeAll(() => {
          count = 0;
        });
        operatorButtons.forEach(position => {
          it(`removes previous operator `, () => {
            calculator.updateCurrentValue(buttons[position]);
            calculator.updateCurrentValue({
              name: "mod",
              label: "~",
              type: "operator"
            });
            expect(calculator.currentValue).toEqual("");
            expect(calculator.display).toEqual(`13.0 + 12 ~ `);
            count++;
          });
        });
      });

      describe("when display is empty", () => {
        beforeAll(() => {
          count = 0;
        });
        operatorButtons.forEach(position => {
          it(`renders zero before the operator`, () => {
            calculator.display = "";
            calculator.updateCurrentValue(buttons[position]);
            expect(calculator.currentValue).toEqual("");
            expect(calculator.display).toEqual(`0 ${operators[count]} `);
            count++;
          });
        });
      });
    });

    describe("0 to 9", () => {
      let count = 0;
      const numberButtons = [18, 12, 13, 14, 8, 9, 10, 4, 5, 6];
      beforeEach(() => {
        setDefaultValues();
      });
      numberButtons.forEach(position => {
        it(`renders the right number when pressed`, () => {
          calculator.updateCurrentValue(buttons[position]);
          expect(calculator.currentValue).toEqual(`12${count}`);
          expect(calculator.display).toEqual(`13.0 + 12${count}`);
          expect(calculator.result).toEqual("0");
          expect(calculator.lastButton).toEqual("number");
          count++;
        });
      });
    });

    describe("C", () => {
      beforeEach(() => {
        setDefaultValues();
      });
      it("clears all values when pressed", () => {
        calculator.updateCurrentValue(buttons[16]);
        expect(calculator.currentValue).toEqual("");
        expect(calculator.display).toEqual("");
        expect(calculator.result).toEqual("");
        expect(calculator.lastButton).toEqual("clear");
      });
    });

    describe("decimal", () => {
      beforeEach(() => {
        setDefaultValues();
      });
      it("renders the decimal when pressed", () => {
        calculator.updateCurrentValue(buttons[17]);
        expect(calculator.currentValue).toEqual("12.");
        expect(calculator.display).toEqual(`13.0 + 12.`);
        expect(calculator.result).toEqual("0");
        expect(calculator.lastButton).toEqual("decimal");
      });
    });

    describe("equal", () => {
      beforeEach(() => {
        setDefaultValues();
      });
      it("calculates the current display", () => {
        calculator.updateCurrentValue(buttons[19]);
        expect(calculator.currentValue).toEqual("12");
        expect(calculator.display).toEqual("13.0 + 12 = ");
        expect(calculator.result).toEqual("25");
        expect(calculator.lastButton).toEqual("equalsTo");
      });

      describe("bad expressions", () => {
        it("returns 0 when display is empty", () => {
          calculator.display = "";
          calculator.updateCurrentValue(buttons[19]);
          expect(calculator.currentValue).toEqual("");
          expect(calculator.display).toEqual("");
          expect(calculator.result).toEqual("0");
          expect(calculator.lastButton).toEqual("equalsTo");
        });
        it("reformats display ending with an operator", () => {
          calculator.updateCurrentValue(buttons[15]); // press +
          calculator.updateCurrentValue(buttons[19]);
          expect(calculator.currentValue).toEqual("");
          expect(calculator.display).toEqual("13.0 + 12 + 0 = ");
          expect(calculator.result).toEqual("25");
          expect(calculator.lastButton).toEqual("equalsTo");
        });
      });

      describe("when pressed more than once", () => {
        it("returns with no changes", () => {
          calculator.updateCurrentValue(buttons[19]);
          calculator.updateCurrentValue(buttons[19]);
          calculator.updateCurrentValue(buttons[19]);
          expect(calculator.currentValue).toEqual("12");
          expect(calculator.display).toEqual("13.0 + 12 = ");
          expect(calculator.result).toEqual("25");
          expect(calculator.lastButton).toEqual("equalsTo");
        });
      });

      describe("when another button is pressed after equals to", () => {
        it("clears previous display", () => {
          calculator.updateCurrentValue(buttons[19]);
          calculator.updateCurrentValue(buttons[12]); // 1
          calculator.updateCurrentValue(buttons[13]); // 2
          calculator.updateCurrentValue(buttons[15]); // +
          calculator.updateCurrentValue(buttons[14]); // 3
          expect(calculator.currentValue).toEqual("3");
          expect(calculator.display).toEqual("12 + 3");
          expect(calculator.result).toEqual("");
          expect(calculator.lastButton).toEqual("number");
        });
      });
    });
  });

  describe("getResult", () => {
    beforeEach(() => {
      setDefaultValues();
    });
    it("should clears all values", () => {
      calculator.updateCurrentValue(buttons[19]); //equals
      expect(calculator.getResult()).toEqual({
        calculation: "13.0 + 12 = ",
        result: "25"
      });
    });
  });
});
