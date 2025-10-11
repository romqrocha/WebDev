import { en } from "../lang/en.js"
import { sendPostRequest } from "../global.js";

const header = document.getElementById("header");
const label = document.getElementById("label");
const submitButton = document.getElementById("submitButton");
const storeLink = document.getElementById("storeLink");
const searchLink = document.getElementById("searchLink");

function init() {
    header.textContent = en.global.header;
    label.textContent = en.store.label;
    submitButton.textContent = en.store.button;
    storeLink.textContent = en.global.storeLinkText;
    searchLink.textContent = en.global.searchLinkText;
}

init();