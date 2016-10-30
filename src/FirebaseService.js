import EventEmitter from 'eventemitter3';
import values from 'object.values';
import truncate from 'truncate';

import * as firebase from 'firebase';

import {
  UPDATE_LOGGED,
  UPDATE_BOOKS,
  UPDATE_RECENT_WORDS,
  UPDATE_WORDS,
} from './EventTypes';
import store from './Store';

class FirebaseService extends EventEmitter {
  constructor() {
    super();
    // this.userをundefinedにすると不幸が起きる
    this.user = null;
    this.setupApp();
    this.setupAuthStateChanged();
  }

  trace(e) {
    console.error(e.message);
    store.setSnackbarMessage(e.message);
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
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  setupAuthStateChanged() {
    this.auth.onAuthStateChanged((user) => {
      const oldId = this.user ? this.user.uid : null;
      const newId = user ? user.uid : null;
      if (oldId === newId) {
        return;
      }

      this.user = user;
      this.emit(UPDATE_LOGGED);

      if (oldId !== null) {
        firebase.database().ref(`/users/${oldId}`)
          .off('value', this.handleUserUpdated.bind(this));
      }

      if (newId !== null) {
        firebase.database().ref(`/users/${newId}`)
          .on('value', this.handleUserUpdated.bind(this));
      } else {
        this.handleUserUpdated(null);
      }
    });
  }

  isLogged() {
    return this.user !== null;
  }

  createProvider(providerName) {
    if (providerName === 'Google') {
      // https://firebase.google.com/docs/auth/web/google-signin
      return new firebase.auth.GoogleAuthProvider();
    } else if (providerName === 'Twitter') {
      // https://firebase.google.com/docs/auth/web/twitter-login
      return new firebase.auth.TwitterAuthProvider();
    }

    this.trace(`Cannot find provider: ${providerName}`);
    return null;
  }

  login(providerName) {
    const provider = this.createProvider(providerName);
    this.auth.signInWithPopup(provider)
    .then(() => {
      store.setSnackbarMessage('ログインしました');
    }, (error) => {
      this.trace(error);
    });
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        store.setSnackbarMessage('ログアウトしました');
      }, (error) => {
        this.trace(error);
      });
  }

  getUID() {
    return this.user.uid;
  }

  createBook(title, description) {
    const uid = this.getUID();
    let bookId = null;
    return this.database.ref('/books')
      .push({ uid, title, description })
      .then((ref) => {
        bookId = ref.key;
        return firebase.database().ref(`/users/${uid}/books/${bookId}`)
          .set({ title, description, bookId });
      })
      .then(() => {
        // 50とかにするとCloseボタンが消えてしまう
        store.setSnackbarMessage(`文献「${truncate(title, 40)}」を作成しました`);
        return bookId;
      }, (error) => {
        this.trace(error);
        return error;
      });
  }

  createWord(bookId, word, answer, sentence) {
    const uid = this.getUID();
    let wordId = null;
    return this.database.ref(`/books/${bookId}/words`)
      .push({ word, answer, sentence })
      .then((ref) => {
        wordId = ref.key;
        return this.database.ref(`/users/${uid}/recentWords/${wordId}`)
          .set({ word, answer, sentence, bookId, wordId });
      })
      .then(() => {
        store.setSnackbarMessage(`「${word}」を追加しました`);
        this.emit(UPDATE_WORDS);
        return wordId;
      }, (error) => {
        this.trace(error);
        return error;
      });
  }

  deleteBook(bookId) {
    return this.fetchBook(bookId).then((data) => {
      if (data.words.length > 0) {
        const message = '文献に含まれる単語を全て削除してください';
        store.setSnackbarMessage(message);
        return firebase.Promise.reject({ message });
      }
      const uid = this.getUID();
      return this.database.ref(`/books/${bookId}`).remove()
        .then(() => {
          const ref = this.database.ref(`/users/${uid}/books/${bookId}`);
          return ref.remove();
        })
        .then(() => {
          const { title } = data;
          // 50とかにするとCloseボタンが消えてしまう
          store.setSnackbarMessage(`文献「${truncate(title, 40)}」を削除しました`);
        }, (error) => {
          this.trace(error);
          return error;
        });
    });
  }

  fetchBook(bookId) {
    return this.database.ref(`/books/${bookId}`).once('value')
      .then((snapshot) => {
        const newData = snapshot.val();
        if (!newData.words) {
          newData.words = [];
        }
        const words = Object.keys(newData.words).map(key =>
          Object.assign({ wordId: key }, newData.words[key]));
        return {
          description: newData.description,
          title: newData.title,
          uid: newData.uid,
          words,
        };
      })
      .then((data) => {
        return data;
      }, (error) => {
        this.trace(error);
        return error;
      });
  }

  handleUserUpdated(snapshot) {
    if (snapshot && snapshot.child('books').exists()) {
      this.emit(UPDATE_BOOKS, values(snapshot.child('books').val()));
    } else {
      this.emit(UPDATE_BOOKS, []);
    }

    if (snapshot && snapshot.child('recentWords').exists()) {
      this.emit(UPDATE_RECENT_WORDS, values(snapshot.child('recentWords').val()));
    } else {
      this.emit(UPDATE_RECENT_WORDS, []);
    }
  }

  updateBook(bookId, title, description) {
    const uid = this.getUID();
    const updates = {};
    updates[`/books/${bookId}/title`] = title;
    updates[`/books/${bookId}/description`] = description;
    updates[`/users/${uid}/books/${bookId}/title`] = title;
    updates[`/users/${uid}/books/${bookId}/description`] = description;
    this.database.ref().update(updates)
      .then(() => {
        store.setSnackbarMessage('変更を保存しました');
      }, (error) => {
        this.trace(error);
      });
  }

  deleteWords(bookId, wordIds) {
    const uid = this.getUID();
    const promise = [];
    for (const wordId of wordIds) {
      let ref;

      ref = this.database.ref(`/books/${bookId}/words/${wordId}`);
      promise.push(ref.remove());

      ref = this.database.ref(`/users/${uid}/recentWords/${wordId}`);
      promise.push(ref.remove());
    }
    firebase.Promise.all(promise)
      .then(() => {
        store.setSnackbarMessage('単語を削除しました');
        this.emit(UPDATE_WORDS);
      }, (error) => {
        this.trace(error);
      });
  }
}

export default new FirebaseService();
