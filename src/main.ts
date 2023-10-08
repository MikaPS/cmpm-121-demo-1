import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Whale game";

document.title = gameName;

const header = document.createElement("h1");
const button = document.createElement("button");

header.innerHTML = gameName;
button.innerHTML = "🐳";

app.append(header);
app.append(button);
