import * as http  from "http";
import * as https from "https";

import { terminal as term } from "terminal-kit";

import express from "express";
import G10Module from "../G10Module";
import G10 from "../G10";
import { AddressInfo } from "net";

import virtualhosts from "./WebServer/virtualhosts.json";


export default class WebServer extends G10Module {

    ModuleName = "WebServer";
    ModuleStyle = term.red.underline;
    ModuleSettings = (<G10> globalThis.G10).Config.Modules.WebServer;

    // Express App
    app: express.Application;


    constructor(){
        super();
        // Initialize both http and https webservers and bind them to an express app
        this.app = express();
    }

    initialize() {

        // Bind http[s] server request listener to express app
        const http_server = new http.Server(this.app);
        const https_server = new https.Server(this.app);

        // initialize() Promise resolver after bound http servers
        // Seprate Method 'bindServers'
        return new Promise(async (Resolve, Reject) => {
            http_server.listen(this.ModuleSettings.http.port, () => {
                console.info(`%${this.ModuleName}%`, this.ModuleStyle, "Started HTTP Server on " + (<AddressInfo> http_server.address()).port);
            });


            await this.registerHosts();
            Resolve();
        });
    }

    // App.use middleware attach to a subhost handler
    registerHosts(): Promise<void>{

        // Bound Top Domains
        Object.keys(virtualhosts).forEach((domain) => {
            // Select Top Domain example

            if (virtualhosts[domain].subdomains){
                Object.keys(virtualhosts[domain].subdomains).forEach((subdomain) => {
                    // Search futher down tree for extra subdomain
    
                    // Is this a listener subdomain?
                    if (virtualhosts[domain].subdomains[subdomain].index){
                        console.debug("Registering Middleware for " + subdomain + '.' + domain);
                        this.app.use(function(req, res, next) {
                            next();
                        });
                    }
                });
            }
        });

        return Promise.resolve();
    }
}


// How to tell if subdomain is valid listener, has an index file