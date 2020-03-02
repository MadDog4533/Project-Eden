"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Decorators_1 = require("../g10/modules/Decorators");
const EdenPlugin = require("../g10/modules/EdenPlugin");
let Logger = class Logger extends EdenPlugin {
    constructor() {
        super();
        this.Name = "Logger";
        this.onStart = function () {
            //this.checkCreate();
            for (let i = 0; i < process.argv.length; i++) {
                if (process.argv[i] == "--out" && process.argv[i + 1] != undefined) {
                    console.log("Logger", "Output file: " + process.argv[i + 1]);
                }
            }
            return Promise.resolve(true);
        };
    }
};
Logger = __decorate([
    Decorators_1.instanceable
], Logger);
module.exports = Logger;
//# sourceMappingURL=Logger.js.map