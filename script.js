const select = (id) => document.querySelector("#" + id);

const calculatorDisplayExp = select("calculator-display-exp");
const calculatorDisplayResult = select("calculator-display-result");
const expressions = [];

function showExpression() {
  calculatorDisplayExp.innerHTML = expressions.join(" ");
}

function isOperator(exp) {
  return ["%", "/", "×", "-", "+"].some((o) => o === exp);
}

function getLastExp() {
  return expressions[expressions.length - 1];
}

function isNumber(number) {
  return number === "." ? true : typeof number === "number";
}

function setExpression(exp) {
  if (!expressions.length && isOperator(exp)) {
    setExpression(Number(calculatorDisplayResult.innerHTML));
    setExpression(exp);
    return;
  }

  expressions.push(exp);

  clearResult();
  formatExpressions();
}

function calculateResult() {
  try {
    calculatorDisplayResult.innerHTML = expressions.length
      ? eval(expressions.join("").replaceAll("×", "*").replaceAll("%", "/100*"))
      : "";
  } catch (e) {
    clearCalculator();
  }
}

function clearExpression() {
  calculateResult();
  expressions.length = 0;
}

function clearResult() {
  calculatorDisplayResult.innerHTML = "";
}

function doBackspace() {
  if (String(getLastExp()).length === 1) {
    expressions.pop();
  } else {
    const stringified = String(getLastExp());
    const array = stringified.split("");
    array.pop();

    expressions[expressions.length - 1] = Number(array.join(""));
  }
}

function clearCalculator() {
  expressions.length = 0;
  calculateResult();
}

function formatExpressions() {
  const formatted = [];
  expressions.forEach((value, key) => {
    const lastEl = expressions[key - 1];

    if (lastEl === "." && isNumber(value)) {
      return (formatted[key - 1] = `0.${value}`);
    }

    if (!lastEl && value === ".") {
      return formatted.push("0.");
    }

    if (!lastEl) return formatted.push(value);

    if (value === ".") {
      return (formatted[key - 1] = `${String(lastEl).replaceAll(".", "")}.`);
    }

    if (!isNaN(lastEl) && !isNaN(value))
      return (formatted[key - 1] = Number(`${lastEl}${value}`));

    formatted.push(value);
  });

  expressions.length = 0;
  expressions.push(...formatted);
}

function main() {
  showExpression();
}

select("app").addEventListener("click", main);
