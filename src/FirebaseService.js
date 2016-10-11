import EventEmitter from 'eventemitter3';
import values from 'object.values';
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

  signInWithGoogle() {
    // https://firebase.google.com/docs/auth/web/google-signin
    const provider = new firebase.auth.GoogleAuthProvider();
    // eslint-disable-next-line no-unused-vars
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        store.setSnackbarMessage('ログインしました');
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }

  login(providerName) {
    if (providerName === 'Google') {
      this.signInWithGoogle();
    }
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        store.setSnackbarMessage('ログアウトしました');
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }

  getUID() {
    return this.user.uid;
  }

  createBook(title, description, onSuccess) {
    const uid = this.getUID();
    let bookId = null;
    firebase.database().ref('/books')
      .push({ uid, title, description })
      .then((ref) => {
        bookId = ref.key;
        return firebase.database().ref(`/users/${uid}/books/${bookId}`)
          .set({ title, description, bookId });
      })
      .then(() => {
        store.setSnackbarMessage(`文献「${title}」を作成しました`);
        onSuccess(bookId);
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }

  createWord(bookId, word, answer, sentence, onSuccess) {
    const uid = this.getUID();
    let wordId = null;
    firebase.database().ref(`/books/${bookId}/words`)
      .push({ word, answer, sentence })
      .then((ref) => {
        wordId = ref.key;
        return firebase.database().ref(`/users/${uid}/recentWords/${wordId}`)
          .set({ word, answer, sentence, bookId, wordId });
      })
      .then(() => {
        store.setSnackbarMessage(`「${word}」を追加しました`);
        onSuccess(wordId);
        this.emit(UPDATE_WORDS);
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }

  deleteBook(bookId, onSuccess) {
    this.fetchBook(bookId, (data) => {
      if (data.words.length > 0) {
        store.setSnackbarMessage('文献に含まれる単語を全て削除してください');
        return;
      }
      const uid = this.getUID();
      firebase.database().ref(`/books/${bookId}`).remove()
        .then(() => {
          return firebase.database().ref(`/users/${uid}/books/${bookId}`).remove();
        })
        .then(() => {
          store.setSnackbarMessage(`文献「${data.title}」を削除しました`);
          if (typeof onSuccess === 'function') {
            onSuccess();
          }
        }, (error) => {
          store.setSnackbarMessage(error.message);
        });
    });
  }

  fetchBook(bookId, onSuccess) {
    firebase.database().ref(`/books/${bookId}`).once('value')
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
        onSuccess(data);
      }, (error) => {
        store.setSnackbarMessage(error.message);
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
    firebase.database().ref().update(updates)
      .then(() => {
        store.setSnackbarMessage('変更を保存しました');
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }

  deleteWords(bookId, wordIds) {
    const uid = this.getUID();
    const promise = [];
    for (const wordId of wordIds) {
      promise.push(firebase.database()
        .ref(`/books/${bookId}/words/${wordId}`).remove());
      promise.push(firebase.database()
        .ref(`/users/${uid}/recentWords/${wordId}`).remove());
    }
    firebase.Promise.all(promise)
      .then(() => {
        store.setSnackbarMessage('単語を削除しました');
        this.emit(UPDATE_WORDS);
      }, (error) => {
        store.setSnackbarMessage(error.message);
      });
  }
}

export default new FirebaseService();
