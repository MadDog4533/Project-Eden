import EdenPlugin from "../g10/modules/EdenPlugin";
import { override, instanceable } from "../g10/modules/Decorators";
import * as fs from "fs";

@instanceable
class MakeFile extends EdenPlugin {
    Name = "MakeFile";
    constructor() {
        super();
    }
    // Make sure to Promise Resolve after all operations are completed
    onStart = function(){
        fs.mkdir(__dirname + '/' + this.Name, console.log);
        fs.writeFile(`${__dirname}/${this.Name}/config.json`, '{}', console.log);
        
        return new Promise<boolean>((Resolve, reject) => { setTimeout(() => { Resolve(true)}, 3000);})
        
        //setTimeout(() => { return Promise.resolve(true)}, 3000);
    }
}

export = MakeFile;