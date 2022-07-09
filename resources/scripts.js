"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let lock = true;

/* ---- ELEMENTS ---- */
const rollBtnEl = document.querySelector(".roll_btn");

/* ---- OBJECTS ---- */

let selectedDice = {
  empty: [true, true, true],
  colors: [null, null, null],
  values: [null, null, null],
  elements: [
    document.querySelector(".s_die0"),
    document.querySelector(".s_die1"),
    document.querySelector(".s_die2"),
  ],
};

let diceMat = {
  empty: [true, true, true, true, true, true],
  colors: [null, null, null, null, null, null],
  values: [null, null, null, null, null, null],
  tops: [null, null, null, null, null, null],
  lefts: [null, null, null, null, null, null],
  angles: [null, null, null, null, null, null],
  elements: [
    document.querySelector(".die_0"),
    document.querySelector(".die_1"),
    document.querySelector(".die_2"),
    document.querySelector(".die_3"),
    document.querySelector(".die_4"),
    document.querySelector(".die_5"),
  ],
};

let dicePlate = {
  empty: [true, true, true, true, true],
  colors: [null, null, null, null, null],
  values: [null, null, null, null, null],
  elements: [
    document.querySelector(".plate_0"),
    document.querySelector(".plate_1"),
    document.querySelector(".plate_2"),
    document.querySelector(".plate_3"),
    document.querySelector(".plate_4"),
  ],
};

/* ---- GAME FUNCTIONS ---- */
// ROLL DICE
rollBtnEl.addEventListener("click", function () {
  if (!selectedDice.values[2]) {
    orderDice();
    displayDice();
    console.log(
      `Dice values are ${diceMat.values}, dice colors are ${diceMat.colors}`
    );
    lock = false;
  } else {
    console.log("All dice selected");
  }
});

function orderDice() {
  for (let i = 0; i < 6; i++) {
    diceMat.colors = ["white", "grey", "yellow", "blue", "green", "pink"];
    let position = Math.trunc(Math.random() * 6);
    let temp = diceMat.colors[position];
    diceMat.colors[position] = diceMat.colors[i];
    diceMat.colors[i] = temp;
  }
}

function removeColor(i) {
  for (let j = 0; j < 6; j++) {
    diceMat.elements[i].classList.remove(diceMat.colors[j]);
  }
}

function renderVisible() {
  for (let i = 0; i < 6; i++) {
    if (selectedDice.colors.includes(diceMat.colors[i])) {
      diceMat.elements[i].classList.add("hidden");
    } else {
      diceMat.elements[i].classList.remove("hidden");
    }
  }
}

function displayDice() {
  for (let i = 0; i < 6; i++) {
    removeColor(i);
    diceMat.elements[i].classList.add(diceMat.colors[i]);
    diceMat.values[i] = Math.trunc(Math.random() * 6) + 1;
    diceMat.elements[i].src = `resources/images/dice-${diceMat.values[i]}.png`;
    diceMat.tops[i] = Math.trunc(Math.random() * 95);
    diceMat.elements[i].style.top = `${diceMat.tops[i]}px`;
    diceMat.lefts[i] = Math.trunc(Math.random() * 45);
    diceMat.elements[i].style.left = `${diceMat.lefts[i]}px`;
    diceMat.angles[i] = Math.trunc(Math.random() * 90);
    diceMat.elements[i].style.transform = `rotate(${diceMat.angles[i]}deg)`;
    renderVisible();
  }
}

// SELECT DICE
diceMat.elements[0].addEventListener("click", function () {
  selectDice(0);
  lock = true;
});
diceMat.elements[1].addEventListener("click", function () {
  selectDice(1);
  lock = true;
});
diceMat.elements[2].addEventListener("click", function () {
  selectDice(2);
  lock = true;
});
diceMat.elements[3].addEventListener("click", function () {
  selectDice(3);
  lock = true;
});
diceMat.elements[4].addEventListener("click", function () {
  selectDice(4);
  lock = true;
});
diceMat.elements[5].addEventListener("click", function () {
  selectDice(5);
  lock = true;
});

function selectDice(position) {
  if (lock == false) {
    for (let i = 0; i < 3; i++) {
      if (selectedDice.values[i] == null) {
        console.log(
          `Selected die ${position} is a ${diceMat.colors[position]} ${diceMat.values[position]} `
        );
        selectedDice.elements[i].classList.add(diceMat.colors[position]);
        selectedDice.elements[i].classList.remove("hidden");
        selectedDice.elements[
          i
        ].src = `resources/images/dice-${diceMat.values[position]}.png`;
        selectedDice.colors[i] = diceMat.colors[position];
        selectedDice.values[i] = diceMat.values[position];
        break;
      }
    }
    diceMat.elements[position].classList.add("hidden");
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
