import EventEmitter from 'eventemitter3';
import * as firebase from 'firebase';

import { UPDATE_LOGGED } from './EventTypes';
import store from './Store';

class FirebaseService extends EventEmitter {
  constructor() {
    super();
    // this.userをundefinedにすると不幸が起きる
    this.user = null;
    this.setupApp();
    this.setupAuthStateChanged();
  }

  setupApp() {
    const config = {
      apiKey: 'AIzaSyCkboz9C4mKfir9iFLomUw8w_aqg5JAYy0',
      authDomain: 'eitan5-555df.firebaseapp.com',
      databaseURL: 'https://eitan5-555df.firebaseio.com',
      storageBucket: 'eitan5-555df.appspot.com',
      messagingSenderId: '864017556445',
    };
    firebase.initializeApp(config);
  }

  setupAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      let oldUid = null;
      let newUid = null;
      if (this.user) {
        oldUid = this.user.uid;
      }
      if (user) {
        newUid = user.uid;
      }

      if (oldUid === newUid) {
        return;
      }

      this.user = user;
      this.emit(UPDATE_LOGGED);
    });
  }

  isLogged() {
    return this.user !== null;
  }

  signInWithGoogle() {
    // https://firebase.google.com/docs/auth/web/google-signin
    const provider = new firebase.auth.GoogleAuthProvider();
    // eslint-disable-next-line no-unused-vars
    firebase.auth().signInWithPopup(provider).then((result) => {
      store.updateSnackbar('ログインしました');
    }).catch((error) => {
      store.updateSnackbar(error.message);
    });
  }

  login(providerName) {
    if (providerName === 'Google') {
      this.signInWithGoogle();
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      store.updateSnackbar('ログアウトしました');
    }, (error) => {
      store.updateSnackbar(error.message);
    });
  }

  getUID() {
    return this.user.uid;
  }

  addBook(title, description) {
    const database = firebase.database();
    const uid = this.getUID();
    const key = database.ref('/books').push({
      uid,
      title,
      description,
    }).key;
    database.ref(`/users/${uid}/books`).push({
      title,
      description,
      bookId: key,
    });
    return key;
  }

  getBookPromise(bookId) {
    return firebase.database().ref(`/books/${bookId}`).once('value');
  }
}

export default new FirebaseService();
