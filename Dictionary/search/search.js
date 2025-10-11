import { en } from "../lang/en.js"

const header = document.getElementById("header");
const label = document.getElementById("label");
const submitButton = document.getElementById("submitButton");

function init() {
    header.textContent = en.global.header;
    label.textContent = en.search.label;
    submitButton.textContent = en.search.button;
}

init();
