import EdenPlugin = require("../g10/modules/EdenPlugin");

class BibleVerse extends EdenPlugin {
    Name = "BibleVerse";

    onStart = function(){
        return Promise.resolve(true);
    }
}