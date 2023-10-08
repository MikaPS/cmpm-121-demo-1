import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${Math.round(counter)} Whales`;
  // Disables/enables the button based on the units collected
  counter >= 10 ? (shopButtonA.disabled = false) : (shopButtonA.disabled = true);
  counter >= 100 ? (shopButtonB.disabled = false) : (shopButtonB.disabled = true);
  counter >= 1000 ? (shopButtonC.disabled = false) : (shopButtonC.disabled = true);
}

// Step 6
let rate = 0;
const purchase = [0, 0, 0]; // A, B, C
// Takes args since the counter and rate need to be changed no matter what item is clicked
function shop(itemType: number, itemRate: number, itemCost: number) {
    if (counter >= itemCost) {
        counter -= itemCost;
        rate += itemRate;
        purchase[itemType - 1] += 1;
        growthRate.innerHTML = "Growth Rate: " + rate.toFixed(2) + " whales/sec";
        itemA.innerHTML = "Item A: " + purchase[0].toFixed(2);
        itemB.innerHTML = "Item B: " + purchase[1].toFixed(2);
        itemC.innerHTML = "Item C: " + purchase[2].toFixed(2);
    }
    setInterval(() => increaseCounter(rate), 1000);
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
itemA.innerHTML = "Item A: 0";
itemB.innerHTML = "Item B: 0";
itemC.innerHTML = "Item C: 0";

counterText.innerHTML = `0 Whales`;

button.innerHTML = "🐳";
button.addEventListener("click", () => increaseCounter(1), false);

shopButtonA.innerHTML = "A";
shopButtonA.disabled = true; 
shopButtonA.addEventListener("click", () => shop(1, 0.1, 10), false);
shopButtonB.innerHTML = "B";
shopButtonB.disabled = true; 
shopButtonB.addEventListener("click", () => shop(2, 2, 100), false);
shopButtonC.innerHTML = "C";
shopButtonC.disabled = true;
shopButtonC.addEventListener("click", () => shop(3, 50, 1000), false);

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