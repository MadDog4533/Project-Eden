import * as fs from "fs";
import * as path from "path";

import { terminal as term } from "terminal-kit";

import EdenPlugin from "./EdenPlugin";
import G10Module from "../G10Module";

import util from "util";

import G10Settings from "../config/g10settings.json";

///
// TODO: Promisify fs readdir
// Dont break the program when one plugin throws error
///

export default class PluginManager extends G10Module {

    ModuleName = "PluginManager";
    ModuleStyle = term.magenta.underline;

    plugins: object
    constructor(){
        super();
        this.plugins = {};
    }

    initialize() {
        return Promise.resolve(true);
    }

    protected async loadPlugin(_plugin: string){

        // TODO: Implement to check export of Plugin

        try {
            // Bypass ECMA Module limitations of context from inline require of contextual file
            // Cast Plugin to its parent class
            let i_plugin: EdenPlugin = new (require(path.join(globalThis.App_Dir, "plugins", _plugin)))();
            // Call plugins onStart method with synchronous blocking
            await i_plugin.onStart();
            // Log that the plugin has successfully loaded and continue loading others
            console.info(`%${this.ModuleName}%`, term.magenta.underline, i_plugin.Name, "Loaded");
            
            // Decorator logic add to 
            if (i_plugin['instanceable'])
                this.plugins[i_plugin.Name] = i_plugin;

                return Promise.resolve();
        } catch (e){

            // Error Casting to expose ex properties
            let ex: Error = e;

            // PrintRecomendations to fix plugin

            
            // Log the error stack for Plugin Developer debugging
            term('-----------------------------------------------\n');
            console.error(`%${this.ModuleName}%`, this.ModuleStyle, "Failed to load plugin " + _plugin);
            term('-----------------------------------------------\n');
            console.error(`%${this.ModuleName}%`, this.ModuleStyle, ex.stack);
            term('-----------------------------------------------\n');
            term('Fix suggestion:\n')
            if (ex.message == "require(...) is not a constructor")
                term("Try exporting your plugin\n");

            term('-----------------------------------------------\n');

            if (G10Settings.Modules.PluginManager.Mode == "Strict")
                return Promise.reject(e);

            return Promise.resolve();
        }
    }

    protected async parseFiles(){
        try {
            let items = await readdir(path.join(globalThis.App_Dir, "plugins"));
            for (let i = 0; i < items.length; i++){
                let item = items[i];
                let item_stat = await stat(path.join(globalThis.App_Dir, "plugins", item));
                if (item_stat.isFile()){
                    if (path.extname(item) == ".js"){
                        await this.loadPlugin(item);
                    }
                }

                // Search directory
                if (item_stat.isDirectory()){
                    let t = await readdir(path.join(globalThis.App_Dir, "plugins", item));
                    // Find plugin configs and usage files
                    //if (t.forEach(item) => { parsePluginFile(item)});
                }
            }
            return Promise.resolve();
        } catch (e) {
            console.error(e.stack);
        }
    }

    public async loadPlugins(): Promise<void> {
        return new Promise((Resolve, Reject) => {
            this.parseFiles().then(Resolve);
        });
    }

    public getPlugin(Name: string): EdenPlugin {
        if (this.plugins[Name])
            return this.plugins[Name];

        throw new ReferenceError(`Plugin "${Name}" is not referenceable. 
        Add the @instanceable decorator to the class`);
    }
}

// Promisify fs items
// Manual interpretation

const readdir = util.promisify(fs.readdir);
const stat    = util.promisify(fs.stat);