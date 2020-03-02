"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main Node Modules
const process = __importStar(require("process"));
// G10 Modules
const G10_1 = __importDefault(require("./g10/G10"));
// App config file
const app_json_1 = __importDefault(require("./config/app.json"));
// App Usage configuration file
const usage_json_1 = __importDefault(require("./usage.json"));
// Set the global directory for easier pathing
global.App_Dir = __dirname;
const env = process.env;
function splash() {
    console.log(`  Project ${env.npm_package_name} 
          build ${env.npm_package_version}`);
    console.log(``);
    console.log(`  Developed by ${env.npm_package_author_name}`);
    console.log(`  In Association with ${env.npm_package_author_url}`);
    console.log(``);
}
// Main calling logic for the app
function main() {
    checkArgs(process.argv);
    splash();
    var G10_Engine = new G10_1.default();
    G10_Engine.Initialize();
}
function checkArgs(args) {
    console.log(args);
    for (let i = 0; i < args.length; i++) {
        if (args[i] == "--inspect") {
            app_json_1.default.options.ReadEvaluate.Allowed = true;
        }
    }
}
function printUsage() {
    console.log(usage_json_1.default.main.usage);
    for (let i = 0; i < Object.keys(usage_json_1.default.plugins).length; i++) {
        let plugin = Object.keys(usage_json_1.default.plugins)[i];
        console.log(plugin);
    }
}
main();
//# sourceMappingURL=app.js.map