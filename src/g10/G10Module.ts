import G10 = require("./G10");
abstract class G10Module {
    abstract ModuleName;
    abstract ModuleStyle;
    abstract initialize(): Promise<any>;
}

export = G10Module;