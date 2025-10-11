import { config } from "./config.js"

/**
 * @param {Object} urlParams 
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} loadedCallback
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} errorCallback
 */
export function sendGetRequest(urlParams, loadedCallback, errorCallback) {
    const request = new XMLHttpRequest();
    
    let stringifiedUrlParams = [];
    for (key, value in Object.entries(urlParams)) {
        stringifiedUrlParams.push(`${key}=${encodeURIComponent(value)}`);
    }

    const url = `${config.DICTIONARY_API_ENDPOINT}/?${stringifiedUrlParams.join('&')}`;

    request.open("GET", url, true);
    request.onloadend = loadedCallback;
    request.onerror = errorCallback;
    request.send();
}

/**
 * @param {Object} bodyParams 
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} loadedCallback
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} errorCallback
 */
export function sendPostRequest(bodyParams, loadedCallback, errorCallback) {
    const request = new XMLHttpRequest();
    
    let stringifiedBodyParams = [];
    for (key, value in Object.entries(bodyParams)) {
        stringifiedBodyParams.push(`${key}=${encodeURIComponent(value)}`);
    }

    const url = `${config.DICTIONARY_API_ENDPOINT}/`;

    request.open("POST", url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onloadend = loadedCallback;
    request.onerror = errorCallback;
    request.send(stringifiedBodyParams.join('&'));
}