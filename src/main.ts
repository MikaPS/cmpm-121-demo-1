import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${Math.round(counter)} Whales`;
  // Disables/enables the button based on the units collected
  if (counter >= 10) {
    shopButton.disabled = false;
  } else {
    shopButton.disabled = true;
  }
}

// Step 5
// numPurchased will be equal to the growth rate that would be used for the Continuous Growth
// More times the item is purchased, the faster the growth rate would be
let numPurchased = 0;
function shop() {
  counter -= 10; // Decrease the units by 10
  numPurchased += 1;
  lastFrame = performance.now(); // Starts the animation
  requestAnimationFrame(() => automate(performance.now()));
}

const header = document.createElement("h1");
const button = document.createElement("button");
const counterText = document.createElement("div");
const shopButton = document.createElement("button");

header.innerHTML = gameName;
counterText.innerHTML = `0 Whales`;

button.innerHTML = "🐳";
button.addEventListener("click", () => increaseCounter(1), false);

shopButton.innerHTML = "Shop";
shopButton.disabled = true; // At the beginning, disbale the shop button
shopButton.addEventListener("click", shop, false);

// Step 4: Continuous Growth
// Read through this thread to understand the algorithm / how to approach it.
// https://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
let lastFrame: number = 0;
function automate(currentFrame: number) {
  // Calculate how much time changed per frame
  const elapsed: number = currentFrame - lastFrame;
  lastFrame = currentFrame;
  // let fps = 1000 / elapsed; // calculate frame per second
  increaseCounter(numPurchased / (1000 / elapsed)); // incrase counter with the fractional amount  -> 1 / (second / frame)
  // The function would be called every frame with the current time
  requestAnimationFrame(() => automate(performance.now()));
}
// Call the automate function with the current time
requestAnimationFrame(() => automate(performance.now()));
// Step 3: Automatic Clicking
// setInterval(() => increaseCounter(1), 1000);

app.append(header);
app.append(button);
app.append(shopButton);
app.append(counterText);
