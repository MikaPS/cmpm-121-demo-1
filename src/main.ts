import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${Math.round(counter)} Whales`;
  // Disables/enables the button based on the units collected
  counter >= price[0]
    ? (shopButtonA.disabled = false)
    : (shopButtonA.disabled = true);
  counter >= price[1]
    ? (shopButtonB.disabled = false)
    : (shopButtonB.disabled = true);
  counter >= price[2]
    ? (shopButtonC.disabled = false)
    : (shopButtonC.disabled = true);
}

// Step 7
let rate = 0;
const purchase = [0, 0, 0]; // How many times the player got A, B, C
const price = [10, 100, 1000]; // Current prices of A, B, C

// Takes args since the counter and rate need to be changed no matter what item is clicked
function shop(itemType: number, itemRate: number, itemCost: number) {
  if (counter >= itemCost) {
    // If there are enough units, make the upgrades
    counter -= itemCost;
    rate += itemRate;
    purchase[itemType - 1] += 1;
    price[itemType - 1] *= 1.15; // Increase price by a factor of 1.15
    // Update text
    growthRate.innerHTML = "Growth Rate: " + rate.toFixed(2) + " whales/sec";
    itemA.innerHTML =
      "Item A: " +
      purchase[0].toFixed(2) +
      " (price: " +
      price[0].toFixed(2) +
      ")";
    itemB.innerHTML =
      "Item B: " +
      purchase[1].toFixed(2) +
      " (price: " +
      price[1].toFixed(2) +
      ")";
    itemC.innerHTML =
      "Item C: " +
      purchase[2].toFixed(2) +
      " (price: " +
      price[2].toFixed(2) +
      ")";
    // Use the updated rate every second
    setInterval(() => increaseCounter(rate), 1000);
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
growthRate.innerHTML = "Rate: 0 whales/sec";
itemA.innerHTML = "Item A: 0 (price: 10)";
itemB.innerHTML = "Item B: 0 (price: 100)";
itemC.innerHTML = "Item C: 0 (price: 1000)";

counterText.innerHTML = `0 Whales`;

button.innerHTML = "🐳";
button.addEventListener("click", () => increaseCounter(1), false);

shopButtonA.innerHTML = "A";
shopButtonA.disabled = true;
shopButtonA.addEventListener("click", () => shop(1, 0.1, price[0]), false);
shopButtonB.innerHTML = "B";
shopButtonB.disabled = true;
shopButtonB.addEventListener("click", () => shop(2, 2, price[1]), false);
shopButtonC.innerHTML = "C";
shopButtonC.disabled = true;
shopButtonC.addEventListener("click", () => shop(3, 50, price[2]), false);

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
