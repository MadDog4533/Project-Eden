// G10 Module imports
import PluginManager from "./modules/PluginManager";
import WebServer from "./modules/WebServer";
import ModifiedConsole from "./modules/ModifiedConsole";
import ConsoleInterpreter from "./modules/ConsoleInterpreter";
import IMAP4 from "./modules/IMAP4/IMAP4";
import EdenSQL from "./modules/EdenSql";

// Generic Module Import base class of all modules
import G10Module = require("./G10Module");

import G10Settings from "./config/g10settings.json";


// How to cast G10 instance for autocomplete
// (<G10> globalThis.G10).property
// (<G10> globalThis.G10).method()
// (<G10> globalThis.G10).interface("PluginManager") // Remove Comments


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

    Config = G10Settings;

    constructor(){
        // Show G10 Splash and initailize all G10 Classes
        console.log("")
        console.log("");
        console.log("  Powered By the G10 Engine");
        console.log("  http://g10.enprime.net");
        console.log("");

        // Required to fetch G10 instance for Module instancing
        globalThis.G10 = this;
    }

    public async Initialize(): Promise<boolean>{

        // After app and G10 splashes, modify console logging
        await this.Modules.add(new ModifiedConsole()).initialize();

        console.info("G10", "Initializing...");
        
        // Move to dedicated method and check config for enabled modules
        // Synchronously Load every G10 Module to avoid conflicts
        try {
        
            // Load PluginManager module and initialize plugins
            console.info(this.EngineName, "Loading Plugins");
            await (<PluginManager> this.Modules.add(new PluginManager)).loadPlugins();

            // Load WebServers Module
            console.info(this.EngineName, "Loading WebServer");
            await (<WebServer> this.Modules.add(new WebServer)).initialize();

            // Load IMAP4 Server
            console.info(this.EngineName, "Starting IMAP4 Server");
            await (<IMAP4> this.Modules.add(new IMAP4)).initialize();

            // Load ConsoleInterpreter Module and add G10 to repl context
            console.info(this.EngineName, "Initializing ConsoleInterpreter");
            (await (<ConsoleInterpreter> this.Modules.add(new ConsoleInterpreter)).initialize()).addContext("G10", this);

            // Start the SQL Module and create the connection
            console.info(this.EngineName, "Creating Database Connection")
            await (<EdenSQL> this.Modules.add(new EdenSQL)).initialize();

        } catch (e) {
            // Error Type Cast
            let ex: Error = e;
            console.error("G10", `Encountered a fatal error Initializing. ${ex.stack}`);
        }
        return Promise.resolve(true);
    }

    interface(_module: string): G10Module {
        return this.Modules[_module];
    }
}

namespace G10 {} 
export = G10;