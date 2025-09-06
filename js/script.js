import { EnMessages } from "/lang/messages/en/user.js";

/**
 * Handles the HTML document
 */
class DocumentController {
  /**
   * Initializes the page
   */
  static init() {
    // start button
    let startButton = document.getElementById("startButton");
    startButton.innerText = EnMessages.startButtonLabel();
    startButton.onclick = GameController.onStart;
  }

  /**
   * Creates an alert message in the alert div
   * @param {string} msg
   */
  static createAlert(msg) {
    let alertTemplate = `<alert>${msg}</alert>`;
    let alertDiv = document.getElementById("alertDiv");
    alertDiv.innerHTML = alertTemplate;
  }

  /**
   * Clears all alerts from the alert div
   */
  static clearAlerts() {
    let alertDiv = document.getElementById("alertDiv");
    alertDiv.innerHTML = "";
  }

  /**
   * @param {(input: string) => boolean} predicate validates the input
   * @returns {string | undefined} 
   * returns the input value if valid, otherwise returns undefined
   */
  static getInputValue(predicate) {
    let inputBox = document.getElementById("buttonCount");
    let input = inputBox.value;

    // javascript moment
    if (!predicate(input)) {
      this.createAlert(EnMessages.alertMsg());
      return undefined;
    } else {
      this.clearAlerts();
      return input;
    }
  }

  /**
   * Adds a non-functional button to the preview span
   * @param {Button} button 
   */
  static previewButton(button) {
    let previewSpan = document.getElementById("previewSpan");
    previewSpan.insertAdjacentHTML("beforeend", button.toHTML());
    let htmlButton = document.getElementById(button.id)
    htmlButton.setAttribute("disabled", "true");
  }

  /**
   * @param {Button} button 
   */
  static clearPreviewButtons(button) {
    let previewSpan = document.getElementById("previewSpan");
    previewSpan.innerHTML = "";
  }
}

/**
 * Handles the game logic
 */
class GameController {
  static colors = ["#e63946", "#f77f00", "#ffd60a", "#2a9d8f", "#1d3557", "#9d4edd", "#ff6b81"]

  /**
   * Called when the start button is pressed
   */
  static onStart = () => {
    DocumentController.clearPreviewButtons();

    let numButtons = DocumentController.getInputValue(this.isInputValid);
    if (!numButtons) {
      return;
    }

    let colors = this.getRandomColors(numButtons);
    for (let i = 1; i <= numButtons; i++) {
      let button = new Button(i, colors[i - 1]);
      DocumentController.previewButton(button)
    }
  }

  /**
   * @param {number} numColors number of colors to return 
   * @returns array with hex codes of random colors
   */
  static getRandomColors(numColors) {
    let unusedColors = [...this.colors];
    let colorsToUse = [];
    for (let i = 0; i < numColors; i++) {
      let randomIndex = Math.floor(Math.random() * unusedColors.length);
      colorsToUse.push(unusedColors.splice(randomIndex, 1)[0]);
    }
    return colorsToUse;
  }

  /**
   * Validates an input
   * @param {string} input 
   * @returns true for valid inputs
   */
  static isInputValid = (input) => {
    let parsedInput = parseInt(input);

    if (isNaN(parsedInput)) {
      return false;
    }
    if (input < 3 || input > 7) {
      return false;
    }

    return true;
  };
}

/**
 * Defines a button for the game
 */
class Button {
  /**
   * @param {int} number 
   * @param {string} color 
   */
  constructor(number, color) {
    this.number = number;
    this.id = "b" + number;
    this.color = color;
  }

  /**
   * @returns {string} HTML representation of the button
   */
  toHTML = () => {
    return `
      <button class="randomButton" id="${this.id}" style='background-color: ${this.color};'>
        ${this.number}
      </button>
    `
  }
}

// entry point
DocumentController.init();
