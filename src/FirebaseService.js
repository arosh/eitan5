import EventEmitter from 'eventemitter3';

import * as firebase from 'firebase';
import store from './Store';
import { UPDATE_LOGGED } from './EventTypes';

class FirebaseService extends EventEmitter {
  constructor() {
    super();
    this.user = null;
  }

  isLogged() {
    return this.user !== null;
  }

  login() {
    this.user = {};
    this.emit(UPDATE_LOGGED);
  }

  logout() {
    this.user = null;
    this.emit(UPDATE_LOGGED);
  }
}

export default new FirebaseService();
