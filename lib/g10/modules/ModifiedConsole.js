"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const G10Module = require("../G10Module");
const terminal_kit_1 = require("terminal-kit");
const fs_1 = require("fs");
///
//  This G10 Module is designed to add compatibility for:
//  Colors, Extra Term Functaionality, Command Line Servers, File Logging, Inspector Logging
//  Any Writable Stream in general
///
// Attach all term functions to EdenTerminal for processing
// TODO
// Would like to hook process.stdout to edenterminal to handle the stream
class EdenTerminal extends fs_1.WriteStream {
    constructor(opts) {
        super(opts);
    }
}
class ModifiedConsole extends G10Module {
    constructor() {
        super();
        this.ModuleName = "ModifedConsole";
        this.ModuleStyle = terminal_kit_1.terminal.grey.underline;
    }
    static get Stdout() {
        return this._Stdout;
    }
    // ModifiedConsole.addWriteStream to add your stream
    static addWritableStream(stream) {
        this.Stdout.push(stream);
    }
    initialize() {
        const oldlog = console.log;
        console.log = ConsoleFactory.log;
        console.error = ConsoleFactory.error;
        console.debug = ConsoleFactory.debug;
        // Set Stdout redirect
        if (ModifiedConsole.RedirectStdout)
            ConsoleFactory.hookStream(ModifiedConsole.RedirectStdout);
        return Promise.resolve(true);
    }
}
exports.default = ModifiedConsole;
ModifiedConsole._Stdout = Array();
const ConsoleFactory = {
    hookStream(stream) {
        //return (process.stdout = stream);
    },
    log(module, ...options) {
        // Also pipe to any writeable streams for added compatiblity.
        for (let i = 0; i < ModifiedConsole.Stdout.length; i++) {
            terminal_kit_1.terminal(ModifiedConsole.Stdout[i]);
            //ModifiedConsole.Stdout[i].write(module + " " + options);
        }
        ConsoleFactory.setLine();
        terminal_kit_1.terminal.cyan('[Info]: ');
        ConsoleFactory.termify(module, options);
    },
    error(module, ...options) {
        ConsoleFactory.setLine();
        terminal_kit_1.terminal.red('[Error]');
        ConsoleFactory.termify(module, options);
    },
    debug(data, ...options) {
        ConsoleFactory.setLine();
        terminal_kit_1.terminal.yellow("[Debug]: ");
        terminal_kit_1.terminal.defaultColor(data);
        terminal_kit_1.terminal.defaultColor(' ');
        for (let i = 0; i < options.length; i++) {
            terminal_kit_1.terminal.defaultColor(options[i] + ' ');
        }
        terminal_kit_1.terminal('\n');
    },
    setLine() {
        return;
    },
    termify(module, options) {
        if (!module) {
            terminal_kit_1.terminal.red.strike(undefined);
            terminal_kit_1.terminal('\n');
            return;
        }
        if (typeof module != "string") {
            terminal_kit_1.terminal('\n');
            return;
        }
        if (module.indexOf('%') >= 0) {
            if (options.length > 0 && typeof options[0] != "string") {
                let style = options[0];
                style("[" + module.replace(/%/gi, "") + "]");
                terminal_kit_1.terminal('  ');
            }
        }
        else {
            if (module == "G10") {
                terminal_kit_1.terminal.green.underline(`[${module}]`).defaultColor('  ');
            }
            else {
                terminal_kit_1.terminal(`[${module}]  `);
            }
        }
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            // Determine if option is a string
            if (typeof option == "string") {
                // Find if term markdown and next index is defined
                if (option.indexOf('%') >= 0) {
                    let pos = option.indexOf('%');
                    if (options[i + 1])
                        if (typeof options[i + 1] == "function") {
                            let invoke = options[i + 1];
                            let builder = option.split('%');
                            if (builder.length > 3) {
                                throw new Error("String format can only contain 1 set of '%' for each arg");
                                return;
                            }
                            terminal_kit_1.terminal(builder[0]);
                            invoke(builder[1]);
                            terminal_kit_1.terminal(builder[2]);
                            terminal_kit_1.terminal(' ');
                        }
                }
                else {
                    terminal_kit_1.terminal(' ');
                    terminal_kit_1.terminal(option);
                    continue;
                }
            }
        }
        terminal_kit_1.terminal('\n');
    }
};
//# sourceMappingURL=ModifiedConsole.js.map