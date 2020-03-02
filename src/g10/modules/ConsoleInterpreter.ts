import G10Module = require("../G10Module");
import readline from "readline";
import { terminal as term } from "terminal-kit";
import repl, { REPLServer } from "repl";
import * as app_settings from "../../config/app.json";

// Messing around with Read evaluate print loop

export default class ConsoleInterpreter extends G10Module {
    ModuleName = "ConsoleInterpreter";
    ModuleStyle = term.yellow.underline;

    protected replServer: REPLServer;

    setREPL(){
        this.replServer = repl.start({prompt: '> ', replMode: repl.REPL_MODE_STRICT});

        this.replServer.defineCommand('stop', {
            help: 'Gracefully shutdown server',
            action(){
                console.log("PROCESS", "Closing server");
                process.exit(0);
            }
        });
        
        // Force close the server. Not recommended.
        this.replServer.on('exit', () => {
            process.exit(0);
        });
    }

    addContext(ident: string, obj: any){
        this.replServer.context[ident] = obj;
    }

    setPS2(override: string){
        if (override){
            this.replServer.setPrompt(override);
        } else {
            this.replServer.setPrompt("> ");
        }
    }

    initialize(){
        if (app_settings.options.ReadEvaluate.Allowed) {
            this.setREPL();
            console.log(`%${this.ModuleName}%`, term.yellow.underline, " Read-Eval-Print-Loop Established");
        } else {
            console.log(`%${this.ModuleName}%`, term.yellow.underline, " Skipping Read-Eval, set in config to enable");
        }
        return Promise.resolve(this);

    }
}