import G10Module = require("../G10Module");
import * as maria from "mariadb";
import * as App_Settings from "../../config/app.json";
import { terminal as term } from "terminal-kit";

export default class EdenSQL extends G10Module {
    ModuleName = "ESQL";
    ModuleStyle = term.gray.underline;

    protected sql_conn: maria.Connection;

    constructor(){
        super();
    }

    async initialize() {

        this.sql_conn = await maria.createConnection(App_Settings.database);

        return new Promise((Resolve, Reject) => {
           console.log(this.sql_conn.isValid());
        });

        //this.sql_connection = mysql.createConnection(App_Settings.database);

        //return new Promise((Resolve, Reject) => {
            //
    }

    onDisable() {
        return Promise.resolve();
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Need to convert to maria db                                                                        ///
/// Create a master connection to the db and then create a pool resource and then implement            ///
/// a REST API to interact with the connection pool for internal (staff) users and a general user pool ///
//////////////////////////////////////////////////////////////////////////////////////////////////////////