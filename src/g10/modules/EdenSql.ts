import G10Module = require("../G10Module");
import * as mysql from "mysql";
import * as App_Settings from "../../config/app.json";

export default class EdenSQL extends G10Module {
    ModuleName = "ESQL";
    ModuleStyle = "term.test";

    protected sql_connection: mysql.Connection;
    constructor(){
        super();
    }

    initialize() {
        this.sql_connection = mysql.createConnection(App_Settings.database);

        this.sql_connection.connect((err) => {
            if (err) return Promise.reject(err);
        });


        return Promise.resolve();
    }
}