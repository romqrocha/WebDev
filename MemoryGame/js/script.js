import { EnMessages } from "../lang/messages/en/user.js";

/**
 * Handles the HTML document
 */
class DocumentController {
  /**
   * Initializes the page
   */
  static init() {
    // find elements
    let inputLabel = document.getElementById("inputLabel");
    let startButton = document.getElementById("startButton");

    // user facing text
    inputLabel.innerText = EnMessages.inputLabel();
    startButton.innerText = EnMessages.startButtonLabel();

    // event listeners
    startButton.onclick = GameController.onStart;
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
   * Adds a button to the preview span
   * @param {Button} button
   */
  static previewButton(button) {
    let previewSpan = document.getElementById("previewSpan");
    previewSpan.insertAdjacentHTML("beforeend", button.toHTML());
  }

  /**
   * Clears the preview span
   */
  static clearPreviewSpan() {
    let previewSpan = document.getElementById("previewSpan");
    previewSpan.innerHTML = "";
  }

  /**
   * Hides an element. No effect if it was already hidden
   * @param {string} elementId 
   */
  static hideElement(elementId) {
    document.getElementById(elementId).classList.add("hidden")
  } 

  /**
   * Shows a hidden element. No effect if it wasn't hidden
   * @param {string} elementId 
   */
  static unhideElement(elementId) {
    document.getElementById(elementId).classList.remove("hidden")
  }

  /**
   * Shuffles an element's position using ira left and top style properties.
   * Shuffles only within the viewport.
   * @param {string} id element's id 
   */
  static shuffleElement(id) {
    let element = document.getElementById(id);
    let maxX = window.innerWidth - element.offsetWidth;
    let maxY = window.innerHeight - element.offsetHeight;
    element.style.left = Math.floor(Math.random() * maxX).toString() + "px";
    element.style.top = Math.floor(Math.random() * maxY).toString() + "px";
  }

  /**
   * Reveals a button's number and removes its event listener
   * @param {Button} button 
   */
  static revealButton(button) {
    let buttonHTML = document.getElementById(button.id);
    buttonHTML.innerText = button.number;
    buttonHTML.onclick = undefined;
  }
}

/**
 * Handles the game logic
 */
class GameController {
  static numButtons = undefined;
  static buttons = [];
  static currentNumber = 0;
  static started = false;
  static colors = [
    "#e63946",
    "#f77f00",
    "#ffd60a",
    "#2a9d8f",
    "#1d3557",
    "#9d4edd",
    "#ff6b81",
  ];

  /**
   * @param {number} seconds
   * @returns A promise that resolves after the given number of seconds
   */
  static sleep = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  };

  /**
   * Called when the start button is pressed
   */
  static onStart = async () => {
    // start game
    if (this.started) {
      DocumentController.createAlert(EnMessages.alreadyStartedMsg());
      return;
    }
    this.stop()
    this.started = true;

    // find out the number of buttons
    this.numButtons = DocumentController.getInputValue(this.isInputValid);
    if (!this.numButtons) {
      this.stop();
      return;
    }

    // init and preview buttons
    this.buttons = this.getButtons(this.numButtons);
    this.buttons.forEach((button) => {
      DocumentController.previewButton(button);
    });
    await this.sleep(this.numButtons);
    DocumentController.clearPreviewSpan();

    // set up memorization phase
    DocumentController.hideElement("inputDiv");
    DocumentController.unhideElement("gameDiv");
    let gameDiv = document.getElementById("gameDiv");
    this.buttons.forEach((button) => {
      gameDiv.insertAdjacentHTML("beforeend", button.toHTML());
      document.getElementById(button.id).classList.add("absolute");
    });

    // shuffle buttons a few times
    let shufflesLeft = this.numButtons;
    let secondsBetweenShuffles = 2;

    this.shuffleButtons();
    shufflesLeft--;
    while (shufflesLeft > 0) {
      await this.sleep(secondsBetweenShuffles);
      this.shuffleButtons();
      shufflesLeft--;
    }

    // check player's memory
    this.buttons.forEach((button) => {
      let buttonHTML = document.getElementById(button.id);
      buttonHTML.innerText = "";
      buttonHTML.onclick = () => button.checkMemory(this.onSuccess, this.onFail);
    });

    return;
  };

  /**
   * Called when the player gets a button right
   * @param {Button} button 
   */
  static onSuccess = async (button) => {
    this.currentNumber++;
    DocumentController.revealButton(button);
    if (this.numButtons && button.number >= this.numButtons) {
      await this.sleep(0.1)
      alert(EnMessages.youWinMsg());
      this.started = false;
      DocumentController.unhideElement("inputDiv");
    }
  };

  /**
   * Called when the player gets a button wrong
   */
  static onFail = async () => {
    this.buttons.forEach((button) => {
      document.getElementById(button.id).innerText = button.number;
    })
    alert(EnMessages.wrongOrderMsg());
    DocumentController.unhideElement("inputDiv");
    this.started = false;
  };

  /**
   * Shuffles the positions of all buttons
   */
  static shuffleButtons = () => {
    this.buttons.forEach((button) => {
      DocumentController.shuffleElement(button.id);
    });
  };

  /**
   * @param {number} numColors number of colors to return
   * @returns array with hex codes of random colors
   */
  static getRandomColors = (numColors) => {
    let unusedColors = [...this.colors];
    let colorsToUse = [];
    for (let i = 0; i < numColors; i++) {
      let randomIndex = Math.floor(Math.random() * unusedColors.length);
      colorsToUse.push(unusedColors.splice(randomIndex, 1)[0]);
    }
    return colorsToUse;
  };

  /**
   * @returns array with the created buttons
   */
  static getButtons = () => {
    let colors = this.getRandomColors(this.numButtons);
    let buttons = [];
    for (let i = 0; i < this.numButtons; i++) {
      buttons[i] = new Button(i + 1, colors[i]);
    }
    return buttons;
  };

  /**
   * Resets the game
   */
  static stop = () => {
    DocumentController.clearPreviewSpan();
    DocumentController.unhideElement("inputDiv");
    DocumentController.hideElement("gameDiv");
    document.getElementById("gameDiv").innerHTML = "";
    this.buttons = [];
    this.currentNumber = 0;
    this.started = false;
  };

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

  /**
   * Called when the button is clicked
   * @param {(Button) => any} onSuccess 
   * @param {() => any} onFail 
   */
  checkMemory = (onSuccess, onFail) => {
    if (this.number === GameController.currentNumber + 1) {
      onSuccess(this);
    } else {
      onFail();
    }
  }
}

// entry point
DocumentController.init();
