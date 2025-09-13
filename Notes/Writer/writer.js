import { DeletableNote } from "../js/DeletableNote.js";
import { Button } from "../js/button.js"
import { msgs } from "../lang/messages/en/user.js"

class Writer {
    static lastSaveTime = Date.now(); // TODO
    static addButton = new Button("addButton", "＋", Writer.createNote, "fs-2 fw-bold d-flex mt-3 pt-1 btn-success");
    static notesDiv = document.getElementById("notesDiv");
    static lastSaveSpan = document.getElementById("headerSpan");

    static init() {
        let addButtonDiv = document.getElementById("addButtonDiv");
        addButtonDiv.insertAdjacentElement("beforeend", Writer.addButton.toElement());

        let lastSaveText = document.createTextNode(`${msgs.writer.storedMsg} ${Writer.lastSaveTime}`)
        Writer.lastSaveSpan.appendChild(lastSaveText)

        
    }

    static createNote() {
        let note = new DeletableNote("test", "");
        Writer.notesDiv.insertAdjacentElement("beforeend", note.toElement());
    }
}

// Entry point
Writer.init();