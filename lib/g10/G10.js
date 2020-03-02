"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PluginManager_1 = __importDefault(require("./modules/PluginManager"));
const WebServer_1 = __importDefault(require("./modules/WebServer"));
const ModifiedConsole_1 = __importDefault(require("./modules/ModifiedConsole"));
const ConsoleInterpreter_1 = __importDefault(require("./modules/ConsoleInterpreter"));
// Module add prototype
// Cast to explicit module type for better chaining
var modules = {
    add: function (_module) {
        // Prevent JS interpretation from assigning non instantiated Module
        if (!_module.ModuleName)
            throw new Error("Module must be instantiated using the new keyword");
        this[_module.ModuleName] = _module;
        // Return the module to allow method chaining
        return _module;
    }
};
class G10 {
    constructor() {
        this.EngineName = "G10";
        this.Modules = modules;
        // Show G10 Splash and initailize all G10 Classes
        console.log("");
        console.log("");
        console.log("  Powered By the G10 Engine");
        console.log("  http://g10.enprime.net");
        console.log("");
    }
    async Initialize() {
        // After app and G10 splashes, modify console logging
        await this.Modules.add(new ModifiedConsole_1.default()).initialize();
        console.log("G10", "Initializing...");
        // Synchronously Load every G10 Module to avoid conflicts
        try {
            // Load PluginManager module and initialize plugins
            console.log(this.EngineName, "Loading Plugins");
            await this.Modules.add(new PluginManager_1.default).loadPlugins();
            // Load WebServers Module
            console.log(this.EngineName, "Loading WebServer");
            await this.Modules.add(new WebServer_1.default).initialize();
            // Load ConsoleInterpreter Module and add G10 to repl context
            console.log(this.EngineName, "Initializing ConsoleInterpreter");
            (await this.Modules.add(new ConsoleInterpreter_1.default).initialize()).addContext("G10", this);
        }
        catch (e) {
            // Error Type Cast
            let ex = e;
            console.error("G10", `Encountered a fatal error Initializing. ${ex.stack}`);
        }
        return Promise.resolve(true);
    }
    static interface(module) {
    }
}
module.exports = G10;
//# sourceMappingURL=G10.js.map