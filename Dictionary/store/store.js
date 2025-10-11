import { en } from "../lang/en.js"

const header = document.getElementById("header");
const label = document.getElementById("label");
const submitButton = document.getElementById("button");

function init() {
    header.textContent = en.global.header;
    label.textContent = en.store.label;
    submitButton.textContent = en.store.button;
}

init();