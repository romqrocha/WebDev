import { DeletableNote } from "../js/DeletableNote.js"
import { Button } from "../js/button.js"
import { msgs } from "../lang/messages/en/user.js"
import { Utils } from "../js/global.js"

class Writer {
    static lastSaveTime = Date.now(); // TODO
    static addButton = new Button("addButton", "＋", Writer.createNewNote, "fs-2 fw-bold d-flex mt-3 pt-1 btn-success");
    static notesDiv = document.getElementById("notesDiv");
    static lastSaveSpan = document.getElementById("headerSpan");
    static savedNotesKey = "savedNotes";
    static numNotesKey = "numNotes";
    static lastSaveKey = "lastSave";

    static init() {
        let addButtonDiv = document.getElementById("addButtonDiv");
        addButtonDiv.insertAdjacentElement("beforeend", Writer.addButton.toElement());

        let lastSaveText = document.createTextNode(`${msgs.writer.storedMsg} ${Writer.getLastSaveTime()}`);
        Writer.lastSaveSpan.appendChild(lastSaveText);

        Writer.createOldNotes();
    }

    /**
     * @returns {number}
     */
    static getAndIncrementNumNotes() {
        let numNotes = localStorage.getItem(Writer.numNotesKey);
        numNotes = numNotes === null ? 0 : parseInt(numNotes);
        localStorage.setItem(Writer.numNotesKey, numNotes + 1);
        return numNotes;
    }

    static createNewNote() {
        let id = Writer.getAndIncrementNumNotes();
        let note = new DeletableNote(id.toString(), "", Writer.saveNoteLocally, Writer.removeNote);
        Writer.notesDiv.insertAdjacentElement("beforeend", note.toElement());
    }

    static createOldNotes() {
        let savedNoteData = Writer.getSavedNotes();
        for (let key in savedNoteData) {
            let note = new DeletableNote(key.substring("Note".length), savedNoteData[key], Writer.saveNoteLocally, Writer.removeNote);
            Writer.notesDiv.insertAdjacentElement("beforeend", note.toElement());
        }
    }

    /**
     * @returns {object}
     */
    static getSavedNotes() {
        let savedNotes = localStorage.getItem(Writer.savedNotesKey);
        if (savedNotes === null || savedNotes === "") {
            return {};
        } else {
            return JSON.parse(savedNotes);
        }
    }

    /**
     * @param {string} id 
     */
    static removeNote(id) {
        document.getElementById(id).remove();
        let savedNoteData = Writer.getSavedNotes();
        delete savedNoteData[`Note${id}`];
        Writer.updateLocalNotes(savedNoteData);
    }

    /**
     * @param {NoteData} data 
     */
    static saveNoteLocally(data) {
        let savedNoteData = Writer.getSavedNotes();
        savedNoteData[data.id] = data.text;
        Writer.updateLocalNotes(savedNoteData);
    }

    /**
     * @param {object} notesToSave 
     */
    static updateLocalNotes(notesToSave) {
        let now = Utils.NowAsString();

        localStorage.setItem(Writer.savedNotesKey, JSON.stringify(notesToSave));
        localStorage.setItem(Writer.lastSaveKey, now);
        Writer.lastSaveSpan.textContent = `${msgs.writer.storedMsg} ${now}`;
    }

    /**
     * @returns {string}
     */
    static getLastSaveTime() {
        let cached = localStorage.getItem(Writer.lastSaveKey);
        return cached === null ? msgs.writer.notStoredMsg : cached;
    }
}

// Entry point
Writer.init();