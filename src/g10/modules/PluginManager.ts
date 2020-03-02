import * as fs from "fs";
import * as path from "path";

import { terminal as term } from "terminal-kit";

import EdenPlugin from "./EdenPlugin";
import G10Module from "../G10Module";

import util from "util";
import { promises, resolve } from "dns";

///
// TODO: Promisify fs readdir
///

export default class PluginManager extends G10Module {

    ModuleName = "PluginManager";
    ModuleStyle = term.cyan.underline;

    plugins: object
    constructor(){
        super();
        this.plugins = {};
    }

    initialize() {
        return Promise.resolve(true);
    }

    protected async loadPlugin(_plugin: string){
        try {
            // Bypass ECMA Module limitations of context from inline require of contextual file
            // Cast Plugin to its parent class
            let i_plugin: EdenPlugin = new (require(path.join(global.App_Dir, "plugins", _plugin)))();
            // Call plugins onStart method with synchronous blocking
            await i_plugin.onStart();
            // Log that the plugin has successfully loaded and continue loading others
            console.log(`%${this.ModuleName}%`, term.magenta.underline, i_plugin.Name, "Loaded");
            
            // Decorator logic add to 
            if (i_plugin['instanceable'])
                this.plugins[i_plugin.Name] = i_plugin;

                return Promise.resolve();
        } catch (e){
            // Error Casting to expose ex properties
            let ex: Error = e;
            // Log the error stack for Plugin Developer debugging
            console.error(this.ModuleName, ex.stack);

            return Promise.reject(e);
        }
    }

    protected async parseFiles(){
        try {
            let items = await readdir(path.join(global.App_Dir, "plugins"));
            for (let i = 0; i < items.length; i++){
                let item = items[i];
                let item_stat = await stat(path.join(global.App_Dir, "plugins", item));
                if (item_stat.isFile()){
                    if (path.extname(item) == ".js"){
                        await this.loadPlugin(item);
                    }
                }

                // Search directory
                if (item_stat.isDirectory()){
                    let t = await readdir(path.join(global.App_Dir, "plugins", item));
                    // Find plugin configs and usage files
                    //if (t.forEach(item) => { parsePluginFile(item)});
                }
            }
            return Promise.resolve();
        } catch (e) {
            console.error(e.stack);
            return Promise.reject(e);
        }
    }

    public async loadPlugins(): Promise<void> {
        return new Promise((Resolve, Reject) => {
            this.parseFiles().then(Resolve).catch(Reject);
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