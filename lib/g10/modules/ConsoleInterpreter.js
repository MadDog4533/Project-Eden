"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const G10Module = require("../G10Module");
const terminal_kit_1 = require("terminal-kit");
const repl_1 = __importDefault(require("repl"));
const app_settings = __importStar(require("../../config/app.json"));
// Messing around with Read evaluate print loop
class ConsoleInterpreter extends G10Module {
    constructor() {
        super(...arguments);
        this.ModuleName = "ConsoleInterpreter";
        this.ModuleStyle = terminal_kit_1.terminal.yellow.underline;
    }
    setREPL() {
        this.replServer = repl_1.default.start({ prompt: '> ', replMode: repl_1.default.REPL_MODE_STRICT });
        this.replServer.defineCommand('stop', {
            help: 'Gracefully shutdown server',
            action() {
                console.log("PROCESS", "Closing server");
                process.exit(0);
            }
        });
        // Force close the server. Not recommended.
        this.replServer.on('exit', () => {
            process.exit(0);
        });
    }
    addContext(ident, obj) {
        this.replServer.context[ident] = obj;
    }
    setPS2(override) {
        if (override) {
            this.replServer.setPrompt(override);
        }
        else {
            this.replServer.setPrompt("> ");
        }
    }
    initialize() {
        if (app_settings.options.ReadEvaluate.Allowed) {
            this.setREPL();
            console.log(`%${this.ModuleName}%`, terminal_kit_1.terminal.yellow.underline, " Read-Eval-Print-Loop Established");
        }
        else {
            console.log(`%${this.ModuleName}%`, terminal_kit_1.terminal.yellow.underline, " Skipping Read-Eval, set in config to enable");
        }
        return Promise.resolve(this);
    }
}
exports.default = ConsoleInterpreter;
//# sourceMappingURL=ConsoleInterpreter.js.map