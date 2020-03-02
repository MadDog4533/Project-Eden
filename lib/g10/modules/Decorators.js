"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function override() {
    return function (target, propertyKey, descriptor) {
        console.log(descriptor);
    };
}
exports.override = override;
function instanceable(constructorFunction) {
    constructorFunction.prototype.instanceable = true;
}
exports.instanceable = instanceable;
//# sourceMappingURL=Decorators.js.map