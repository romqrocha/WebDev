import { DeleteButton } from "./DeleteButton.js"
import { Note } from "./note.js"

export class DeletableNote {

    /**
     * @param {string} id 
     * @param {string} text
     * @param {(NoteData) => void} saveCallback
     * @param {(string) => void} removeCallback 
     */
    constructor(id, text, saveCallback, removeCallback) {
        this.id = id;
        this.note = new Note(`Note${id}`, text, saveCallback)
        this.deleteButton = new DeleteButton(`DeleteButton${id}`, () => removeCallback(id))
        this.classes = "container d-flex flex-row justify-content-center align-items-center"
    }

    /**
     * @returns {HTMLElement}
     */
    toElement() {
        let container = document.createElement("div");
        container.id = this.id;
        container.className = this.classes;
        container.insertAdjacentElement("beforeend", this.note.toElement()); 
        container.insertAdjacentElement("beforeend", this.deleteButton.toElement()); 
        return container;
    }
}