export class Utils {
    /**
     * @returns {string}
     */
    static NowAsString() {
        let now = new Date();
        return `${now.toDateString()}, ${now.toTimeString()}`
    }
}