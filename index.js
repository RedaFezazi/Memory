"use strict";
console.log("Hello world!");
const divs = document.querySelectorAll("div"),
  overlay = document.querySelector(".cover"),
  numberCards = 16;
let choices = [],
  count = 0,
  randomNumArray = [],
  randomNum;
for (let i = 0; i < numberCards; i++) {
  while (true) {
    randomNum = Math.ceil((Math.random() * numberCards) / 2);
    if (randomNumArray.filter((value) => value === randomNum).length < 2) {
      break;
    }
  }
  randomNumArray.push(randomNum);
  divs[i].setAttribute("data-card-number", randomNum.toString());
}
const checkingChoices = () => {
  var _a, _b;
  let firstChoice =
    (_a = document.getElementById(choices[0][0])) === null || _a === void 0
      ? void 0
      : _a.firstChild;
  let secondChoice =
    (_b = document.getElementById(choices[1][0])) === null || _b === void 0
      ? void 0
      : _b.firstChild;
  if (firstChoice && secondChoice) {
    firstChoice.textContent = "card";
    secondChoice.textContent = "card";
  }
  choices = [];
  overlay === null || overlay === void 0
    ? void 0
    : overlay.classList.toggle("overlay");
};
divs.forEach((div) => {
  div.addEventListener("click", (e) => {
    var _a, _b, _c;
    if (
      div.firstChild &&
      ((_a = div.dataset) === null || _a === void 0 ? void 0 : _a.cardNumber)
    ) {
      div.firstChild.textContent =
        (_b = div.dataset) === null || _b === void 0 ? void 0 : _b.cardNumber;
      choices[count] = [
        div.id,
        (_c = div.dataset) === null || _c === void 0 ? void 0 : _c.cardNumber,
      ];
      count++;
    }
    if (choices.length == 2 && choices[0][1] !== choices[1][1]) {
      overlay === null || overlay === void 0
        ? void 0
        : overlay.classList.toggle("overlay");
      count = 0;
      setTimeout(() => checkingChoices(), 2000);
    } else if (choices.length == 2 && choices[0][1] == choices[1][1]) {
      count = 0;
      choices = [];
    }
    if (
      Array.from(divs).filter((div) => {
        var _a;
        return (
          ((_a = div.firstChild) === null || _a === void 0
            ? void 0
            : _a.textContent) == "card"
        );
      }).length == 0
    ) {
      overlay === null || overlay === void 0
        ? void 0
        : overlay.classList.toggle("overlay");
      if (
        overlay === null || overlay === void 0
          ? void 0
          : overlay.firstElementChild
      )
        overlay.firstElementChild.textContent = "Nice Job";
    }
  });
});
//# sourceMappingURL=index.js.map
