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
}

const availableItems: Item[] = [
  { name: "🪗🦖", price: 10, rate: 0.1, purchased: 0 },
  { name: "📸🦐", price: 100, rate: 2, purchased: 0 },
  { name: "🎺🐛", price: 1000, rate: 50, purchased: 0 },
];

function updateText() {
  growthRate.innerHTML = "Growth Rate: " + rateTotal.toFixed(2) + " 🕺/sec";
  itemA.innerHTML =
    availableItems[0].purchased +
    " " +
    availableItems[0].name +
    " (price: " +
    availableItems[0].price.toFixed(2) +
    " " +
    ")";
  itemB.innerHTML =
    availableItems[1].purchased +
    availableItems[1].name +
    " (price: " +
    availableItems[1].price.toFixed(2) +
    " " +
    ")";
  itemC.innerHTML =
    availableItems[2].purchased +
    availableItems[2].name +
    " (price: " +
    availableItems[2].price.toFixed(2) +
    ")";
}

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${Math.round(counter)} 🕺`;
  // Disables/enables the button based on the units collected
  counter >= availableItems[0].price
    ? (shopButtonA.disabled = false)
    : (shopButtonA.disabled = true);
  counter >= availableItems[1].price
    ? (shopButtonB.disabled = false)
    : (shopButtonB.disabled = true);
  counter >= availableItems[2].price
    ? (shopButtonC.disabled = false)
    : (shopButtonC.disabled = true);
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
    // Use the updated rate every second
    setInterval(() => increaseCounter(rateTotal), 1000);
  }
}

const header = document.createElement("h1");
const growthRate = document.createElement("div");
const itemA = document.createElement("div");
const itemB = document.createElement("div");
const itemC = document.createElement("div");

const button = document.createElement("button");
const counterText = document.createElement("div");
const shopButtonA = document.createElement("button");
const shopButtonB = document.createElement("button");
const shopButtonC = document.createElement("button");

header.innerHTML = gameName;
updateText();

counterText.innerHTML = `0 🕺`;

button.innerHTML = "🕺";
button.addEventListener("click", () => increaseCounter(1), false);

shopButtonA.innerHTML = "More instruments " + availableItems[0].name;
shopButtonA.disabled = true;
shopButtonA.addEventListener("click", () => shop(1), false);
shopButtonB.innerHTML = "Better production " + availableItems[1].name;
shopButtonB.disabled = true;
shopButtonB.addEventListener("click", () => shop(2), false);
shopButtonC.innerHTML = "Live music " + availableItems[2].name;
shopButtonC.disabled = true;
shopButtonC.addEventListener("click", () => shop(3), false);

app.append(header);
app.append(growthRate);
app.append(itemA);
app.append(itemB);
app.append(itemC);

app.append(button);
app.append(shopButtonA);
app.append(shopButtonB);
app.append(shopButtonC);
app.append(counterText);
