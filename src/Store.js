import EventEmitter from 'eventemitter3';
import {
  UPDATE_DRAWER_OPEN,
  UPDATE_BOOK_ADD_DIALOG_OPEN,
  UPDATE_SNACKBAR,
  UPDATE_BOOKS,
  UPDATE_RECENT_WORDS,
} from './EventTypes';
import firebaseService from './FirebaseService';

class Store extends EventEmitter {
  constructor() {
    super();
    this.drawerOpen = false;
    this.bookAddDialogOpen = false;
    this.snackbarMessage = '';
    this.books = null;
    this.recentWords = null;
    firebaseService.on(UPDATE_BOOKS, this.onBooksUpdated.bind(this));
    firebaseService.on(UPDATE_RECENT_WORDS, this.onRecentWordsUpdated.bind(this));
  }

  setDrawerOpen(open) {
    this.drawerOpen = open;
    this.emit(UPDATE_DRAWER_OPEN);
  }

  isDrawerOpen() {
    return this.drawerOpen;
  }

  setBookAddDialogOpen(open) {
    this.bookAddDialogOpen = open;
    this.emit(UPDATE_BOOK_ADD_DIALOG_OPEN);
  }

  isBookAddDialogOpen() {
    return this.bookAddDialogOpen;
  }

  setSnackbarMessage(message) {
    this.snackbarMessage = message;
    this.emit(UPDATE_SNACKBAR);
  }

  getSnackbarMessage() {
    return this.snackbarMessage;
  }

  addBook(title, description, onSuccess) {
    firebaseService.addBook(title, description, onSuccess);
  }

  updateBook(bookId, title, description) {
    firebaseService.updateBook(bookId, title, description);
  }

  fetchBook(bookId) {
    return firebaseService.fetchBook(bookId);
  }

  onBooksUpdated(books) {
    this.books = books;
    this.emit(UPDATE_BOOKS);
  }

  getBooks() {
    return this.books;
  }

  addWord(bookId, word, answer, sentence, onSuccess) {
    firebaseService.addWord(bookId, word, answer, sentence, onSuccess);
  }

  onRecentWordsUpdated(recentWords) {
    this.recentWords = recentWords;
    this.emit(UPDATE_RECENT_WORDS);
  }

  getRecentWords() {
    return this.recentWords;
  }
}

export default new Store();
