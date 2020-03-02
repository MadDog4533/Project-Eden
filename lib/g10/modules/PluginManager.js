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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const terminal_kit_1 = require("terminal-kit");
const G10Module_1 = __importDefault(require("../G10Module"));
const util_1 = __importDefault(require("util"));
///
// TODO: Promisify fs readdir
///
class PluginManager extends G10Module_1.default {
    constructor() {
        super();
        this.ModuleName = "PluginManager";
        this.ModuleStyle = terminal_kit_1.terminal.cyan.underline;
        this.plugins = {};
    }
    initialize() {
        return Promise.resolve(true);
    }
    async loadPlugin(_plugin) {
        try {
            // Bypass ECMA Module limitations of context from inline require of contextual file
            // Cast Plugin to its parent class
            let i_plugin = new (require(path.join(global.App_Dir, "plugins", _plugin)))();
            // Call plugins onStart method with synchronous blocking
            await i_plugin.onStart();
            // Log that the plugin has successfully loaded and continue loading others
            console.log(`%${this.ModuleName}%`, terminal_kit_1.terminal.magenta.underline, i_plugin.Name, "Loaded");
            // Decorator logic add to 
            if (i_plugin['instanceable'])
                this.plugins[i_plugin.Name] = i_plugin;
            return Promise.resolve();
        }
        catch (e) {
            // Error Casting to expose ex properties
            let ex = e;
            // Log the error stack for Plugin Developer debugging
            console.error(this.ModuleName, ex.stack);
            return Promise.reject(e);
        }
    }
    async parseFiles() {
        try {
            let items = await readdir(path.join(global.App_Dir, "plugins"));
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let item_stat = await stat(path.join(global.App_Dir, "plugins", item));
                if (item_stat.isFile()) {
                    if (path.extname(item) == ".js") {
                        await this.loadPlugin(item);
                    }
                }
                // Search directory
                if (item_stat.isDirectory()) {
                    let t = await readdir(path.join(global.App_Dir, "plugins", item));
                    // Find plugin configs and usage files
                    //if (t.forEach(item) => { parsePluginFile(item)});
                }
            }
            return Promise.resolve();
        }
        catch (e) {
            console.error(e.stack);
            return Promise.reject(e);
        }
    }
    async loadPlugins() {
        return new Promise((Resolve, Reject) => {
            this.parseFiles().then(Resolve).catch(Reject);
        });
    }
    getPlugin(Name) {
        if (this.plugins[Name])
            return this.plugins[Name];
        throw new ReferenceError(`Plugin "${Name}" is not referenceable. 
        Add the @instanceable decorator to the class`);
    }
}
exports.default = PluginManager;
// Promisify fs items
// Manual interpretation
const readdir = util_1.default.promisify(fs.readdir);
const stat = util_1.default.promisify(fs.stat);
//# sourceMappingURL=PluginManager.js.map