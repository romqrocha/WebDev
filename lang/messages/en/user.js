export class EnMessages {
    static inputLabel() {
        return "How many buttons to create?";
    }
    
    static alertMsg(min = 3, max = 7) {
        return `Please enter a number between ${min} and ${max}.`;
    }

    static alreadyStartedMsg() {
        return "The game already started!";
    }

    static startButtonLabel() {
        return "Go!";
    }
}