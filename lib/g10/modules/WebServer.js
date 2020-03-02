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
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const terminal_kit_1 = require("terminal-kit");
const express_1 = __importDefault(require("express"));
const G10Module_1 = __importDefault(require("../G10Module"));
class WebServer extends G10Module_1.default {
    constructor() {
        super();
        this.ModuleName = "WebServer";
        this.ModuleStyle = terminal_kit_1.terminal.magenta.underline;
        // Initialize both http and https webservers and bind them to an express app
        this.app = express_1.default();
    }
    initialize() {
        const http_server = new http.Server(this.app);
        console.log(this.ModuleName, this.ModuleStyle, "Created an http listener");
        const https_server = new https.Server();
        console.log(this.ModuleName, this.ModuleStyle, "Created an https listener");
        http_server.listen(80);
        let appRouter = express_1.default.Router();
        this.app.use(appRouter);
        appRouter.all('*', function (req, res, next) {
            res.send('Done');
            console.debug(req.host);
        });
        return Promise.resolve(true);
    }
}
exports.default = WebServer;
//# sourceMappingURL=WebServer.js.map