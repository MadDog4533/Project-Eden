"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EdenPlugin = require("../g10/modules/EdenPlugin");
class BibleVerse extends EdenPlugin {
    constructor() {
        super(...arguments);
        this.Name = "BibleVerse";
        this.onStart = function () {
            return Promise.resolve(true);
        };
    }
}
//# sourceMappingURL=BibleVerse.js.map