import EventEmitter from 'eventemitter3';
import { UPDATE_DRAWER_OPEN, UPDATE_BOOK_ADD_DIALOG_OPEN, UPDATE_SNACKBAR } from './EventTypes';
import firebaseService from './FirebaseService';

class Store extends EventEmitter {
  constructor() {
    super();
    this.drawerOpen = false;
    this.bookAddDialogOpen = false;
    this.loginDialogOpen = false;
    this.snackbarMessage = '';
    this.bookTitle = 'The use of MMR, diversity-based reranking for reordering documents and producing summaries';
    this.bookDescription = 'Carbonell, J. and Goldstein, J., Proc. ACM SIGIR (1998)';
  }

  updateDrawerOpen(open) {
    this.drawerOpen = open;
    this.emit(UPDATE_DRAWER_OPEN);
  }

  isDrawerOpen() {
    return this.drawerOpen;
  }

  updateBookAddDialogOpen(open) {
    this.bookAddDialogOpen = open;
    this.emit(UPDATE_BOOK_ADD_DIALOG_OPEN);
  }

  isBookAddDialogOpen() {
    return this.bookAddDialogOpen;
  }

  updateSnackbar(message) {
    this.snackbarMessage = message;
    this.emit(UPDATE_SNACKBAR);
  }

  getSnackbarMessage() {
    return this.snackbarMessage;
  }

  getBookTitle() {
    return this.bookTitle;
  }

  getBookDescription() {
    return this.bookDescription;
  }

  addBook(title, description) {
    const bookId = firebaseService.addBook(title, description);
    return bookId;
  }
}

export default new Store();
