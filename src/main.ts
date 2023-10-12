import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pet Band🤙";

document.title = gameName;

// Step 9 - on the Discord it says we can start the data driven design early, so I started working on it at step 6
// The message was sent on 10/07/2023
interface Item {
  name: string;
  price: number;
  rate: number;
  purchased: number;
}

const availableItems: Item[] = [
  {
    name: "🪗🦖",
    price: 10,
    rate: 0.1,
    purchased: 0,
  },
  {
    name: "🎤🐟",
    price: 100,
    rate: 2,
    purchased: 0,
  },
  {
    name: "🎻🦐",
    price: 1000,
    rate: 50,
    purchased: 0,
  },
];

function updateText() {
  growthRate.innerHTML =
    "Wow! You are getting " + rateTotal.toFixed(2) + "🕺 per sec!";
  items.forEach((item, i) => {
    item.innerHTML =
      availableItems[i].price.toFixed(2) +
      " (+" +
      availableItems[i].rate.toFixed(2) +
      "🕺/sec)";
  });

  purchases.forEach((purchase, i) => {
    purchase.innerHTML = "x" + availableItems[i].purchased;
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

// rateTotal will be equal to the growth rate that would be used for the Continuous Growth
// More times the item is purchased, the faster the growth rate would be
let rateTotal = 0;
function shop(itemType: number) {
  if (counter >= availableItems[itemType].price) {
    // If there are enough units, make the upgrades
    counter -= availableItems[itemType].price;
    rateTotal += availableItems[itemType].rate;
    availableItems[itemType].price *= 1.15; // Increase price by a factor of 1.15
    availableItems[itemType].purchased += 1;
    // Update text
    updateText();
  }
}

// Continuous Growth
// Read through this thread to understand the algorithm / how to approach it.
// https://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
let lastFrame: number = performance.now();
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

const button = document.createElement("button");
const counterText = document.createElement("div");
const buttons: HTMLButtonElement[] = [];
const items: HTMLDivElement[] = [];
const purchases: HTMLDivElement[] = [];
const rows: HTMLDivElement[] = [];

availableItems.forEach((obj, i) => {
  // buttons
  const button = document.createElement("button");
  button.style.justifyContent = "flex-start";
  button.addEventListener("click", () => shop(i), false);
  button.innerHTML = obj.name;
  button.disabled = obj.price > counter;
  buttons.push(button);

  // items
  const item = document.createElement("div");
  items.push(item);

  // purchases
  const purchase = document.createElement("div");
  purchase.style.marginRight = "auto";
  purchases.push(purchase);

  // rows
  const row = document.createElement("div");
  row.appendChild(button);
  row.appendChild(purchase);
  row.appendChild(item);
  row.style.display = "flex";
  rows.push(row);
});

header.innerHTML = gameName;
counterText.innerHTML = `0 🕺`;
button.innerHTML = "🕺";
button.style.fontSize = "24px";
button.addEventListener("click", () => increaseCounter(1), false);

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

app.append(header);
app.append(instructionsBold);
app.append(instructions);
app.append(instructionsButton);

app.append(counterText);
app.append(growthRate);
app.append(button);
rows.forEach((row) => {
  app.append(row);
});
updateText();
