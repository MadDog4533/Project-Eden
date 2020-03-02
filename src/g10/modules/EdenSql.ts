import G10Module = require("../G10Module");
import * as mysql from "mysql";
import * as App_Settings from "../../config/app.json";

class EdenSQL extends G10Module {
    ModuleName = "ESQL";
    ModuleStyle = "term.test";

    constructor(){
        super();
    }

    initialize() {
        mysql.createConnection(App_Settings.database);
        return Promise.resolve();
    }
}