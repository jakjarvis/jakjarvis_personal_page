"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
const rollBtn = document.querySelector(".roll_btn");
const dicePosition = [
  document.querySelector(".die_0"),
  document.querySelector(".die_1"),
  document.querySelector(".die_2"),
  document.querySelector(".die_3"),
  document.querySelector(".die_4"),
  document.querySelector(".die_5"),
];
let diceValues = [1, 2, 3, 4, 5, 6];
let diceOrder = ["white", "grey", "yellow", "blue", "green", "pink"];

/* ---- OBJECTS ---- */
//const whiteDice = { color: "#fffff" };
//const greyDice = { color: "#d3d3d3" };
//const yellowDice = { color: "#ffbb00" };
//const blueDice = { color: "#0000ff" };
//const greenDice = { color: "#0da10d" };
//const pinkDice = { color: "#ff8095" };

/* ---- GAME FUNCTIONS ---- */
// ROLL DICE
rollBtn.addEventListener("click", function () {
  let diceOrder = orderDice();
  console.log(diceOrder);
  displayDice(diceOrder);
  console.log(`Dice values are ${diceValues}, dice order is ${diceOrder}`);
});

function orderDice() {
  for (let i = 0; i < 6; i++) {
    let position = Math.trunc(Math.random() * 6);
    let temp = diceOrder[position];
    diceOrder[position] = diceOrder[i];
    diceOrder[i] = temp;
  }
  return diceOrder;
}

function removeColor(diceOrder, i) {
  for (let j = 0; j < 6; j++) {
    dicePosition[i].classList.remove(diceOrder[j]);
  }
}

function displayDice(diceOrder) {
  for (let i = 0; i < 6; i++) {
    console.log(`Die is ${dicePosition[i]}`);
    removeColor(diceOrder, i);
    dicePosition[i].classList.add(diceOrder[i]);
    console.log(`Colour is ${diceOrder[i]}`);
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceValues[i] = diceNumber;
    dicePosition[i].src = `resources/images/dice-${diceValues[i]}.png`;
    let diceHeight = Math.trunc(Math.random() * 95);
    dicePosition[i].style.top = `${diceHeight}px`;
    let diceWidth = Math.trunc(Math.random() * 45);
    dicePosition[i].style.left = `${diceWidth}px`;
    let diceAngle = Math.trunc(Math.random() * 90);
    dicePosition[i].style.transform = `rotate(${diceAngle}deg)`;
  }
}

// SELECT DICE
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
