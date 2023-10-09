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
    rate: 1,
    purchased: 0,
    description: "Most of their songs consist of just blops",
  },
  {
    name: "🎻🦐",
    price: 200,
    rate: 2,
    purchased: 0,
    description:
      "Why didn't the shrimp want to join the band? Because it didn't want to be a shell-ist!",
  },
  {
    name: "🎺🐛",
    price: 1000,
    rate: 20,
    purchased: 0,
    description:
      "Why don't worms form rock bands? They're more into underground music scenes",
  },
  {
    name: "🪕🦩",
    price: 5000,
    rate: 50,
    purchased: 0,
    description: "What do flamingos do for fun? Play fla-bango.",
  },
];

function updateText() {
  growthRate.innerHTML = "Growth Rate: " + rateTotal.toFixed(2) + " 🕺/sec";
  itemA.innerHTML =
    availableItems[0].price.toFixed(2) + " | " + availableItems[0].purchased;
  itemB.innerHTML =
    availableItems[1].price.toFixed(2) + " | " + availableItems[1].purchased;
  itemC.innerHTML =
    availableItems[2].price.toFixed(2) + " | " + availableItems[2].purchased;
  itemD.innerHTML =
    availableItems[3].price.toFixed(2) + " | " + availableItems[3].purchased;
  itemE.innerHTML =
    availableItems[4].price.toFixed(2) + " | " + availableItems[4].purchased;

  // priceTable.innerHTML =
  //   availableItems[0].price.toFixed(2) +
  //   " " +
  //   availableItems[1].price.toFixed(2) +
  //   " " +
  //   availableItems[2].price.toFixed(2) +
  //   " " +
  //   availableItems[3].price.toFixed(2) +
  //   " " +
  //   availableItems[4].price.toFixed(2);
  // purchasedTable.innerHTML =
  //   availableItems[0].purchased +
  //   " " +
  //   availableItems[1].purchased +
  //   " " +
  //   availableItems[2].purchased +
  //   " " +
  //   availableItems[3].purchased +
  //   " " +
  //   availableItems[4].purchased;
}

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${counter.toFixed(2)} 🕺`;
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
  counter >= availableItems[3].price
    ? (shopButtonD.disabled = false)
    : (shopButtonD.disabled = true);
  counter >= availableItems[4].price
    ? (shopButtonE.disabled = false)
    : (shopButtonE.disabled = true);
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
    desc.innerHTML = availableItems[itemType - 1].description;
    // Use the updated rate every second
    setInterval(() => increaseCounter(rateTotal), 1000);
  }
}

const header = document.createElement("h1");
const growthRate = document.createElement("div");
const row1 = document.createElement("div");
const row2 = document.createElement("div");
const row3 = document.createElement("div");
const row4 = document.createElement("div");
const row5 = document.createElement("div");

const itemA = document.createElement("div");
const itemB = document.createElement("div");
const itemC = document.createElement("div");
const itemD = document.createElement("div");
const itemE = document.createElement("div");

const button = document.createElement("button");
const counterText = document.createElement("div");

const shopButtonA = document.createElement("button");
shopButtonA.style.marginRight = "auto";
const shopButtonB = document.createElement("button");
shopButtonB.style.marginRight = "auto";
const shopButtonC = document.createElement("button");
shopButtonC.style.marginRight = "auto";
const shopButtonD = document.createElement("button");
shopButtonD.style.marginRight = "auto";
const shopButtonE = document.createElement("button");
shopButtonE.style.marginRight = "auto";

row1.appendChild(shopButtonA);
row1.appendChild(itemA);
row1.style.display = "flex";
row2.appendChild(shopButtonB);
row2.appendChild(itemB);
row2.style.display = "flex";
row3.appendChild(shopButtonC);
row3.appendChild(itemC);
row3.style.display = "flex";
row4.appendChild(shopButtonD);
row4.appendChild(itemD);
row4.style.display = "flex";
row5.appendChild(shopButtonE);
row5.appendChild(itemE);
row5.style.display = "flex";

// const priceTable = document.createElement("div");
// const purchasedTable = document.createElement("div");

const desc = document.createElement("div");
desc.style.fontStyle = "italic";

header.innerHTML = gameName;
// purchasedTable.style.wordSpacing = "95px";
// priceTable.style.wordSpacing = "45px";
updateText();

counterText.innerHTML = `0 🕺`;

button.innerHTML = "🕺";
// button.style.cssText = "width: 100px; height: 50px;";
button.style.fontSize = "24px";
button.addEventListener("click", () => increaseCounter(1), false);

shopButtonA.innerHTML = availableItems[0].name;
shopButtonA.disabled = true;
shopButtonA.addEventListener("click", () => shop(1), false);
shopButtonB.innerHTML = availableItems[1].name;
shopButtonB.disabled = true;
shopButtonB.addEventListener("click", () => shop(2), false);
shopButtonC.innerHTML = availableItems[2].name;
shopButtonC.disabled = true;
shopButtonC.addEventListener("click", () => shop(3), false);
shopButtonD.innerHTML = availableItems[3].name;
shopButtonD.disabled = true;
shopButtonD.addEventListener("click", () => shop(4), false);
shopButtonE.innerHTML = availableItems[4].name;
shopButtonE.disabled = true;
shopButtonE.addEventListener("click", () => shop(5), false);

app.append(header);
app.append(counterText);

app.append(growthRate);
// app.append(itemA);
// app.append(itemB);
// app.append(itemC);
// app.append(itemD);
// app.append(itemE);

app.append(button);
app.append(row1);
app.append(row2);
app.append(row3);
app.append(row4);
app.append(row5);

// app.append(purchasedTable);
// app.append(buttonTable);
// app.append(shopButtonA);
// app.append(shopButtonB);
// app.append(shopButtonC);
// app.append(shopButtonD);
// app.append(shopButtonE);
// app.append(priceTable);
app.append(desc);
