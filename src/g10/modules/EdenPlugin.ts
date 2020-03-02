abstract class EdenPlugin {

    // Required: Plugin Name
    // Reference for debugging and returning instances
    abstract Name;

    // Required: onStart method (called by plugin loaded)
    // App initializtion logic and signals the plugin loader that the plugin is responding
    //
    // Default promise resolve functionality to keep
    // server from blocking just incase
    abstract onStart = function (): Promise<boolean> {
        return Promise.resolve(true);
    }
}


export = EdenPlugin;