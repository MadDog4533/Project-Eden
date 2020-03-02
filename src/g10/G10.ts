import PluginManager from "./modules/PluginManager";
import WebServer from "./modules/WebServer";
import ModifiedConsole from "./modules/ModifiedConsole";
import ConsoleInterpreter from "./modules/ConsoleInterpreter";
import G10Module = require("./G10Module");

// Module add prototype
// Cast to explicit module type for better chaining
var modules = {
    add: function(_module: G10Module){
        // Prevent JS interpretation from assigning non instantiated Module
        if (!_module.ModuleName)
            throw new Error("Module must be instantiated using the new keyword");

        this[_module.ModuleName] = _module;

        // Return the module to allow method chaining
        return _module;
    }
};

class G10 {

    EngineName = "G10";

    Modules = modules;

    running: boolean;

    constructor(){
        // Show G10 Splash and initailize all G10 Classes
        console.log("")
        console.log("");
        console.log("  Powered By the G10 Engine");
        console.log("  http://g10.enprime.net");
        console.log("");
    }

    public async Initialize(): Promise<boolean>{

        // After app and G10 splashes, modify console logging
        await this.Modules.add(new ModifiedConsole()).initialize();

        console.log("G10", "Initializing...");
        

        // Synchronously Load every G10 Module to avoid conflicts
        try {
        
            // Load PluginManager module and initialize plugins
            console.log(this.EngineName, "Loading Plugins");
            await (<PluginManager> this.Modules.add(new PluginManager)).loadPlugins();

            // Load WebServers Module
            console.log(this.EngineName, "Loading WebServer");
            await (<WebServer> this.Modules.add(new WebServer)).initialize();

            // Load ConsoleInterpreter Module and add G10 to repl context
            console.log(this.EngineName, "Initializing ConsoleInterpreter");
            (await (<ConsoleInterpreter> this.Modules.add(new ConsoleInterpreter)).initialize()).addContext("G10", this);
        } catch (e) {
            // Error Type Cast
            let ex: Error = e;
            console.error("G10", `Encountered a fatal error Initializing. ${ex.stack}`);
        }
        return Promise.resolve(true);
    }

    static interface(module: string){
    }
}

namespace G10 {}
export = G10;