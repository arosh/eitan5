import EventEmitter from 'eventemitter3';
import {
  UPDATE_DRAWER_OPEN,
  UPDATE_BOOK_ADD_DIALOG_OPEN,
  UPDATE_SNACKBAR,
  UPDATE_BOOKS,
} from './EventTypes';
import firebaseService from './FirebaseService';

class Store extends EventEmitter {
  constructor() {
    super();
    this.drawerOpen = false;
    this.bookAddDialogOpen = false;
    this.snackbarMessage = '';
    this.books = [];
    firebaseService.on(UPDATE_BOOKS, this.onBooksUpdated.bind(this));
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

  addBook(title, description) {
    const bookId = firebaseService.addBook(title, description);
    return bookId;
  }

  updateBook(bookId, title, description) {
    firebaseService.updateBook(bookId, title, description);
  }

  getBookPromise(bookId) {
    return firebaseService.getBookPromise(bookId);
  }

  onBooksUpdated(books) {
    this.books = books;
    this.emit(UPDATE_BOOKS);
  }

  getBooks() {
    return this.books;
  }
}

export default new Store();
