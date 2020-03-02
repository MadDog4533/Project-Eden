"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const EdenPlugin_1 = __importDefault(require("../g10/modules/EdenPlugin"));
const Decorators_1 = require("../g10/modules/Decorators");
const fs = __importStar(require("fs"));
let MakeFile = class MakeFile extends EdenPlugin_1.default {
    constructor() {
        super();
        this.Name = "MakeFile";
        // Make sure to Promise Resolve after all operations are completed
        this.onStart = function () {
            fs.mkdir(__dirname + '/' + this.Name, console.log);
            fs.writeFile(`${__dirname}/${this.Name}/config.json`, '{}', console.log);
            return new Promise((Resolve, reject) => { setTimeout(() => { Resolve(true); }, 3000); });
            //setTimeout(() => { return Promise.resolve(true)}, 3000);
        };
    }
};
MakeFile = __decorate([
    Decorators_1.instanceable
], MakeFile);
module.exports = MakeFile;
//# sourceMappingURL=MakeFile.js.map