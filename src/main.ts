import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

let counter: number = 0;
function increaseCounter(change: number) {
  counter += change;
  counterText.innerHTML = `${Math.round(counter)} Whales`;
}

const header = document.createElement("h1");
const button = document.createElement("button");
const counterText = document.createElement("div");

header.innerHTML = gameName;
button.innerHTML = "🐳";
counterText.innerHTML = `0 Whales`;
button.addEventListener("click", () => increaseCounter(1), false);

// Step 4: Continuous Growth
// Read through this thread to understand the algorithm / how to approach it.
// https://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
let lastFrame: number = 0;
function automate(currentFrame: number) {
  // Calculate how much time changed per frame
  const elapsed: number = currentFrame - lastFrame;
  lastFrame = currentFrame;
  // let fps = 1000 / elapsed; // calculate frame per second
  // FPS = 1 / (second / frame)
  increaseCounter(1 / (1000 / elapsed)); // incrase counter with the fractional amount
  // The function would be called every frame with the current time
  requestAnimationFrame(() => automate(performance.now()));
}
// Call the automate function with the current time
requestAnimationFrame(() => automate(performance.now()));
// Step 3: Automatic Clicking
// setInterval(() => increaseCounter(1), 1000);

app.append(header);
app.append(button);
app.append(counterText);
