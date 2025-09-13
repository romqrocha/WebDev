export class Button {
    static baseClasses = "btn btn-lg btn-secondary btn-outline-dark text-light border-0";

    /**
     * Creates a button
     * @param {string} id 
     * @param {string} text 
     * @param {() => undefined} onClick
     * @param {Array<string>} extraClasses 
     */
    constructor(id, text, onClick=()=>{}, extraClasses=[]) {
        this.id = id;
        this.text = text;
        this.onClick = onClick;
        this.allClasses = `${Button.baseClasses} ${extraClasses.toString().replace(",", " ")}` 
    }

    /**
     * @returns Element representation of this Button.
     */
    toElement() {
        let button = document.createElement("button");
        button.id = this.id;
        button.className = this.allClasses;
        button.appendChild(document.createTextNode(this.text));
        button.onclick = this.onClick;
        return button;
    }
        
}
