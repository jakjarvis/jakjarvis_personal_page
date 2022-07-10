"use strict";

/* ====== CAVEATS ====== */
// Only one player

/* ---- VARIABLES ---- */
let diceLock = true;
let rollLock = false;
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

/* ---- EVENT LISTENERS ---- */

// Buttons
// TEST FUNCTION --- DELETE IN PROD
testBtnEl.addEventListener("click", function () {
  achieveReroll();
  achieveReturn();
  achieveAdditional();
});

rollBtnEl.addEventListener("click", function () {
  if (!selectedDice.values[2] && !rollLock && diceMat.empty.includes(false)) {
    orderDice();
    displayDice();
    rollLock = true;
    diceLock = false;
    console.log(
      `Dice values are ${diceMat.values}, dice colors are ${diceMat.colors}`
    );
  } else if (rollLock) {
    console.log(`Pick a dice before you reroll`);
  } else {
    console.log("All dice selected");
  }
});

// Dice Mat
diceMat.elements[0].addEventListener("click", function () {
  selectDice(0);
  diceLock = true;
  rollLock = false;
});
diceMat.elements[1].addEventListener("click", function () {
  selectDice(1);
  diceLock = true;
  rollLock = false;
});
diceMat.elements[2].addEventListener("click", function () {
  selectDice(2);
  diceLock = true;
  rollLock = false;
});
diceMat.elements[3].addEventListener("click", function () {
  selectDice(3);
  diceLock = true;
  rollLock = false;
});
diceMat.elements[4].addEventListener("click", function () {
  selectDice(4);
  diceLock = true;
  rollLock = false;
});
diceMat.elements[5].addEventListener("click", function () {
  selectDice(5);
  diceLock = true;
  rollLock = false;
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
        resolveDice(selectedDice.values[i], selectedDice.colors[i]);
        break;
      }
    }
    diceMat.empty[position] = true;
    diceMat.elements[position].classList.add("hidden");
    removeDice(diceMat.values[position]);
  } else {
    console.log(`Roll the dice first!`);
  }
}

function removeDice(value) {
  for (let i = 0; i < 6; i++) {
    if (!diceMat.empty[i]) {
      if (diceMat.values[i] < value || selectedDice.values[2]) {
        diceMat.empty[i] = true;
        diceMat.elements[i].classList.add("hidden");
        addToPlate(diceMat.values[i], diceMat.colors[i]);
      }
    }
  }
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

function resolveDice(value, color) {
  if (color == "grey") {
    resolveGrey(value);
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
function resolveGrey(value) {
  console.log(`Resolve grey dice with a value of ${value}`);
}
/* ---- YELLOW FUNCTIONS ---- */
function resolveYellow(value) {
  console.log(`Resolve yellow dice with a value of ${value}`);
}
/* ---- BLUE FUNCTIONS ---- */
function resolveBlue(value) {
  console.log(`Resolve blue dice with a value of ${value}`);
}
/* ---- GREEN FUNCTIONS ---- */
function resolveGreen(value) {
  console.log(`Resolve green dice with a value of ${value}`);
}
/* ---- PINK FUNCTIONS ---- */
function resolvePink(value) {
  console.log(`Resolve pink dice with a value of ${value}`);
}
/* ---- WHITE FUNCTIONS ---- */
function resolveWhite(value) {
  console.log(`Resolve white dice with a value of ${value}`);
}
