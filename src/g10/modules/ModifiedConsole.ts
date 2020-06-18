import G10Module = require("../G10Module");
import { terminal  as term, stringWidth, Terminal, terminal} from "terminal-kit";
import { WriteStream } from "fs";
import { WritableOptions } from "stream";
const G10 = require('../G10');
import ConsoleInterpreter from "./ConsoleInterpreter";


///
//  This G10 Module is designed to add compatibility for:
//  Colors, Extra Term Functaionality, Command Line Servers, File Logging, Inspector Logging
//  Any Writable Stream in general
///


// Attach all term functions to EdenTerminal for processing
// TODO
// Would like to hook process.stdout to edenterminal to handle the stream
// Prototype calling module
class EdenTerminal extends WriteStream{
    constructor(opts?: WritableOptions){
        super(opts);
    }
}

export default class ModifiedConsole extends G10Module {
    ModuleName = "ModifedConsole";
    ModuleStyle = term.grey.underline;


    // A collection of writable streams to pipe stdout to
    static RedirectStdout: NodeJS.WriteStream;
    protected static _Stdout = Array<NodeJS.WriteStream | WriteStream>();

    static get Stdout(): Array<NodeJS.WriteStream | WriteStream> {
        return this._Stdout;
    }

    // ModifiedConsole.addWriteStream to add your stream
    static addWritableStream(stream: NodeJS.WriteStream | WriteStream){
        this.Stdout.push(stream);
    }

    constructor(){
        super();
    }

    initialize() {

        // Override original NodeJs console functionality
        console.info  = ConsoleFactory.info;
        console.error = ConsoleFactory.error;
        console.debug = ConsoleFactory.debug;
        console.warn  = ConsoleFactory.warn;
        //console.log   = ConsoleFactory.test;


        // Set Stdout redirect
        if (ModifiedConsole.RedirectStdout)
            ConsoleFactory.hookStream(ModifiedConsole.RedirectStdout);

        return Promise.resolve(true);
    }
}

const ConsoleFactory = {

    hookStream(stream: NodeJS.WriteStream){
        //return (process.stdout = stream);
    },

    info(module: string, ...options: Array<string | Terminal.CTerminal>){
        // Also pipe to any writeable streams for added compatiblity.
        for (let i = 0; i < ModifiedConsole.Stdout.length; i++){
            term(ModifiedConsole.Stdout[i]);
            //ModifiedConsole.Stdout[i].write(module + " " + options);
        }


        ConsoleFactory.setLine();
        term.cyan('[Info]:');
        ConsoleFactory.termify(module, options);
    },

    // Keep old console
    // Not "Factorizing"
    log(module: string, ...options: Array<string | Terminal.CTerminal>) {

        // Also pipe to any writeable streams for added compatiblity.
        for (let i = 0; i < ModifiedConsole.Stdout.length; i++){
            term(ModifiedConsole.Stdout[i]);
            //ModifiedConsole.Stdout[i].write(module + " " + options);
        }


        ConsoleFactory.setLine();
        term.cyan('[Info]:');
        ConsoleFactory.termify(module, options);
    },

    error(module, ...options: Array<string | Terminal.CTerminal>){
        ConsoleFactory.setLine();
        term.red('[Error]:');
        ConsoleFactory.termify(module, options);
    },

    warn(module, ...options: Array<string | Terminal.CTerminal>){
        ConsoleFactory.setLine();
        term.yellow('[Warn]: ');
        ConsoleFactory.termify(module, options);
    },

    debug(data: string, ...options: Array<any>){
        ConsoleFactory.setLine();
        term.yellow("[Debug]:");
        term.column(10);
        term.defaultColor(data);
        term.defaultColor(' ');
        for (let i = 0; i < options.length; i++){
            term.defaultColor(options[i] + ' ');
        }
        term('\n');
    },

    test(...options: Array<string | Terminal.CTerminal>){
        return function(target: any, propertyKey: string, descriptor: any){
            console.log(descriptor);
        }
    },

    setLine(){
        term.eraseLine();
        term.column(0);
        return;
    },

    termify(module, options: Array<string | Terminal.CTerminal>){
        term.column(10);
        if (!module){
            term.red.strike(undefined);
            term('\n');
            return;
        }

        if(typeof module != "string"){
            term('\n');
            return;
        }
        
        if (module.indexOf('%') >= 0){
            if (options.length > 0 && typeof options[0] != "string"){
                let style: Terminal.CTerminal = <Terminal.CTerminal> options[0];
                style("[" + module.replace(/%/gi, "") + "]");
                term('  ');
            }
        } else {
            if (module == "G10"){
                term.green.underline(`[${module}]`).defaultColor('  ');
            } else {
                term(`[${module}]  `);
            }
        }
        for (let i = 0; i < options.length; i++){
            let option = options[i];
            // Determine if option is a string
            if (typeof option == "string"){
                // Find if term markdown and next index is defined
                if (option.indexOf('%') >= 0){
                    let pos = option.indexOf('%');
                    if (options[i + 1])
                        if (typeof options[i + 1] == "function"){
                            let invoke: Terminal.CTerminal = <Terminal.CTerminal> options[i + 1];
                            let builder = option.split('%');
                            if (builder.length > 3){
                                throw new Error("String format can only contain 1 set of '%' for each arg");
                                return;
                            }
                            term(builder[0]);
                            invoke(builder[1]);
                            term(builder[2]);
                            term(' ');
                        }
                } else {
                    term(' ');
                    term(option);
                    continue;
                }
            } else if (typeof option == "object") {
                // Implement OLD Console to avoid this mess
                term('\n');
                let a = JSON.stringify(option)
                a = a.replace(/[{]/gi, "\n{\n");
                a = a.replace(/[}]/gi, "\n}\n");
                a = a.replace(/[,]/gi, ",\n");
                term(a);
            }
        }
        term('\n');
        term(globalThis.G10.interface("ConsoleIntepreter"));
        //(<ConsoleInterpreter> globalThis.G10.interface("ConsoleIntepreter")).printPrompt();
    }
}



// Mess around with being able to find the calling module when logging