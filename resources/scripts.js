"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let diceLock = true;
let rollLock = false;
let scoringLock = false;
let returnLock = true;
let additionalLock = true;
let turn = 1;
let turnEnd = false;
let fuchs = 0;

/* ---- ELEMENTS ---- */
const testBtnEl = document.querySelector(".test_btn"); // DELETE IN PROD
const rollBtnEl = document.querySelector(".roll_btn");
const turnBtnEl = document.querySelector(".turn_btn");
const logger = document.querySelector(".messages");

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
  empty: [false, false, false, false, false, false],
  colors: ["white", "grey", "yellow", "blue", "green", "pink"],
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

let turnTrack = {
  elements: [
    0,
    document.querySelector("#one.turn_title"),
    document.querySelector("#two.turn_title"),
    document.querySelector("#three.turn_title"),
    document.querySelector("#four.turn_title"),
    document.querySelector("#five.turn_title"),
    document.querySelector("#six.turn_title"),
  ],
};

let rerollTrack = {
  achieved: [false, false, false, false, false, false],
  taken: [false, false, false, false, false, false],
  bonuses: false,
  elements: [
    document.querySelector(".reroll_bubble0"),
    document.querySelector(".reroll_bubble1"),
    document.querySelector(".reroll_bubble2"),
    document.querySelector(".reroll_bubble3"),
    document.querySelector(".reroll_bubble4"),
    document.querySelector(".reroll_bubble5"),
  ],
};

let returnTrack = {
  achieved: [false, false, false, false, false, false],
  taken: [false, false, false, false, false, false],
  bonuses: false,
  elements: [
    document.querySelector(".return_bubble0"),
    document.querySelector(".return_bubble1"),
    document.querySelector(".return_bubble2"),
    document.querySelector(".return_bubble3"),
    document.querySelector(".return_bubble4"),
    document.querySelector(".return_bubble5"),
  ],
};

let additionalTrack = {
  achieved: [false, false, false, false, false, false],
  taken: [false, false, false, false, false, false],
  bonuses: false,
  elements: [
    document.querySelector(".additional_bubble0"),
    document.querySelector(".additional_bubble1"),
    document.querySelector(".additional_bubble2"),
    document.querySelector(".additional_bubble3"),
    document.querySelector(".additional_bubble4"),
    document.querySelector(".additional_bubble5"),
  ],
};

let greyBoard = {
  scores: [
    ["yellow", false, false, false, false, false, false],
    ["blue", false, false, false, false, false, false],
    ["green", false, false, false, false, false, false],
    ["pink", false, false, false, false, false, false],
  ],
  bonuses: [0, false, false, false, false, false, false],
  elements: [
    [
      "yellow",
      document.querySelector(".grey_yellow_1"),
      document.querySelector(".grey_yellow_2"),
      document.querySelector(".grey_yellow_3"),
      document.querySelector(".grey_yellow_4"),
      document.querySelector(".grey_yellow_5"),
      document.querySelector(".grey_yellow_6"),
    ],
    [
      "blue",
      document.querySelector(".grey_blue_1"),
      document.querySelector(".grey_blue_2"),
      document.querySelector(".grey_blue_3"),
      document.querySelector(".grey_blue_4"),
      document.querySelector(".grey_blue_5"),
      document.querySelector(".grey_blue_6"),
    ],
    [
      "green",
      document.querySelector(".grey_green_1"),
      document.querySelector(".grey_green_2"),
      document.querySelector(".grey_green_3"),
      document.querySelector(".grey_green_4"),
      document.querySelector(".grey_green_5"),
      document.querySelector(".grey_green_6"),
    ],
    [
      "pink",
      document.querySelector(".grey_pink_1"),
      document.querySelector(".grey_pink_2"),
      document.querySelector(".grey_pink_3"),
      document.querySelector(".grey_pink_4"),
      document.querySelector(".grey_pink_5"),
      document.querySelector(".grey_pink_6"),
    ],
  ],
  greyAndWhite: 0,
};

let yellowBoard = {
  scores: [null, null, null, null, null, null, null, null, null, null],
  numbers: [3, 6, 1, 2, 4, 3, 2, 5, 5, 4],
  bonuses: [false, false, false, false, false, false, false, false, false],
  bonusLines: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [2, 6],
    [0, 4, 8],
    [3, 7],
    [1, 5, 9],
  ],
  elements: [
    document.querySelector("#one.yellow_box"),
    document.querySelector("#two.yellow_box"),
    document.querySelector("#three.yellow_box"),
    document.querySelector("#four.yellow_box"),
    document.querySelector("#five.yellow_box"),
    document.querySelector("#six.yellow_box"),
    document.querySelector("#seven.yellow_box"),
    document.querySelector("#eight.yellow_box"),
    document.querySelector("#nine.yellow_box"),
    document.querySelector("#ten.yellow_box"),
  ],
};

let blueBoard = {
  scores: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  bonuses: [false, false, false, false, false, false, false, false],
  elements: [
    document.querySelector("#one.blue_box"),
    document.querySelector("#two.blue_box"),
    document.querySelector("#three.blue_box"),
    document.querySelector("#four.blue_box"),
    document.querySelector("#five.blue_box"),
    document.querySelector("#six.blue_box"),
    document.querySelector("#seven.blue_box"),
    document.querySelector("#eight.blue_box"),
    document.querySelector("#nine.blue_box"),
    document.querySelector("#ten.blue_box"),
    document.querySelector("#eleven.blue_box"),
    document.querySelector("#twelve.blue_box"),
  ],
};

let greenBoard = {
  scores: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  multipliers: [2, 2, 2, 1, 3, 3, 3, 2, 3, 1, 4, 1],
  bonuses: [false, false, false, false, false, false, false, false],
  scoreBoxes: [false, false, false, false, false],
  elements: [
    document.querySelector("#one.green_box"),
    document.querySelector("#two.green_box"),
    document.querySelector("#three.green_box"),
    document.querySelector("#four.green_box"),
    document.querySelector("#five.green_box"),
    document.querySelector("#six.green_box"),
    document.querySelector("#seven.green_box"),
    document.querySelector("#eight.green_box"),
    document.querySelector("#nine.green_box"),
    document.querySelector("#ten.green_box"),
    document.querySelector("#eleven.green_box"),
    document.querySelector("#twelve.green_box"),
  ],
  scoreBoxElements: [
    document.querySelector("#one.green_score"),
    document.querySelector("#two.green_score"),
    document.querySelector("#three.green_score"),
    document.querySelector("#four.green_score"),
    document.querySelector("#five.green_score"),
    document.querySelector("#six.green_score"),
  ],
};

let pinkBoard = {
  scores: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  minimums: [1, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6],
  bonuses: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  elements: [
    document.querySelector("#one.pink_box"),
    document.querySelector("#two.pink_box"),
    document.querySelector("#three.pink_box"),
    document.querySelector("#four.pink_box"),
    document.querySelector("#five.pink_box"),
    document.querySelector("#six.pink_box"),
    document.querySelector("#seven.pink_box"),
    document.querySelector("#eight.pink_box"),
    document.querySelector("#nine.pink_box"),
    document.querySelector("#ten.pink_box"),
    document.querySelector("#eleven.pink_box"),
    document.querySelector("#twelve.pink_box"),
  ],
};

/* ---- EVENT LISTENERS ---- */

// Buttons
// TEST FUNCTION --- DELETE IN PROD
testBtnEl.addEventListener("click", function () {
  achieveReroll();
  achieveReturn();
  achieveAdditional();
});

rollBtnEl.addEventListener("click", function () {
  if (!rollLock && !scoringLock && diceMat.empty.includes(false)) {
    orderDice();
    displayDice();
    rollLock = true;
    diceLock = false;
    console.log(
      `Dice values are ${diceMat.values}, dice colors are ${diceMat.colors}`
    );
  } else if (rollLock) {
    printLog(`Pick a dice before you reroll`);
  } else if (scoringLock) {
    printLog(`Pick your scores`);
  } else {
    printLog("All dice selected");
  }
});

turnBtnEl.addEventListener("click", function () {
  if (turnEnd) {
    advanceTurn();
    turnEnd = false;
  } else {
    printLog(`Current turn is not over yet!`);
  }
});

// Dice Mat
diceMat.elements[0].addEventListener("click", function () {
  diceMatClick(0);
});
diceMat.elements[1].addEventListener("click", function () {
  diceMatClick(1);
});
diceMat.elements[2].addEventListener("click", function () {
  diceMatClick(2);
});
diceMat.elements[3].addEventListener("click", function () {
  diceMatClick(3);
});
diceMat.elements[4].addEventListener("click", function () {
  diceMatClick(4);
});
diceMat.elements[5].addEventListener("click", function () {
  diceMatClick(5);
});

// Dice Plate
dicePlate.elements[0].addEventListener("click", function () {
  dicePlateClick(0);
});
dicePlate.elements[1].addEventListener("click", function () {
  dicePlateClick(1);
});
dicePlate.elements[2].addEventListener("click", function () {
  dicePlateClick(2);
});
dicePlate.elements[3].addEventListener("click", function () {
  dicePlateClick(3);
});
dicePlate.elements[4].addEventListener("click", function () {
  dicePlateClick(4);
});

// Tracks
rerollTrack.elements[0].addEventListener("click", function () {
  takeReroll(0);
});
rerollTrack.elements[1].addEventListener("click", function () {
  takeReroll(1);
});
rerollTrack.elements[2].addEventListener("click", function () {
  takeReroll(2);
});
rerollTrack.elements[3].addEventListener("click", function () {
  takeReroll(3);
});
rerollTrack.elements[4].addEventListener("click", function () {
  takeReroll(4);
});
rerollTrack.elements[5].addEventListener("click", function () {
  takeReroll(5);
});

returnTrack.elements[0].addEventListener("click", function () {
  takeReturn(0);
});
returnTrack.elements[1].addEventListener("click", function () {
  takeReturn(1);
});
returnTrack.elements[2].addEventListener("click", function () {
  takeReturn(2);
});
returnTrack.elements[3].addEventListener("click", function () {
  takeReturn(3);
});
returnTrack.elements[4].addEventListener("click", function () {
  takeReturn(4);
});
returnTrack.elements[5].addEventListener("click", function () {
  takeReturn(5);
});

additionalTrack.elements[0].addEventListener("click", function () {
  takeAdditional(0);
});
additionalTrack.elements[1].addEventListener("click", function () {
  takeAdditional(1);
});
additionalTrack.elements[2].addEventListener("click", function () {
  takeAdditional(2);
});
additionalTrack.elements[3].addEventListener("click", function () {
  takeAdditional(3);
});
additionalTrack.elements[4].addEventListener("click", function () {
  takeAdditional(4);
});
additionalTrack.elements[5].addEventListener("click", function () {
  takeAdditional(5);
});

greyBoard.elements[0][1].addEventListener("click", function () {
  selectGrey(0, 1);
});
greyBoard.elements[0][2].addEventListener("click", function () {
  selectGrey(0, 2);
});
greyBoard.elements[0][3].addEventListener("click", function () {
  selectGrey(0, 3);
});
greyBoard.elements[0][4].addEventListener("click", function () {
  selectGrey(0, 4);
});
greyBoard.elements[0][5].addEventListener("click", function () {
  selectGrey(0, 5);
});
greyBoard.elements[0][6].addEventListener("click", function () {
  selectGrey(0, 6);
});
greyBoard.elements[1][1].addEventListener("click", function () {
  selectGrey(1, 1);
});
greyBoard.elements[1][2].addEventListener("click", function () {
  selectGrey(1, 2);
});
greyBoard.elements[1][3].addEventListener("click", function () {
  selectGrey(1, 3);
});
greyBoard.elements[1][4].addEventListener("click", function () {
  selectGrey(1, 4);
});
greyBoard.elements[1][5].addEventListener("click", function () {
  selectGrey(1, 5);
});
greyBoard.elements[1][6].addEventListener("click", function () {
  selectGrey(1, 6);
});
greyBoard.elements[2][1].addEventListener("click", function () {
  selectGrey(2, 1);
});
greyBoard.elements[2][2].addEventListener("click", function () {
  selectGrey(2, 2);
});
greyBoard.elements[2][3].addEventListener("click", function () {
  selectGrey(2, 3);
});
greyBoard.elements[2][4].addEventListener("click", function () {
  selectGrey(2, 4);
});
greyBoard.elements[2][5].addEventListener("click", function () {
  selectGrey(2, 5);
});
greyBoard.elements[2][6].addEventListener("click", function () {
  selectGrey(2, 6);
});
greyBoard.elements[3][1].addEventListener("click", function () {
  selectGrey(3, 1);
});
greyBoard.elements[3][2].addEventListener("click", function () {
  selectGrey(3, 2);
});
greyBoard.elements[3][3].addEventListener("click", function () {
  selectGrey(3, 3);
});
greyBoard.elements[3][4].addEventListener("click", function () {
  selectGrey(3, 4);
});
greyBoard.elements[3][5].addEventListener("click", function () {
  selectGrey(3, 5);
});
greyBoard.elements[3][6].addEventListener("click", function () {
  selectGrey(3, 6);
});

yellowBoard.elements[0].addEventListener("click", function () {
  selectYellow(0);
});
yellowBoard.elements[1].addEventListener("click", function () {
  selectYellow(1);
});
yellowBoard.elements[2].addEventListener("click", function () {
  selectYellow(2);
});
yellowBoard.elements[3].addEventListener("click", function () {
  selectYellow(3);
});
yellowBoard.elements[4].addEventListener("click", function () {
  selectYellow(4);
});
yellowBoard.elements[5].addEventListener("click", function () {
  selectYellow(5);
});
yellowBoard.elements[6].addEventListener("click", function () {
  selectYellow(6);
});
yellowBoard.elements[7].addEventListener("click", function () {
  selectYellow(7);
});
yellowBoard.elements[8].addEventListener("click", function () {
  selectYellow(8);
});
yellowBoard.elements[9].addEventListener("click", function () {
  selectYellow(9);
});

blueBoard.elements[0].addEventListener("click", function () {
  selectBlue(0);
});
blueBoard.elements[1].addEventListener("click", function () {
  selectBlue(1);
});
blueBoard.elements[2].addEventListener("click", function () {
  selectBlue(2);
});
blueBoard.elements[3].addEventListener("click", function () {
  selectBlue(3);
});
blueBoard.elements[4].addEventListener("click", function () {
  selectBlue(4);
});
blueBoard.elements[5].addEventListener("click", function () {
  selectBlue(5);
});
blueBoard.elements[6].addEventListener("click", function () {
  selectBlue(6);
});
blueBoard.elements[7].addEventListener("click", function () {
  selectBlue(7);
});
blueBoard.elements[8].addEventListener("click", function () {
  selectBlue(8);
});
blueBoard.elements[9].addEventListener("click", function () {
  selectBlue(9);
});
blueBoard.elements[10].addEventListener("click", function () {
  selectBlue(10);
});
blueBoard.elements[11].addEventListener("click", function () {
  selectBlue(11);
});

greenBoard.elements[0].addEventListener("click", function () {
  selectGreen(0);
});
greenBoard.elements[1].addEventListener("click", function () {
  selectGreen(1);
});
greenBoard.elements[2].addEventListener("click", function () {
  selectGreen(2);
});
greenBoard.elements[3].addEventListener("click", function () {
  selectGreen(3);
});
greenBoard.elements[4].addEventListener("click", function () {
  selectGreen(4);
});
greenBoard.elements[5].addEventListener("click", function () {
  selectGreen(5);
});
greenBoard.elements[6].addEventListener("click", function () {
  selectGreen(6);
});
greenBoard.elements[7].addEventListener("click", function () {
  selectGreen(7);
});
greenBoard.elements[8].addEventListener("click", function () {
  selectGreen(8);
});
greenBoard.elements[9].addEventListener("click", function () {
  selectGreen(9);
});
greenBoard.elements[10].addEventListener("click", function () {
  selectGreen(10);
});
greenBoard.elements[11].addEventListener("click", function () {
  selectGreen(11);
});

pinkBoard.elements[0].addEventListener("click", function () {
  selectPink(0);
});
pinkBoard.elements[1].addEventListener("click", function () {
  selectPink(1);
});
pinkBoard.elements[2].addEventListener("click", function () {
  selectPink(2);
});
pinkBoard.elements[3].addEventListener("click", function () {
  selectPink(3);
});
pinkBoard.elements[4].addEventListener("click", function () {
  selectPink(4);
});
pinkBoard.elements[5].addEventListener("click", function () {
  selectPink(5);
});
pinkBoard.elements[6].addEventListener("click", function () {
  selectPink(6);
});
pinkBoard.elements[7].addEventListener("click", function () {
  selectPink(7);
});
pinkBoard.elements[8].addEventListener("click", function () {
  selectPink(8);
});
pinkBoard.elements[9].addEventListener("click", function () {
  selectPink(9);
});
pinkBoard.elements[10].addEventListener("click", function () {
  selectPink(10);
});
pinkBoard.elements[11].addEventListener("click", function () {
  selectPink(11);
});

/* ---- GAME FUNCTIONS ---- */

// ADVANCE TURN

function advanceTurn() {
  if (turn < 6) {
    turnTrack.elements[turn].classList.remove("active_turn");
    turn += 1;
    turnTrack.elements[turn].classList.add("active_turn");
    for (let i = 0; i < 3; i++) {
      diceMat.empty = [false, false, false, false, false, false];
      selectedDice.empty[i] = true;
      selectedDice.colors[i] = null;
      selectedDice.values[i] = null;
      selectedDice.elements[i].classList.add("hidden");
      removeColor(selectedDice.elements[i]);
    }
    for (let i = 0; i < 5; i++) {
      dicePlate.empty[i] = true;
      dicePlate.colors[i] = null;
      dicePlate.values[i] = null;
      dicePlate.elements[i].classList.add("hidden");
      removeColor(dicePlate.elements[i]);
    }
    turnEnd = false;
    printLog(`Start of round ${turn}`);
  } else {
    calculateScores();
  }
}

function checkTurnEnd() {
  if (!diceMat.empty.includes(false)) {
    turnEnd = true;
  }
  return;
}

function calculateScores() {
  console.log("Still to define function");
}

// ROLL DICE
function orderDice() {
  for (let i = 0; i < 6; i++) {
    let position = Math.trunc(Math.random() * 6);
    let tempColor = diceMat.colors[position];
    let tempState = diceMat.empty[position];
    diceMat.colors[position] = diceMat.colors[i];
    diceMat.empty[position] = diceMat.empty[i];
    diceMat.colors[i] = tempColor;
    diceMat.empty[i] = tempState;
  }
}

function displayDice() {
  for (let i = 0; i < 6; i++) {
    removeColor(diceMat.elements[i]);
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

function removeColor(element) {
  for (let j = 0; j < 6; j++) {
    element.classList.remove(diceMat.colors[j]);
  }
}

function renderVisible() {
  for (let i = 0; i < 6; i++) {
    if (
      selectedDice.colors.includes(diceMat.colors[i]) ||
      dicePlate.colors.includes(diceMat.colors[i])
    ) {
      diceMat.elements[i].classList.add("hidden");
    } else {
      diceMat.elements[i].classList.remove("hidden");
    }
  }
}

// SELECT DICE
function diceMatClick(elementId) {
  if (checkDice(elementId) == true) {
    selectDice(elementId);
    diceLock = true;
    rollLock = false;
  } else {
    printLog(`Invalid choice`);
  }
}

function checkDice(position) {
  if (diceMat.colors[position] == "grey") {
    return true;
  }
  if (diceMat.colors[position] == "yellow") {
    if (checkYellow(diceMat.values[position]) == false) {
      printLog(`No available box for a ${diceMat.values[position]}`);
      return false;
    }
  }
  if (diceMat.colors[position] == "blue") {
    if (checkBlue(diceMat.values[position], findWhite()) == false) {
      printLog(
        `Chosen total of ${
          diceMat.values[position] + findWhite()
        } is not >= the last score, or track is full!`
      );
      return false;
    }
  }
  if (diceMat.colors[position] == "green") {
    if (checkGreen(diceMat.values[position]) == false) {
      printLog(`Green track is full!`);
      return false;
    }
  }
  if (diceMat.colors[position] == "pink") {
    if (checkPink(diceMat.values[position]) == false) {
      printLog(
        `${diceMat.values[position]} is not >= target, or track is full!`
      );
      return false;
    }
  }
  return true;
}

function selectDice(position) {
  if (diceLock == false) {
    for (let i = 0; i < 3; i++) {
      if (selectedDice.values[i] == null) {
        console.log(`Moving to position ${i}`);
        selectedDice.elements[i].classList.add(diceMat.colors[position]);
        console.log(`Adding class ${diceMat.colors[position]}`);
        selectedDice.elements[i].classList.remove("hidden");
        selectedDice.elements[
          i
        ].src = `resources/images/dice-${diceMat.values[position]}.png`;
        selectedDice.colors[i] = diceMat.colors[position];
        selectedDice.values[i] = diceMat.values[position];
        let removedDice = removeDice(diceMat.values[position], position);
        diceMat.empty[position] = true;
        diceMat.elements[position].classList.add("hidden");
        resolveDice(
          selectedDice.values[i],
          selectedDice.colors[i],
          removedDice
        );
        break;
      }
    }
    return true;
  } else {
    printLog(`Roll the dice first!`);
    return false;
  }
}

function removeDice(value, position) {
  let removedDice = [];
  for (let i = 0; i < 6; i++) {
    if (!diceMat.empty[i]) {
      if (diceMat.values[i] < value) {
        removedDice.push([diceMat.colors[i], diceMat.values[i]]);
      }
      if (
        i != position &&
        (diceMat.values[i] < value || selectedDice.values[2])
      ) {
        diceMat.empty[i] = true;
        diceMat.elements[i].classList.add("hidden");
        addToPlate(diceMat.values[i], diceMat.colors[i]);
      }
    }
  }
  return removedDice;
}

function addToPlate(value, color) {
  console.log(`Adding ${color} ${value} to plate`);
  for (let j = 0; j < 5; j++) {
    if (dicePlate.empty[j]) {
      dicePlate.empty[j] = false;
      dicePlate.values[j] = value;
      dicePlate.colors[j] = color;
      dicePlate.elements[j].src = `resources/images/dice-${value}.png`;
      dicePlate.elements[j].classList.add(color);
      dicePlate.elements[j].classList.remove("hidden");
      break;
    }
  }
}

function dicePlateClick(elementId) {
  if (!returnLock) {
    returnDice(
      elementId,
      dicePlate.values[elementId],
      dicePlate.colors[elementId]
    );
  } else if (!additionalLock) {
    useAdditional(
      elementId,
      dicePlate.values[elementId],
      dicePlate.colors[elementId]
    );
  }
}

function resolveDice(value, color, removedDice) {
  if (color == "grey") {
    resolveGrey(value, removedDice);
  } else if (color == "yellow") {
    resolveYellow(value);
  } else if (color == "blue") {
    resolveBlue(value);
  } else if (color == "green") {
    resolveGreen(value);
  } else if (color == "pink") {
    resolvePink(value);
  } else if (color == "white") {
    resolveWhite(value);
  }
}

// USE REROLL
function takeReroll(position) {
  if (rerollTrack.achieved[position]) {
    rollLock = false;
    diceLock = true;
    rerollTrack.elements[position].insertAdjacentText("beforeend", "X");
    rerollTrack.taken[position] = true;
  }
}

function achieveReroll() {
  for (let i = 0; i < 6; i++) {
    if (!rerollTrack.achieved[i]) {
      rerollTrack.achieved[i] = true;
      rerollTrack.elements[i].classList.add("achieved");
      if (i == 5) {
        fuchs += 1;
      }
      break;
    }
  }
}

// USE RETURN
function takeReturn(position) {
  if (returnTrack.achieved[position]) {
    returnLock = false;
    diceLock = true;
    rollLock = true;
    returnTrack.elements[position].insertAdjacentText("beforeend", "X");
    returnTrack.taken[position] = true;
    console.log(`Select a die to return`);
  }
}

function achieveReturn() {
  for (let i = 0; i < 6; i++) {
    if (!returnTrack.achieved[i]) {
      returnTrack.achieved[i] = true;
      returnTrack.elements[i].classList.add("achieved");
      if (i == 5) {
        addBestPink();
      }
      break;
    }
  }
}

function returnDice(position, value, color) {
  dicePlate.empty[position] = true;
  dicePlate.values[position] = null;
  dicePlate.colors[position] = null;
  dicePlate.elements[position].classList.add("hidden");
  let index = diceMat.colors.indexOf(color);
  diceMat.empty[index] = false;
  diceMat.elements[index].classList.remove("hidden");
  returnLock = true;
  rollLock = false;
}

// USE ADDITIONAL
function takeAdditional(position) {
  if (additionalTrack.achieved[position] && !diceMat.empty.includes(false)) {
    console.log(`Valid additional dice`);
    additionalLock = false;
    diceLock = true;
    rollLock = true;
    additionalTrack.elements[position].insertAdjacentText("beforeend", "X");
    additionalTrack.taken[position] = true;
  } else if (selectedDice.empty[2]) {
    console.log(`Additional dice can only be used once the turn is over.`);
  }
}

function achieveAdditional() {
  for (let i = 0; i < 6; i++) {
    if (!additionalTrack.achieved[i]) {
      additionalTrack.achieved[i] = true;
      additionalTrack.elements[i].classList.add("achieved");
      if (i == 5) {
        highlightGrey([1, 2, 3, 4, 5, 6]);
      }
      break;
    }
  }
}

function useAdditional(position, color, value) {
  console.log(
    `Need to add the function to use die from plate position ${position} (${color} ${value}) once the gameboard functionality is completed.`
  );
}

// USE CHOICE
// USE BONUS COLOR
// CALCULATE SCORE

/* ---- GREY FUNCTIONS ---- */
function resolveGrey(value, removedDice) {
  removedDice.push(["grey", value]);
  console.log(removedDice);
  for (let i = 0; i < removedDice.length; i++) {
    if (removedDice[i][0] == "yellow") {
      greyBoard.elements[0][removedDice[i][1]].textContent = "X";
      greyBoard.elements[0][removedDice[i][1]].classList.add("checked");
      greyBoard.scores[0][removedDice[i][1]] = true;
    } else if (removedDice[i][0] == "blue") {
      greyBoard.elements[1][removedDice[i][1]].textContent = "X";
      greyBoard.elements[1][removedDice[i][1]].classList.add("checked");
      greyBoard.scores[1][removedDice[i][1]] = true;
    } else if (removedDice[i][0] == "green") {
      greyBoard.elements[2][removedDice[i][1]].textContent = "X";
      greyBoard.elements[2][removedDice[i][1]].classList.add("checked");
      greyBoard.scores[2][removedDice[i][1]] = true;
    } else if (removedDice[i][0] == "pink") {
      greyBoard.elements[3][removedDice[i][1]].textContent = "X";
      greyBoard.elements[3][removedDice[i][1]].classList.add("checked");
      greyBoard.scores[3][removedDice[i][1]] = true;
    }
  }
  for (let i = 0; i < removedDice.length; i++) {
    if (removedDice[i][0] == "grey" || removedDice[i][0] == "white") {
      greyBoard.greyAndWhite += 1;
      console.log(`Grey or white dice`);
      highlightGrey(removedDice[i][1]);
      console.log(`Dice locked`);
    }
  }
}

function highlightGrey(value) {
  if (typeof value == "number") {
    value = [value];
  }
  for (let j of value) {
    for (let k = 0; k < 4; k++) {
      if (!greyBoard.scores[k][j]) {
        greyBoard.elements[k][j].classList.add("selectable");
      }
    }
  }
  scoringLock = true;
}

function selectGrey(colorIndex, numberIndex) {
  if (
    greyBoard.elements[colorIndex][numberIndex].classList.contains("selectable")
  ) {
    greyBoard.scores[colorIndex][numberIndex] = true;
    greyBoard.elements[colorIndex][numberIndex].classList.remove("selectable");
    greyBoard.elements[colorIndex][numberIndex].textContent = "X";
    greyBoard.elements[colorIndex][numberIndex].classList.add("checked");
    if (greyBoard.greyAndWhite == 2) {
      greyBoard.greyAndWhite = 1;
      for (let i = 0; i < 4; i++) {
        greyBoard.elements[i][numberIndex].classList.remove("selectable");
      }
      checkGreyBonuses();
    } else {
      greyBoard.greyAndWhite = 0;
      unselectAll();
      scoringLock = false;
      checkTurnEnd();
    }
  }
  checkGreyBonuses();
}

function checkGrey(value) {
  for (let i = 0; i < 4; i++) {
    if (!greyBoard.scores[i][value]) {
      return true;
    }
  }
  return false;
}

function checkGreyBonuses() {
  function checkGreyLine(lineNumber) {
    if (
      greyBoard.scores[0][lineNumber] == true &&
      greyBoard.scores[1][lineNumber] == true &&
      greyBoard.scores[2][lineNumber] == true &&
      greyBoard.scores[3][lineNumber] == true &&
      greyBoard.bonuses[lineNumber] == false
    ) {
      if (lineNumber == 1) {
        achieveAdditional();
      } else if (lineNumber == 2) {
        highlightYellow([1, 2, 3, 4, 5, 6]);
      } else if (lineNumber == 3) {
        fuchs += 1;
      } else if (lineNumber == 4) {
        addBestBlue();
      } else if (lineNumber == 5) {
        addBestGreen();
      }
      greenBoard.bonuses[lineNumber] = true;
    }
  }
  for (let i = 0; i < 6; i++) {
    checkGreyLine(i);
  }
}

/* ---- YELLOW FUNCTIONS ---- */
function resolveYellow(value) {
  highlightYellow(value);
}

function highlightYellow(value) {
  if (typeof value == "number") {
    value = [value];
  }
  for (let i of value) {
    for (let j = 0; j < 10; j++) {
      if (yellowBoard.numbers[j] == i && yellowBoard.scores[j] !== true) {
        yellowBoard.elements[j].classList.add("selectable");
      }
    }
  }
  scoringLock = true;
}

function selectYellow(position) {
  if (yellowBoard.elements[position].classList.contains("selectable")) {
    if (yellowBoard.scores[position] == true) {
      console.log(`Already fully marked`);
    } else if (yellowBoard.scores[position] == false) {
      yellowBoard.elements[position].classList.add("double_checked");
      yellowBoard.scores[position] = true;
    } else {
      yellowBoard.elements[position].textContent = "X";
      yellowBoard.scores[position] = false;
      yellowBoard.elements[position].classList.add("checked");
    }
    unselectAll();
    checkYellowBonuses();
    checkTurnEnd();
    scoringLock = false;
  }
}

function checkYellow(value) {
  let validBoxes = false;
  for (let i = 0; i < 10; i++) {
    if (yellowBoard.numbers[i] == value && !yellowBoard.scores[i]) {
      return true;
    }
  }
  return false;
}

function checkYellowBonuses() {
  function checkYellowLine(bonus) {
    for (let i of yellowBoard.bonusLines[bonus]) {
      if (yellowBoard.scores[i] == null || yellowBoard.bonuses[bonus]) {
        return;
      }
    }
    if (bonus == 0) {
      addBestBlue();
    } else if (bonus == 1) {
      achieveReturn();
    } else if (bonus == 2) {
      highlightYellow([1, 2, 3, 4, 5, 6]);
    } else if (bonus == 3) {
      addBestGreen();
    } else if (bonus == 4) {
      addBestPink();
    } else if (bonus == 5) {
      achieveReroll();
    } else if (bonus == 6) {
      achieveAdditional();
    } else if (bonus == 7) {
      highlightGrey([1, 2, 3, 4, 5, 6]);
    } else if (bonus == 8) {
      fuchs += 1;
    }
    yellowBoard.bonuses[bonus] = true;
  }

  for (let i = 0; i < 9; i++) {
    checkYellowLine(i);
  }
}

/* ---- BLUE FUNCTIONS ---- */
function resolveBlue(blueValue) {
  let whiteValue = findWhite();
  let nextBox = blueBoard.scores.indexOf(null);
  blueBoard.scores[nextBox] = blueValue + whiteValue;
  blueBoard.elements[nextBox].textContent = blueValue + whiteValue;
  checkBlueBonuses();
  checkTurnEnd();
}

function highlightBlue() {
  for (let i = 0; i < 12; i++) {
    if (blueBoard.scores[i] == null) {
      blueBoard.elements[i].classList.add("selectable");
      scoringLock = true;
      break;
    }
  }
}

function addBestBlue() {
  for (let i = 0; i < 12; i++) {
    if (blueBoard.scores[i] == null) {
      blueBoard.scores[i] = blueBoard.scores[i - 1];
      blueBoard.elements[i].textContent = blueBoard.scores[i];
      blueBoard.elements[i].classList.add("checked");
      checkBlueBonuses();
      break;
    }
  }
}

function checkBlue(blueValue, whiteValue) {
  let nextBox = blueBoard.scores.indexOf(null);
  if (blueBoard.scores.includes(null)) {
    if (
      nextBox == 0 ||
      blueBoard.scores[nextBox - 1] >= blueValue + whiteValue
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function findWhite() {
  let whiteValue = 0;
  if (!diceMat.empty[diceMat.colors.indexOf("white")]) {
    whiteValue = diceMat.values[diceMat.colors.indexOf("white")];
  } else if (selectedDice.colors.includes("white")) {
    whiteValue = selectedDice.values[selectedDice.colors.indexOf("white")];
  } else if (dicePlate.colors.includes("white")) {
    whiteValue = dicePlate.values[dicePlate.colors.indexOf("white")];
  } else {
    console.log(`Couldn't find a white dice`);
  }
  return whiteValue;
}

function selectBlue(position) {
  if (blueBoard.elements[position].classList.contains("selectable")) {
    blueBoard.scores[position] = findBlue() + findWhite();
    blueBoard.elements[position].textContent = blueBoard.scores[position];
    blueBoard.elements[position].classList.add("checked");
    unselectAll();
    checkBlueBonuses();
    scoringLock = false;
    checkTurnEnd();
  }
}

function checkBlueBonuses() {
  if (blueBoard.scores[1] && !blueBoard.bonuses[1]) {
    achieveReturn();
    blueBoard.bonuses[1] = true;
  } else if (blueBoard.scores[2] && !blueBoard.bonuses[2]) {
    highlightYellow([1, 2, 3, 4, 5, 6]);
    blueBoard.bonuses[2] = true;
  } else if (blueBoard.scores[4] && !blueBoard.bonuses[4]) {
    achieveAdditional();
    blueBoard.bonuses[4] = true;
  } else if (blueBoard.scores[5] && !blueBoard.bonuses[5]) {
    achieveReroll();
    blueBoard.bonuses[5] = true;
  } else if (blueBoard.scores[6] && !blueBoard.bonuses[6]) {
    addBestPink();
    blueBoard.bonuses[6] = true;
  } else if (blueBoard.scores[8] && !blueBoard.bonuses[8]) {
    fuchs += 1;
    blueBoard.bonuses[8] = true;
  } else if (blueBoard.scores[9] && !blueBoard.bonuses[9]) {
    achieveReroll();
    blueBoard.bonuses[9] = true;
  } else if (blueBoard.scores[11] && !blueBoard.bonuses[11]) {
    addBestGreen();
    blueBoard.bonuses[11] = true;
  }
}

/* ---- GREEN FUNCTIONS ---- */
function resolveGreen(value) {
  let nextBox = greenBoard.scores.indexOf(null);
  greenBoard.scores[nextBox] = value * greenBoard.multipliers[nextBox];
  greenBoard.elements[nextBox].textContent = greenBoard.scores[nextBox];
  greenBoard.elements[nextBox].classList.add("checked");
  checkGreenPairs();
  checkGreenBonuses();
  checkTurnEnd();
}

function highlightGreen() {
  for (let i = 0; i < 12; i++) {
    if (greenBoard.scores[i] == null) {
      greenBoard.elements[i].classList.add("selectable");
      scoringLock = true;
      break;
    }
  }
}

function addBestGreen() {
  for (let i = 0; i < 12; i++) {
    if (greenBoard.scores[i] == null) {
      if (i % 2 == 0) {
        greenBoard.scores[i] = 6 * greenBoard.multipliers[i];
        greenBoard.elements[i].textContent = 6 * greenBoard.multipliers[i];
        greenBoard.elements[i].classList.add("checked");
      } else {
        greenBoard.scores[i] = 1 * greenBoard.multipliers[i];
        greenBoard.elements[i].textContent = 1 * greenBoard.multipliers[i];
        greenBoard.elements[i].classList.add("checked");
      }
      checkGreenPairs();
      checkGreenBonuses();
      break;
    }
  }
}

function checkGreen(value) {
  if (greenBoard.scores.includes(null)) {
    return true;
  } else {
    return false;
  }
}

function selectGreen(position) {
  if (greenBoard.elements[position].classList.contains("selectable")) {
    greenBoard.scores[position] =
      greenBoard.multipliers[position] * findWhite();
    greenBoard.elements[position].textContent = greenBoard.scores[position];
    unselectAll();
    greenBoard.elements[position].classList.add("checked");
    checkGreenPairs();
    checkGreenBonuses();
    scoringLock = false;
    checkTurnEnd();
  }
}

function checkGreenBonuses() {
  if (greenBoard.scores[1] && !greenBoard.bonuses[1]) {
    achieveReroll();
    greenBoard.bonuses[1] = true;
  } else if (greenBoard.scores[3] && !greenBoard.bonuses[3]) {
    addBestBlue();
    greenBoard.bonuses[3] = true;
  } else if (greenBoard.scores[4] && !greenBoard.bonuses[4]) {
    achieveReturn();
    greenBoard.bonuses[4] = true;
  } else if (greenBoard.scores[6] && !greenBoard.bonuses[6]) {
    fuchs += 1;
    greenBoard.bonuses[6] = true;
  } else if (greenBoard.scores[7] && !greenBoard.bonuses[7]) {
    highlightGrey([1, 2, 3, 4, 5, 6]);
    greenBoard.bonuses[7] = true;
  } else if (greenBoard.scores[8] && !greenBoard.bonuses[8]) {
    achieveAdditional();
    greenBoard.bonuses[8] = true;
  } else if (greenBoard.scores[10] && !greenBoard.bonuses[10]) {
    addBestPink();
    greenBoard.bonuses[10] = true;
  } else if (greenBoard.scores[11] && !greenBoard.bonuses[11]) {
    highlightYellow([1, 2, 3, 4, 5, 6]);
    greenBoard.bonuses[11] = true;
  }
}

function checkGreenPairs() {
  for (let i = 1; i < 12; i += 2) {
    if (greenBoard.scores[i] && !greenBoard.scoreBoxes[Math.floor(i / 2)]) {
      greenBoard.scoreBoxes[Math.floor(i / 2)] =
        greenBoard.scores[i - 1] - greenBoard.scores[i];
      greenBoard.scoreBoxElements[Math.floor(i / 2)].textContent =
        greenBoard.scoreBoxes[Math.floor(i / 2)];
    }
  }
}

/* ---- PINK FUNCTIONS ---- */
function resolvePink(value) {
  let nextBox = pinkBoard.scores.indexOf(null);
  pinkBoard.scores[nextBox] = value;
  pinkBoard.elements[nextBox].textContent = value;
  pinkBoard.elements[nextBox].classList.add("checked");
  checkPinkBonuses();
  checkTurnEnd();
}

function highlightPink() {
  for (let i = 0; i < 12; i++) {
    if (pinkBoard.scores[i] == null) {
      pinkBoard.elements[i].classList.add("selectable");
      scoringLock = true;
      break;
    }
  }
}

function addBestPink() {
  for (let i = 0; i < 12; i++) {
    if (pinkBoard.scores[i] == null) {
      pinkBoard.scores[i] == 6;
      pinkBoard.elements[i].textContent = "6";
      pinkBoard.elements[i].classList.add("checked");
      checkPinkBonuses();
      break;
    }
  }
}

function checkPink(value) {
  let nextBox = pinkBoard.scores.indexOf(null);
  if (pinkBoard.scores.includes(null)) {
    if (value >= pinkBoard.minimums[nextBox]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function selectPink(position) {
  if (pinkBoard.elements[position].classList.contains("selectable")) {
    pinkBoard.scores[position] = findWhite();
    pinkBoard.elements[position].textContent = pinkBoard.scores[position];
    unselectAll();
    pinkBoard.elements[position].classList.add("checked");
    checkPinkBonuses();
    scoringLock = false;
    checkTurnEnd();
  }
}

function checkPinkBonuses() {
  if (pinkBoard.scores[2] && !pinkBoard.bonuses[2]) {
    achieveReroll();
    pinkBoard.bonuses[2] = true;
  } else if (pinkBoard.scores[3] && !pinkBoard.bonuses[3]) {
    achieveReturn();
    pinkBoard.bonuses[3] = true;
  } else if (pinkBoard.scores[4] && !pinkBoard.bonuses[4]) {
    achieveAdditional();
    pinkBoard.bonuses[4] = true;
  } else if (pinkBoard.scores[5] && !pinkBoard.bonuses[5]) {
    addBestGreen();
    pinkBoard.bonuses[5] = true;
  } else if (pinkBoard.scores[6] && !pinkBoard.bonuses[6]) {
    highlightYellow([1, 2, 3, 4, 5, 6]);
    pinkBoard.bonuses[6] = true;
  } else if (pinkBoard.scores[7] && !pinkBoard.bonuses[7]) {
    fuchs += 1;
    pinkBoard.bonuses[7] = true;
  } else if (pinkBoard.scores[8] && !pinkBoard.bonuses[8]) {
    highlightGrey([1, 2, 3, 4, 5, 6]);
    pinkBoard.bonuses[8] = true;
  } else if (pinkBoard.scores[9] && !pinkBoard.bonuses[9]) {
    achieveReroll();
    pinkBoard.bonuses[9] = true;
  } else if (pinkBoard.scores[10] && !pinkBoard.bonuses[10]) {
    addBestBlue();
    pinkBoard.bonuses[10] = true;
  } else if (pinkBoard.scores[11] && !pinkBoard.bonuses[11]) {
    highlightYellow();
    pinkBoard.bonuses[11] = true;
  }
}

/* ---- WHITE FUNCTIONS ---- */
function resolveWhite(value) {
  if (checkGrey(value) == true) {
    highlightGrey(value);
  }
  if (checkYellow(value) == true) {
    highlightYellow(value);
  }
  if (checkBlue(value, findBlue()) == true) {
    highlightBlue();
  }
  if (checkGreen(value) == true) {
    highlightGreen();
  }
  if (checkPink(value) == true) {
    highlightPink();
  }
  scoringLock = true;
}

function unselectAll() {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 7; j++) {
      greyBoard.elements[i][j].classList.remove("selectable");
    }
  }
  for (let i = 0; i < 10; i++) {
    yellowBoard.elements[i].classList.remove("selectable");
  }
  for (let i = 0; i < 12; i++) {
    blueBoard.elements[i].classList.remove("selectable");
    greenBoard.elements[i].classList.remove("selectable");
    pinkBoard.elements[i].classList.remove("selectable");
  }
  scoringLock = false;
}

function findBlue() {
  let blueValue = 0;
  if (!diceMat.empty[diceMat.colors.indexOf("blue")]) {
    blueValue = diceMat.values[diceMat.colors.indexOf("blue")];
  } else if (selectedDice.colors.includes("blue")) {
    blueValue = selectedDice.values[selectedDice.colors.indexOf("blue")];
  } else if (dicePlate.colors.includes("blue")) {
    blueValue = dicePlate.values[dicePlate.colors.indexOf("blue")];
  } else {
    console.log(`Couldn't find a white dice`);
  }
  return blueValue;
}

function printLog(text) {
  console.log(text);
  logger.innerHTML += text + "<br />";
}
