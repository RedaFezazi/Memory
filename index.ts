const divs = document.querySelectorAll("div"),
  overlay = document.querySelector(".cover"),
  numberCards = 16;

let choices: string[][] = [],
  count: number = 0,
  randomNumArray: number[] = [],
  randomNum: number;

// This for loop will give each div's "data-card-attribute" a random number from 1 to 8
for (let i = 0; i < numberCards; i++) {
  // This while loop generates a random number, than saves it in the "randomNumArray" array so that it does not get reassigned more than two times.
  while (true) {
    randomNum = Math.ceil((Math.random() * numberCards) / 2);
    // This if statement checks if a value has been already assigned twice, if that is the case it will not allow it to be used again.
    if (randomNumArray.filter((value) => value === randomNum).length < 2) {
      break;
    }
  }
  // The number is saved in the array.
  randomNumArray.push(randomNum);
  // A unique number is then assigned to each div
  divs[i].setAttribute("data-card-number", randomNum.toString());
}

// This function is called when the user has clicked on two cards that do not match. It will then "flip" back the card to hide its number.
const flippingBack = (): void => {
  let firstChoice = document.getElementById(choices[0][0])?.firstChild;
  let secondChoice = document.getElementById(choices[1][0])?.firstChild;

  if (firstChoice && secondChoice) {
    firstChoice.textContent = "card";
    secondChoice.textContent = "card";
  }
  choices = [];
  // This line is responsible of activating desactivating a layer that covers te whole screen after that the user had clicked on two cards, avoiding eventual errors from clicking too many cards at a time.
  overlay?.classList.toggle("overlay");
};

/* this code snippet is mainly responsible for three things 
    1-(line 48 to 52) Adding a event listener to every card so that the card is flipped when clicked and the word "card" is replaced with the number saved in the dataset.
    2-(line 54 to 61) If two cards has been clicked and thier unique numbers do not match then we call the flippingBack function (line 29), but if they do match than nothing is done to the cards.
    3-(line 63 to 70) If the word "card" is not found in any card than it it congratulate the user and set the overlay so that the user can no longer play.
*/

divs.forEach((div) => {
  div.addEventListener("click", (e) => {
    if (div.firstChild && div.dataset?.cardNumber) {
      div.firstChild.textContent = div.dataset?.cardNumber;
      choices[count] = [div.id, div.dataset?.cardNumber];
      count++;
    }

    if (choices.length == 2 && choices[0][1] !== choices[1][1]) {
      overlay?.classList.toggle("overlay");
      count = 0;
      setTimeout(() => flippingBack(), 2000);
    } else if (choices.length == 2 && choices[0][1] == choices[1][1]) {
      count = 0;
      choices = [];
    }

    if (
      Array.from(divs).filter((div) => div.firstChild?.textContent == "card")
        .length == 0
    ) {
      overlay?.classList.toggle("overlay");
      if (overlay?.firstElementChild)
        overlay.firstElementChild.textContent = "Nice Job";
    }
  });
});
