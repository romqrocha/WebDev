import { msgs } from "./lang/messages/en/user.js";
import { Button } from "./js/button.js"

class Index {

    static _writeButton = undefined;
    /**
     * Properties in javascript just for fun 
     * @returns {Button} 
     */
    static WriteButton = () => {
        if (!this._writeButton) { 
            this._writeButton = new Button("writeButton", msgs.index.writeButton, () => {
                window.location.href="./Writer/writer.html"
            }, ["mx-3"]);
        }
        return this._writeButton
    };

    static _readButton = undefined;
    /**
     * Properties in javascript just for fun 
     * @returns {Button} 
     */
    static ReadButton = () => {
        if (!this._readButton) {
            this._readButton = new Button("readButton", msgs.index.readButton, () => {
                window.location.href="./Reader/reader.html"
            }, ["mx-3"]);
        }
        return this._readButton;
    };

    static init() {
        let title = document.getElementById("title");
        let subtitle = document.getElementById("subtitle");
        let buttonSpan = document.getElementById("buttonSpan");

        title.innerText = msgs.index.title;
        subtitle.innerText = msgs.index.subtitle;
        buttonSpan.insertAdjacentElement("beforeend", this.WriteButton().toElement())
        buttonSpan.insertAdjacentElement("beforeend", this.ReadButton().toElement());
    }
}

// Entry point
Index.init();