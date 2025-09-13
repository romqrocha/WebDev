export class NoteData {
    /**
     * @param {string} id 
     * @param {string} text 
     */
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

export class Note {
    static numRows = 6;

    /**
     * @param {string} id 
     * @param {string} text 
     * @param {(NoteData) => void} saveCallback 
     */
    constructor(id, text, saveCallback=(_)=>{}) {
        this.data = new NoteData(id, text);
        this.allClasses = "bg-danger border border-dark rounded-3 border-2 px-4 py-2 mx-4 my-1 fs-4 text-light w-50";
        this.saveCallback = saveCallback;
    }

    /**
     * called regularly to save the note's contents
     * @param {string} newContents
     */
    save(newContent) {
        this.data.text = newContent
        this.saveCallback(this.data);
    }

    /**
     * @param {boolean} readOnly
     * @returns {HTMLElement}
     */
    toElement(readOnly=false) {
        let note;
        if (readOnly) {
            // read-only note
            note = document.createElement("div");
        } else {
            // writeable note
            note = document.createElement("textarea");
            note.rows = Note.numRows;
            note.onchange = () => this.save(note.value);
        }
        note.id = this.data.id;
        note.className = this.allClasses;
        note.appendChild(document.createTextNode(this.data.text));
        return note;
    }

    /**
     * @returns {string}
     */
    toJson() {
        return JSON.stringify(this.data);
    }

    /**
     * @param {string} jsonString 
     * @param {(NoteData) => void} saveCallback 
     * @returns {Note}
     */
    static fromJson(jsonString, saveCallback=(_)=>{}) {
        let noteData = JSON.parse(jsonString);
        return new Note(noteData.id, noteData.text, saveCallback);
    }
}