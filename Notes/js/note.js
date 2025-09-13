export class Note {
    static numRows = 6;

    /**
     * @param {string} id 
     * @param {string} text 
     * @returns {Note}
     */
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.allClasses = "bg-danger border border-dark rounded-3 border-2 px-4 py-2 mx-4 fs-4 text-light w-50"
    }

    /**
     * @param {boolean} readOnly
     * @returns {HTMLElement}
     */
    toElement(readOnly=false) {
        let note;
        if (readOnly) {
            note = document.createElement("div");
        } else {
            note = document.createElement("textarea");
            note.rows = Note.numRows;
        }
        note.id = this.id;
        note.className = this.allClasses;
        note.appendChild(document.createTextNode(this.text));
        return note;
    }
}