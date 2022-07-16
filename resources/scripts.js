"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let diceLock = true;
let rollLock = false;
let scoringLock = false;
let returnLock = true;
let additionalLock = true;

/* ---- ELEMENTS ---- */
const testBtnEl = document.querySelector(".test_btn"); // DELETE IN PROD
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

let rerollTrack = {
  achieved: [false, false, false, false, false, false],
  taken: [false, false, false, false, false, false],
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
  if (
    !selectedDice.values[2] &&
    !rollLock &&
    !scoringLock &&
    diceMat.empty.includes(false)
  ) {
    orderDice();
    displayDice();
    rollLock = true;
    diceLock = false;
    console.log(
      `Dice values are ${diceMat.values}, dice colors are ${diceMat.colors}`
    );
  } else if (rollLock) {
    console.log(`Pick a dice before you reroll`);
  } else if (scoringLock) {
    console.log(`Pick your scores`);
  } else {
    console.log("All dice selected");
  }
});

// Dice Mat
diceMat.elements[0].addEventListener("click", function () {
  if (checkDice(0) == true) {
    selectDice(0);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});
diceMat.elements[1].addEventListener("click", function () {
  if (checkDice(1) == true) {
    selectDice(1);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});
diceMat.elements[2].addEventListener("click", function () {
  if (checkDice(2) == true) {
    selectDice(2);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});
diceMat.elements[3].addEventListener("click", function () {
  if (checkDice(3) == true) {
    selectDice(3);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});
diceMat.elements[4].addEventListener("click", function () {
  if (checkDice(4) == true) {
    selectDice(4);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});
diceMat.elements[5].addEventListener("click", function () {
  if (checkDice(5) == true) {
    selectDice(5);
    diceLock = true;
    rollLock = false;
  } else {
    console.log(`Invalid choice`);
  }
});

// Dice Plate
dicePlate.elements[0].addEventListener("click", function () {
  if (!returnLock) {
    returnDice(0, dicePlate.values[0], dicePlate.colors[0]);
  } else if (!additionalLock) {
    useAdditional(0, dicePlate.values[0], dicePlate.colors[0]);
  }
});
dicePlate.elements[1].addEventListener("click", function () {
  if (!returnLock) {
    returnDice(1, dicePlate.values[1], dicePlate.colors[1]);
  } else if (!additionalLock) {
    useAdditional(1, dicePlate.values[1], dicePlate.colors[1]);
  }
});
dicePlate.elements[2].addEventListener("click", function () {
  if (!returnLock) {
    returnDice(2, dicePlate.values[2], dicePlate.colors[2]);
  } else if (!additionalLock) {
    useAdditional(2, dicePlate.values[2], dicePlate.colors[2]);
  }
});
dicePlate.elements[3].addEventListener("click", function () {
  if (!returnLock) {
    returnDice(3, dicePlate.values[3], dicePlate.colors[3]);
  } else if (!additionalLock) {
    useAdditional(3, dicePlate.values[3], dicePlate.colors[3]);
  }
});
dicePlate.elements[4].addEventListener("click", function () {
  if (!returnLock) {
    returnDice(4, dicePlate.values[4], dicePlate.colors[4]);
  } else if (!additionalLock) {
    useAdditional(4, dicePlate.values[4], dicePlate.colors[4]);
  }
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
  console.log(`Yellow clicked`);
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

function removeColor(i) {
  for (let j = 0; j < 6; j++) {
    diceMat.elements[i].classList.remove(diceMat.colors[j]);
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
function checkDice(position) {
  if (diceMat.colors[position] == "grey") {
    return true;
  }
  if (diceMat.colors[position] == "yellow") {
    if (checkYellow(diceMat.values[position]) == false) {
      return false;
    }
  }
  if (diceMat.colors[position] == "blue") {
    if (checkBlue(diceMat.values[position], findWhite()) == false) {
      return false;
    }
  }
  if (diceMat.colors[position] == "green") {
    if (checkGreen(diceMat.values[position]) == false) {
      return false;
    }
  }
  if (diceMat.colors[position] == "pink") {
    if (checkPink(diceMat.values[position]) == false) {
      return false;
    }
  }
  return true;
}

function selectDice(position) {
  if (diceLock == false) {
    for (let i = 0; i < 3; i++) {
      if (selectedDice.values[i] == null) {
        selectedDice.elements[i].classList.add(diceMat.colors[position]);
        selectedDice.elements[i].classList.remove("hidden");
        selectedDice.elements[
          i
        ].src = `resources/images/dice-${diceMat.values[position]}.png`;
        selectedDice.colors[i] = diceMat.colors[position];
        selectedDice.values[i] = diceMat.values[position];
        let removedDice = removeDice(diceMat.values[position]);
        resolveDice(
          selectedDice.values[i],
          selectedDice.colors[i],
          removedDice
        );
        diceMat.empty[position] = true;
        diceMat.elements[position].classList.add("hidden");
        break;
      }
    }
    return true;
  } else {
    console.log(`Roll the dice first!`);
    return false;
  }
}

function removeDice(value) {
  let removedDice = [];
  for (let i = 0; i < 6; i++) {
    if (!diceMat.empty[i]) {
      if (diceMat.values[i] < value || selectedDice.values[2]) {
        diceMat.empty[i] = true;
        diceMat.elements[i].classList.add("hidden");
        addToPlate(diceMat.values[i], diceMat.colors[i]);
        removedDice.push([diceMat.colors[i], diceMat.values[i]]);
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
      break;
    }
  }
}

function useAdditional(position, value, color) {
  console.log(
    `Need to add the function to use die from plate position ${position} (${color} ${value}) once the gameboard functionality is completed.`
  );
}

// USE CHOICE
// USE BONUS COLOR
// ADVANCE TURN
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
      scoringLock = true;
      console.log(`Dice locked`);
    }
  }
}

function highlightGrey(value) {
  for (let j = 0; j < 4; j++) {
    if (!greyBoard.scores[j][value]) {
      greyBoard.elements[j][value].classList.add("selectable");
    }
  }
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
    } else {
      greyBoard.greyAndWhite = 0;
      unselectAll();
      scoringLock = false;
    }
  }
}

function checkGrey(value) {
  for (let i = 0; i < 4; i++) {
    if (!greyBoard.scores[i][value]) {
      return true;
    }
  }
  return false;
}

/* ---- YELLOW FUNCTIONS ---- */
function resolveYellow(value) {
  highlightYellow(value);
}

function highlightYellow(value) {
  for (let i = 0; i < 10; i++) {
    if (yellowBoard.numbers[i] == value && yellowBoard.scores[i] !== true) {
      yellowBoard.elements[i].classList.add("selectable");
    }
  }
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
  }
}

function checkYellow(value) {
  let validBoxes = false;
  for (let i = 0; i < 10; i++) {
    if ((yellowBoard.numbers[i] = value && !yellowBoard.scores[i])) {
      return true;
    }
  }
  return false;
}

/* ---- BLUE FUNCTIONS ---- */
function resolveBlue(blueValue) {
  let whiteValue = findWhite();
  let nextBox = blueBoard.scores.indexOf(null);
  blueBoard.scores[nextBox] = blueValue + whiteValue;
  blueBoard.elements[nextBox].textContent = blueValue + whiteValue;
}

function highlightBlue() {
  for (let i = 0; i < 12; i++) {
    if (blueBoard.scores[i] == null) {
      blueBoard.elements[i].classList.add("selectable");
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
  }
}

/* ---- GREEN FUNCTIONS ---- */
function resolveGreen(value) {
  let nextBox = greenBoard.scores.indexOf(null);
  greenBoard.scores[nextBox] = value * greenBoard.multipliers[nextBox];
  greenBoard.elements[nextBox].textContent = greenBoard.scores[nextBox];
  greenBoard.elements[nextBox].classList.add("checked");
}

function highlightGreen() {
  for (let i = 0; i < 12; i++) {
    if (greenBoard.scores[i] == null) {
      greenBoard.elements[i].classList.add("selectable");
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
  }
}

/* ---- PINK FUNCTIONS ---- */
function resolvePink(value) {
  let nextBox = pinkBoard.scores.indexOf(null);
  pinkBoard.elements[nextBox].textContent = value;
  pinkBoard.elements[nextBox].classList.add("checked");
}

function highlightPink() {
  for (let i = 0; i < 12; i++) {
    if (pinkBoard.scores[i] == null) {
      pinkBoard.elements[i].classList.add("selectable");
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
