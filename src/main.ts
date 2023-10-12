import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pet Band🤙";

document.title = gameName;

// Step 9
interface Item {
  name: string;
  price: number;
  rate: number;
  purchased: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "🪗🦖",
    price: 10,
    rate: 0.1,
    purchased: 0,
    description: "The hands are just long enough to reach the instrument",
  },
  {
    name: "🎤🐟",
    price: 50,
    rate: 2,
    purchased: 0,
    description: "Most of their songs consist of just blops",
  },
  {
    name: "🎻🦐",
    price: 200,
    rate: 5,
    purchased: 0,
    description:
      "Why didn't the shrimp want to join the band?" +
      "<div>" +
      "Because it didn't want to be a shell-ist!",
  },
  {
    name: "🎺🐛",
    price: 1000,
    rate: 20,
    purchased: 0,
    description:
      "Why don't worms form rock bands?" +
      "<div>" +
      "They're more into underground music scenes",
  },
  {
    name: "🪕🦩",
    price: 5000,
    rate: 50,
    purchased: 0,
    description: "What do flamingos do for fun?" + "<div>" + "Play fla-bango.",
  },
];

function updateText() {
  growthRate.innerHTML =
    "Wow! You are getting " + rateTotal.toFixed(2) + "🕺per sec!";
  availableItems.forEach((item, i) => {
    items[i].innerHTML =
      item.price.toFixed(2) + " (+" + item.rate.toFixed(2) + "🕺/sec)";
  });

  prices.forEach((price, i) => {
    price.innerHTML = "x" + availableItems[i].purchased;
  });
}

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${counter.toFixed(1)} 🕺`;
  // Disables/enables the button based on the units collected
  availableItems.forEach((item, i) => {
    buttons[i].disabled = item.price > counter;
  });
}

// Step 7
let rateTotal = 0;
// Takes args since the counter and rate need to be changed no matter what item is clicked
function shop(itemType: number) {
  if (counter >= availableItems[itemType - 1].price) {
    // If there are enough units, make the upgrades
    counter -= availableItems[itemType - 1].price;
    rateTotal += availableItems[itemType - 1].rate;
    availableItems[itemType - 1].purchased += 1;
    availableItems[itemType - 1].price *= 1.15; // Increase price by a factor of 1.15
    // Update text
    updateText();
    // Update description based on the object you clicked on
    desc.innerHTML = availableItems[itemType - 1].description;
  }
}

let lastFrame: number = 0;
function automate(currentFrame: number) {
  // Calculate how much time changed per frame
  const elapsed: number = currentFrame - lastFrame;
  lastFrame = currentFrame;
  // let fps = 1000 / elapsed; // calculate frame per second
  increaseCounter(rateTotal / (1000 / elapsed)); // incrase counter with the fractional amount  -> 1 / (second / frame)
  // The function would be called every frame with the current time
  requestAnimationFrame(() => automate(performance.now()));
}
// Call the automate function with the current time
requestAnimationFrame(() => automate(performance.now()));

const header = document.createElement("h1");
const growthRate = document.createElement("div");
const row1 = document.createElement("div");
const row2 = document.createElement("div");
const row3 = document.createElement("div");
const row4 = document.createElement("div");
const row5 = document.createElement("div");

const priceA = document.createElement("div");
const priceB = document.createElement("div");
const priceC = document.createElement("div");
const priceD = document.createElement("div");
const priceE = document.createElement("div");
const prices = [priceA, priceB, priceC, priceD, priceE];
prices.forEach((price) => {
  price.style.marginRight = "auto";
});

const itemA = document.createElement("div");
const itemB = document.createElement("div");
const itemC = document.createElement("div");
const itemD = document.createElement("div");
const itemE = document.createElement("div");
const items = [itemA, itemB, itemC, itemD, itemE];

const button = document.createElement("button");
const counterText = document.createElement("h3");
const shopButtonA = document.createElement("button");
const shopButtonB = document.createElement("button");
const shopButtonC = document.createElement("button");
const shopButtonD = document.createElement("button");
const shopButtonE = document.createElement("button");
const buttons = [
  shopButtonA,
  shopButtonB,
  shopButtonC,
  shopButtonD,
  shopButtonE,
];
buttons.forEach((button) => {
  button.style.justifyContent = "flex-start";
});
// Styling it so everything can fit in a line
row1.appendChild(shopButtonA);
row1.appendChild(priceA);
row1.appendChild(itemA);
row2.appendChild(shopButtonB);
row2.appendChild(priceB);
row2.appendChild(itemB);
row3.appendChild(shopButtonC);
row3.appendChild(priceC);
row3.appendChild(itemC);
row4.appendChild(shopButtonD);
row4.appendChild(priceD);
row4.appendChild(itemD);
row5.appendChild(shopButtonE);
row5.appendChild(priceE);
row5.appendChild(itemE);
const rows = [row1, row2, row3, row4, row5];
rows.forEach((row) => {
  row.style.display = "flex";
});
// Instructions
const instructionsBold = document.createElement("div");
instructionsBold.style.fontWeight = "bold";
let isInstructionsOn = true;
const instructions = document.createElement("div");
instructions.style.fontStyle = "italic";

const instructionsButton = document.createElement("button");
instructionsButton.innerHTML = "Close/Open Instructions";
instructionsButton.style.fontSize = "12px";
instructionsButton.addEventListener("click", () => instructionsChange(), false);
function instructionsChange() {
  if (isInstructionsOn == true) {
    instructionsBold.innerHTML = "Instructions: ";
    instructions.innerHTML =
      "<div>" +
      "The band needs your help!" +
      "<div>" +
      "Press the dancing man button to start collecting dancers!" +
      "<div>" +
      "After Collecting enough dancers, you can get more members for the band." +
      "<div>" +
      "Click the emoji buttons on the left to buy the upgrades, the price is on the right side." +
      "<div>" +
      "The x next to the emoji is how many you already purchased" +
      "<div>";
    isInstructionsOn = false;
  } else {
    instructionsBold.innerHTML = "";
    instructions.innerHTML = "";
    isInstructionsOn = true;
  }
}
instructionsChange();
const desc = document.createElement("div");
desc.style.fontStyle = "italic";
header.innerHTML = gameName;
updateText();

counterText.innerHTML = `0 🕺`;
button.innerHTML = "🕺";
button.style.fontSize = "24px";
button.addEventListener("click", () => increaseCounter(1), false);
buttons.forEach((button, i) => {
  button.addEventListener("click", () => shop(i + 1), false);
  button.innerHTML = availableItems[i].name;
});
availableItems.forEach((item, i) => {
  buttons[i].disabled = item.price > counter;
});

app.append(header);
app.append(instructionsBold);
app.append(instructions);
app.append(instructionsButton);

app.append(counterText);

app.append(growthRate);

app.append(button);
app.append(row1);
app.append(row2);
app.append(row3);
app.append(row4);
app.append(row5);

app.append(desc);

/*
Credits:
- Using div as a new line:
  - https://stackoverflow.com/questions/44743813/new-line-n-is-not-working-in-typescript 
- Spacing:
  - https://stackoverflow.com/questions/25177435/spacing-between-two-buttons-inside-a-div
- Styling options:
  - https://www.w3schools.com/jsref/prop_style_display.asp
- A lot of MDN web docs
*/
