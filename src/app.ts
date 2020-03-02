// Main Node Modules
import * as process from "process";

// G10 Modules
import G10 from "./g10/G10";

// App config file
import app_config from "./config/app.json";

// App Usage configuration file
import AppUsage from "./usage.json";

// Set the global directory for easier pathing
global.App_Dir = __dirname;

const env = process.env;

function splash(){
    console.log(`  Project ${env.npm_package_name} 
          build ${env.npm_package_version}`);
    console.log(``);
    console.log(`  Developed by ${env.npm_package_author_name}`);
    console.log(`  In Association with ${env.npm_package_author_url}`);
    console.log(``);
}

// Main calling logic for the app
function main(){
    checkArgs(process.argv);
    splash();
    var G10_Engine = new G10();
    G10_Engine.Initialize();
}

function checkArgs(args: Array<string>): void{
    console.log(args);
    for (let i = 0; i < args.length; i++){
        if (args[i] == "--inspect") {
            app_config.options.ReadEvaluate.Allowed = true;
        }
    }
}

function printUsage(){
    console.log(AppUsage.main.usage);
    for (let i = 0; i < Object.keys(AppUsage.plugins).length; i++){
        let plugin = Object.keys(AppUsage.plugins)[i];
        console.log(plugin);
    }
}

main();