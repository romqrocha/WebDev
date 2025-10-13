import { config } from "./config.js"

/**
 * @param {Object} urlParams 
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} loadedCallback
 * @param {(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any} networkErrorCallback
 */
export function sendGetRequest(urlParams, loadedCallback, networkErrorCallback) {
    const request = new XMLHttpRequest();
    
    let stringifiedUrlParams = [];
    for (const [key, value] of Object.entries(urlParams)) {
        stringifiedUrlParams.push(`${key}=${encodeURIComponent(value)}`);
    }

    const url = `${config.DICTIONARY_API_ENDPOINT}/?${stringifiedUrlParams.join('&')}`;

    request.open("GET", url, true);
    request.onreadystatechange = function(event) {
        if (this.readyState == 4) {
            loadedCallback(this, event);
        }
    }
    request.onerror = networkErrorCallback;
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
    for (const [key, value] of Object.entries(bodyParams)) {
        stringifiedBodyParams.push(`${key}=${encodeURIComponent(value)}`);
    }

    const url = `${config.DICTIONARY_API_ENDPOINT}/`;

    request.open("POST", url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = loadedCallback;
    request.onerror = errorCallback;
    request.send(stringifiedBodyParams.join('&'));
}
