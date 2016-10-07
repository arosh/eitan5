import EventEmitter from "eventemitter3";
import UPDATE_DRAWER_OPEN from "./EventTypes";

class Store extends EventEmitter {
    constructor() {
        super();
        this._isDrawerOpen = false;
    }
    updateDrawerOpen(open) {
        this._isDrawerOpen = open;
        this.emit(UPDATE_DRAWER_OPEN);
    }
    isDrawerOpen() {
        return this._isDrawerOpen;
    }
}

export default new Store();