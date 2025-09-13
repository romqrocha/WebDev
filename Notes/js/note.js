export class Note {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.allClasses = ""
    }

    toElement() {
        let note = document.createElement("div");
        note.id = this.id;
        note.className = this.allClasses;
        note.appendChild(document.createTextNode(this.text));
        return note;
    }
}