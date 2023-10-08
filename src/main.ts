import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

let counter: number = 0;
function increaseCounter() {
  counter++;
  counterText.innerHTML = `${counter} Whales`;
}

const header = document.createElement("h1");
const button = document.createElement("button");
const counterText = document.createElement("div");

header.innerHTML = gameName;
button.innerHTML = "🐳";
counterText.innerHTML = `0 Whales`;
button.addEventListener("click", increaseCounter, false);
setInterval(increaseCounter, 1000);

app.append(header);
app.append(button);
app.append(counterText);
