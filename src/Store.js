import EventEmitter from "eventemitter3";
import DRAWER_OPEN_UPDATE from "./EventTypes";

class Store extends EventEmitter {
    constructor() {
        super();
        this.drawerOpen = false;
    }
    updateDrawerOpen(open) {
        this.drawerOpen = open;
        this.emit(DRAWER_OPEN_UPDATE);
    }
}

export default new Store();