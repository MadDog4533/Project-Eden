import G10Module from "../../G10Module";

import { terminal as term } from "terminal-kit";

import * as net from "net";
import G10 from "../../G10";

///
//  This G10 Module is an implementation of IMAP4 Protocol Standard
//  Latest RFC 8474 as of March 29th, 2020
///

export default class IMAP4 extends G10Module {
    ModuleName  = "IMAP4";
    ModuleStyle = term.black.underline;

    TCPServer: net.Server;

    ModuleSettings = (<G10> globalThis.G10).Config.Modules.IMAP4;
    ServerSettings = this.ModuleSettings.ServerSettings;
    
    constructor(){
        super();
        this.TCPServer = net.createServer();
    }

    initialize(): Promise<void> {
        return new Promise((Resolve, Reject) => {
            this.TCPServer.listen(this.ServerSettings.Port, () => {
                console.info(`%${this.ModuleName}%`, this.ModuleStyle, "Started IMAP4 Server Listener on " + (<net.AddressInfo> this.TCPServer.address()).port);
                Resolve();
            });
        });
    }
}