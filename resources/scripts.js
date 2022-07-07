"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let diceValues = [1, 2, 3, 4, 5, 6];
let diceColor = ["white", "grey", "yellow", "blue", "green", "pink"];
let lock = true;

/* ---- ELEMENTS ---- */
const rollBtnEl = document.querySelector(".roll_btn");
const dicePositionEl = [
  document.querySelector(".die_0"),
  document.querySelector(".die_1"),
  document.querySelector(".die_2"),
  document.querySelector(".die_3"),
  document.querySelector(".die_4"),
  document.querySelector(".die_5"),
];
const selectedDieEl = [
  document.querySelector(".s_die1"),
  document.querySelector(".s_die2"),
  document.querySelector(".s_die3"),
];

/* ---- OBJECTS ---- */
let selectedDice = {
  diceColors: [null, null, null],
  diceValue: [null, null, null],
};

let dicePlate = {
  diceColors: [],
  diceValues: [],
};

/* ---- GAME FUNCTIONS ---- */
// ROLL DICE
rollBtnEl.addEventListener("click", function () {
  let diceOrder = orderDice();
  displayDice(diceOrder);
  console.log(`Dice values are ${diceValues}, dice order is ${diceOrder}`);
  lock = false;
});

function orderDice() {
  for (let i = 0; i < 6; i++) {
    let position = Math.trunc(Math.random() * 6);
    let temp = diceColor[position];
    diceColor[position] = diceColor[i];
    diceColor[i] = temp;
  }
  return diceColor;
}

function removeColor(diceColor, i) {
  for (let j = 0; j < 6; j++) {
    dicePositionEl[i].classList.remove(diceColor[j]);
  }
}

function renderVisible(diceColor) {
  for (let i = 0; i < 6; i++) {
    if (selectedDice.diceColors.includes(diceColor[i])) {
      dicePositionEl[i].classList.add("hidden");
    } else {
      dicePositionEl[i].classList.remove("hidden");
    }
  }
}

function displayDice(diceColor) {
  for (let i = 0; i < 6; i++) {
    removeColor(diceColor, i);
    dicePositionEl[i].classList.add(diceColor[i]);
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceValues[i] = diceNumber;
    dicePositionEl[i].src = `resources/images/dice-${diceValues[i]}.png`;
    let diceHeight = Math.trunc(Math.random() * 95);
    dicePositionEl[i].style.top = `${diceHeight}px`;
    let diceWidth = Math.trunc(Math.random() * 45);
    dicePositionEl[i].style.left = `${diceWidth}px`;
    let diceAngle = Math.trunc(Math.random() * 90);
    dicePositionEl[i].style.transform = `rotate(${diceAngle}deg)`;
    renderVisible(diceColor);
  }
}

// SELECT DICE
dicePositionEl[0].addEventListener("click", function () {
  selectDice(0);
  lock = true;
});
dicePositionEl[1].addEventListener("click", function () {
  selectDice(1);
  lock = true;
});
dicePositionEl[2].addEventListener("click", function () {
  selectDice(2);
  lock = true;
});
dicePositionEl[3].addEventListener("click", function () {
  selectDice(3);
  lock = true;
});
dicePositionEl[4].addEventListener("click", function () {
  selectDice(4);
  lock = true;
});
dicePositionEl[5].addEventListener("click", function () {
  selectDice(5);
  lock = true;
});

function selectDice(position) {
  if (lock == false) {
    if (selectedDice.diceValue[0] == null) {
      console.log(
        `First selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDieEl[0].classList.add(diceColor[position]);
      selectedDieEl[0].classList.remove("hidden");
      selectedDieEl[0].src = `resources/images/dice-${diceValues[position]}.png`;
      selectedDice.diceColors[0] = diceColor[position];
      selectedDice.diceValue[0] = diceValues[position];
    } else if (selectedDice.diceValue[1] == null) {
      console.log(
        `Second selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDieEl[1].classList.add(diceColor[position]);
      selectedDieEl[1].classList.remove("hidden");
      selectedDieEl[1].src = `resources/images/dice-${diceValues[position]}.png`;
      selectedDice.diceColors[1] = diceColor[position];
      selectedDice.diceValue[1] = diceValues[position];
    } else if (selectedDice.diceValue[2] == null) {
      console.log(
        `Third selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDieEl[2].classList.add(diceColor[position]);
      selectedDieEl[2].classList.remove("hidden");
      selectedDieEl[2].src = `resources/images/dice-${diceValues[position]}.png`;
      selectedDice.diceColors[2] = diceColor[position];
      selectedDice.diceValue[2] = diceValues[position];
    } else {
      console.log(`All dice selected`);
    }
    console.log(selectedDice.diceColors);
    dicePositionEl[position].classList.add("hidden");
  }
}

function removeDice(selectedColor, selectedValue) {
  // remove lower dice to the plate
}
// USE REROLL
// USE RETURN
// USE ADDITIONAL
// USE CHOICE
// USE BONUS COLOR
// ADVANCE TURN
// CALCULATE SCORE

/* ---- GREY FUNCTIONS ---- */

/* ---- YELLOW FUNCTIONS ---- */

/* ---- BLUE FUNCTIONS ---- */

/* ---- GREEN FUNCTIONS ---- */

/* ---- PINK FUNCTIONS ---- */
