import { DeleteButton } from "./DeleteButton.js"
import { Note } from "./Note.js"

export class DeletableNote {

    /**
     * @param {string} id 
     * @param {string} text 
     */
    constructor(id, text) {
        let removeFunction = () => {
            document.getElementById(this.id).remove();
        }

        this.id = id;
        this.note = new Note(`${id}Note`, text)
        this.deleteButton = new DeleteButton(`${id}Del`, removeFunction)
        this.classes = "container d-flex flex-row justify-content-center align-items-center my-1"
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