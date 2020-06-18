import G10Module = require("../G10Module");
import * as mysql from "mysql";
import * as App_Settings from "../../config/app.json";
import { terminal as term } from "terminal-kit";

export default class EdenSQL extends G10Module {
    ModuleName = "ESQL";
    ModuleStyle = term.gray.underline;

    protected sql_connection: mysql.Connection;
    constructor(){
        super();
    }

    initialize() {

        this.sql_connection = mysql.createConnection(App_Settings.database);

        return new Promise((Resolve, Reject) => {
            this.sql_connection.connect((err, all) => {
                if (err.fatal) 
                    console.warn(`%${this.ModuleName}%`, this.ModuleStyle, "SQL Connection Failed, Please check your SQL Server Configuration aswell as the Eden Documentation and Congiguration File!");
                
                if (err) Reject(err);

                // Check overload 'args'
                console.log(all);
                Resolve();
            });
        })
    }
}