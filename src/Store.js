import EventEmitter from 'eventemitter3';
import { UPDATE_DRAWER_OPEN, UPDATE_BOOK_ADD_DIALOG_OPEN } from './EventTypes';

class Store extends EventEmitter {
  constructor() {
    super();
    this._isDrawerOpen = false;
    this._isBookAddDialogOpen = false;
  }
  updateDrawerOpen(open) {
    this._isDrawerOpen = open;
    this.emit(UPDATE_DRAWER_OPEN);
  }
  isDrawerOpen() {
    return this._isDrawerOpen;
  }
  updateBookAddDialogOpen(open) {
    this._isBookAddDialogOpen = open;
    this.emit(UPDATE_BOOK_ADD_DIALOG_OPEN);
  }
  isBookAddDialogOpen() {
    return this._isBookAddDialogOpen;
  }
}

export default new Store();
