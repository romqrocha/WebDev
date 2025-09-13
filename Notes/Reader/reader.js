import { Note } from "../js/note.js"
import { msgs } from "../lang/messages/en/user.js"
import { Utils } from "../js/global.js"

class Reader {
    static lastUpdateSpan = document.getElementById("headerSpan");
    static backButton = document.getElementById("back");
    static notesDiv = document.getElementById("notesDiv");
    static lastUpdateKey = "lastUpdate";
    static savedNotesKey = "savedNotes";

    static init() {
        let lastUpdateText = document.createTextNode(`${msgs.reader.updatedMsg} ${Reader.getLastUpdateTime()}`);
        Reader.lastUpdateSpan.appendChild(lastUpdateText);

        Reader.createOldNotes();
        setInterval(Reader.refresh, 2000);

        Reader.backButton.textContent = msgs.writer.backButton;
    }
    
    static createOldNotes() {
        let savedNoteData = Reader.getSavedNotes();
        let noNotes = true;
        for (let key in savedNoteData) {
            noNotes = false;
            let note = new Note(key, savedNoteData[key]);
            Reader.notesDiv.insertAdjacentElement("beforeend", note.toElement(true));
        }
        let now = Utils.NowAsString();
        localStorage.setItem(Reader.lastUpdateKey, now);
        Reader.lastUpdateSpan.textContent = `${msgs.reader.updatedMsg} ${now}`;

        if (noNotes) {
            Reader.notesDiv.textContent = msgs.reader.emptyStorage;
        }
    }

    static refresh() {
        Reader.notesDiv.innerHTML = "";
        Reader.createOldNotes();
    }

    /**
     * @returns {object}
     */
    static getSavedNotes() {
        let savedNotes = localStorage.getItem(Reader.savedNotesKey);
        if (savedNotes === null || savedNotes === "") {
            return {};
        } else {
            return JSON.parse(savedNotes);
        }
    }

    /**
     * @returns {string}
     */
    static getLastUpdateTime() {
        let cached = localStorage.getItem(Reader.lastUpdateKey);
        return cached === null ? msgs.reader.notUpdatedMsg : cached;
    }
}

// entry point
Reader.init();