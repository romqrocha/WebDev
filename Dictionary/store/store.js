import { en } from "../lang/en.js"
import { sendPostRequest } from "../global.js";

const header = document.getElementById("header");
const label = document.getElementById("label");
const submitButton = document.getElementById("submitButton");
const storeLink = document.getElementById("storeLink");
const searchLink = document.getElementById("searchLink");
const resultDiv = document.getElementById("result");
const wordInput = document.getElementById("wordInput");
const definitionInput = document.getElementById("definitionInput");

function init() {
    header.textContent = en.global.header;
    label.textContent = en.store.label;
    submitButton.textContent = en.store.button;
    storeLink.textContent = en.global.storeLinkText;
    searchLink.textContent = en.global.searchLinkText;

    submitButton.onclick = onSubmit;
}

function onSubmit() {
    let word = wordInput.value;
    let def = definitionInput.value;

    // regex for no numbers
    if (!/^\D*$/.test(word)) {
        let result = `
            <p class="error">
                No numbers allowed for dictionary entries
            </p>
        `
        renderResult(result);
        return;
    }

    if (word === "" || def === "") {
        let result = `
            <p class="error">
                Neither field should be empty.
            </p>
        `
        renderResult(result);
        return;
    }
    
    sendPostRequest({term: word, definition: def}, onRequestSuccess, onNetworkError);
}

/**
 * @param {XMLHttpRequest} request 
 * @param {ProgressEvent<EventTarget>} event 
 */
function onRequestSuccess(request, event) {
    console.log(`Request: ${request.status} ${request.responseText}`)

    let obj; 
    try {
        obj = JSON.parse(request.responseText);
    } catch (err) {
        console.log("JSON parsing error");
        obj = {currentTotalNumEntries: 1, term: "placeholder", definition: "placeholder"} // ! remove later
    }

    if (request.status === 201) {
        let currentTotalNumEntries = obj.currentTotalNumEntries;
        let term = obj.term;
        let definition = obj.definition;
        showResponse(currentTotalNumEntries, term, definition);
    } else if (request.status === 400) {
        let errorMsg = obj.errorMessage;
        let response = `
            <p class="error">
                ${errorMsg}
            </p>
        `;
        renderResult(response);
    } else {
        console.log(request.responseText);

        let response = `
            <p class="error">
                Server responded with an unknown status code.
            </p>
        `;
        renderResult(response);
    }
}

/**
 * @param {XMLHttpRequest} request 
 * @param {ProgressEvent<EventTarget>} event 
 */
function onNetworkError(request, event) {
    console.error("Network error")

    let error;
    if (!request.responseText) {
        error = `
            <p class="error">
                A network error occured. Maybe CORS?
            </p>
        `
    } else {
        error = `
            <p class="arial">
                ${request.responseText}
            </p>
        `
    }

    renderResult(error);
}

/**
 * @param {number} numEntries 
 * @param {string} term 
 * @param {string} definition 
 */
function showResponse(numEntries, term, definition) {
    let result = `
        <div>
            <h3 class='arial'>
                Entry #${numEntries} recorded:
            </h3>
            <p class='arial'>
                <b>Term: </b><span>${term}</span>
            </p>
            <p class='arial'>
                <b>Definition: </b><span>${definition}</span>
            </p>
        </div>
    `
    renderResult(result);
}

/**
 * @param {string} htmlString 
 */
function renderResult(htmlString) {
    resultDiv.innerHTML = htmlString;
}

init();