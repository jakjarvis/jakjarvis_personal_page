"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let diceValues = [1, 2, 3, 4, 5, 6];
let diceColor = ["white", "grey", "yellow", "blue", "green", "pink"];
let lock = true;

/* ---- ELEMENTS ---- */
const rollBtn = document.querySelector(".roll_btn");
const dicePosition = [
  document.querySelector(".die_0"),
  document.querySelector(".die_1"),
  document.querySelector(".die_2"),
  document.querySelector(".die_3"),
  document.querySelector(".die_4"),
  document.querySelector(".die_5"),
];
const selectedDie = [
  document.querySelector(".s_die1"),
  document.querySelector(".s_die2"),
  document.querySelector(".s_die3"),
];

/* ---- OBJECTS ---- */
let selectedDice = {
  die1: null,
  die2: null,
  die3: null,
};

let dicePlate = {
  die1: null,
  die2: null,
  die3: null,
  die4: null,
  die5: null,
  die6: null,
};

/* ---- GAME FUNCTIONS ---- */
// ROLL DICE
rollBtn.addEventListener("click", function () {
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
    dicePosition[i].classList.remove(diceColor[j]);
  }
}

function renderVisible() {
  for (let i = 0; i < 6; i++) {
    dicePosition[i].classList.remove("hidden");
  }
}

function displayDice(diceColor) {
  for (let i = 0; i < 6; i++) {
    removeColor(diceColor, i);
    dicePosition[i].classList.add(diceColor[i]);
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceValues[i] = diceNumber;
    dicePosition[i].src = `resources/images/dice-${diceValues[i]}.png`;
    let diceHeight = Math.trunc(Math.random() * 95);
    dicePosition[i].style.top = `${diceHeight}px`;
    let diceWidth = Math.trunc(Math.random() * 45);
    dicePosition[i].style.left = `${diceWidth}px`;
    let diceAngle = Math.trunc(Math.random() * 90);
    dicePosition[i].style.transform = `rotate(${diceAngle}deg)`;
    renderVisible();
  }
}

// SELECT DICE
dicePosition[0].addEventListener("click", function () {
  selectDice(0);
  lock = true;
});
dicePosition[1].addEventListener("click", function () {
  selectDice(1);
  lock = true;
});
dicePosition[2].addEventListener("click", function () {
  selectDice(2);
  lock = true;
});
dicePosition[3].addEventListener("click", function () {
  selectDice(3);
  lock = true;
});
dicePosition[4].addEventListener("click", function () {
  selectDice(4);
  lock = true;
});
dicePosition[5].addEventListener("click", function () {
  selectDice(5);
  lock = true;
});

function selectDice(position) {
  if (lock == false) {
    if (selectedDice.die1 == null) {
      selectedDice.die1 = [diceValues[position], diceColor[position]];
      console.log(
        `First selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDie[0].classList.add(diceColor[position]);
      selectedDie[0].classList.remove("hidden");
      selectedDie[0].src = `resources/images/dice-${diceValues[position]}.png`;
    } else if (selectedDice.die2 == null) {
      selectedDice.die2 = [diceValues[position], diceColor[position]];
      console.log(
        `Second selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDie[1].classList.add(diceColor[position]);
      selectedDie[1].classList.remove("hidden");
      selectedDie[1].src = `resources/images/dice-${diceValues[position]}.png`;
    } else if (selectedDice.die3 == null) {
      selectedDice.die3 = [diceValues[position], diceColor[position]];
      console.log(
        `Third selected die is ${diceValues[position]} ${diceColor[position]}`
      );
      selectedDie[2].classList.add(diceColor[position]);
      selectedDie[2].classList.remove("hidden");
      selectedDie[2].src = `resources/images/dice-${diceValues[position]}.png`;
    } else {
      console.log(`All dice selected`);
    }
  }
}

function removeDice(selectedColor, selectedValue) {
  //function to remove selected die from the pool and send lower dice to plate
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
