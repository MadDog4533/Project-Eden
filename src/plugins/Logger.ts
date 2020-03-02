import { instanceable } from "../g10/modules/Decorators";
import EdenPlugin = require("../g10/modules/EdenPlugin");
import fs from "fs";

@instanceable
class Logger extends EdenPlugin {
    Name = "Logger";
    constructor(){
        super();
    }
    onStart = function(){
        //this.checkCreate();

        for (let i = 0; i < process.argv.length; i++){
            if (process.argv[i] == "--out" && process.argv[i + 1] != undefined){
                console.log("Logger", "Output file: " + process.argv[i + 1]);
            }
        }
        return Promise.resolve(true);
    }
}
export = Logger;