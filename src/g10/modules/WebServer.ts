import * as http  from "http";
import * as https from "https";

import { terminal as term } from "terminal-kit";

import express from "express";
import G10Module from "../G10Module";


export default class WebServer extends G10Module {

    ModuleName = "WebServer";
    ModuleStyle = term.magenta.underline;
    app: express.Application;
    constructor(){
        super();
        // Initialize both http and https webservers and bind them to an express app
        this.app = express();
    }

    initialize() {
        const http_server = new http.Server(this.app);
        console.log(this.ModuleName, this.ModuleStyle, "Created an http listener");
        const https_server = new https.Server();
        console.log(this.ModuleName, this.ModuleStyle, "Created an https listener");
        http_server.listen(80);
        let appRouter = express.Router();
        this.app.use(appRouter);
        appRouter.all('*', function (req, res, next) {
            res.send('Done');
            console.debug(req.host);
        });
        return Promise.resolve(true);
    }
}