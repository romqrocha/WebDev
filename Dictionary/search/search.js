import { en } from "../lang/en.js"
import { sendGetRequest } from "../global.js";

const header = document.getElementById("header");
const label = document.getElementById("label");
const submitButton = document.getElementById("submitButton");
const storeLink = document.getElementById("storeLink");
const searchLink = document.getElementById("searchLink");
const resultDiv = document.getElementById("result");
const wordInput = document.getElementById("wordInput");

function init() {
    header.textContent = en.global.header;
    label.textContent = en.search.label;
    submitButton.textContent = en.search.button;
    storeLink.textContent = en.global.storeLinkText;
    searchLink.textContent = en.global.searchLinkText;
    
    submitButton.onclick = onSubmit;
}

function onSubmit() {
    let term = wordInput.value;

    if (term === "") {
        return;
    }

    // regex for no numbers
    if (!/^\D*$/.test(term)) {
        let result = `
            <p class="error">
                No numbers allowed for dictionary entries
            </p>
        `
        renderResult(result);
        return;
    }

    sendGetRequest({word: term}, onRequestSuccess, onNetworkError);
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
        obj = {term: "placeholder", definition: "placeholder"}; // ! remove later
    }

    if (request.status === 200) {
        let term = obj.term;
        let definition = obj.definition;
        showDefinition(term, definition);
    } else if (request.status === 404) {
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
        `;
    } else {
        error = `
            <p class="arial">
                ${request.responseText}
            </p>
        `;
    }

    renderResult(error);
}

/**
 * @param {string} term 
 * @param {string} definition 
 */
function showDefinition(term, definition) {
    let result = `
        <div>
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
