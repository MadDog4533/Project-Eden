"use strict";
class EdenPlugin {
    constructor() {
        // Required: onStart method (called by plugin loaded)
        // App initializtion logic and signals the plugin loader that the plugin is responding
        //
        // Default promise resolve functionality to keep
        // server from blocking just incase
        this.onStart = function () {
            return Promise.resolve(true);
        };
    }
}
module.exports = EdenPlugin;
//# sourceMappingURL=EdenPlugin.js.map