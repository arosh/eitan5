import * as React from 'react';

import truncate from 'truncate';

import Divider from 'material-ui/Divider';
import MDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconHome from 'material-ui/svg-icons/action/home';
import IconAddCircle from 'material-ui/svg-icons/content/add-circle';

import store from '../Store';
import firebaseService from '../FirebaseService';
import {
  UPDATE_DRAWER_OPEN,
  UPDATE_BOOKS,
  UPDATE_LOGGED,
} from '../EventTypes';

const BookItems = ({ books, transitionToBook }) => {
  // 文字数の29には特に根拠はないが，パッと見ではちょうど良さそう
  const bookItems = books.map(book =>
    <MenuItem
      key={book.bookId}
      onTouchTap={() => transitionToBook(book.bookId)}
    >
      {truncate(book.title, 29)}
    </MenuItem>
  );
  return <div>{bookItems}</div>;
};

BookItems.propTypes = {
  books: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  transitionToBook: React.PropTypes.func.isRequired,
};

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: store.isDrawerOpen(),
      books: store.getBooks() || [],
      logged: false,
    };
  }

  componentDidMount() {
    store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdated, this);
    store.on(UPDATE_BOOKS, this.onBooksUpdated, this);
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  componentWillUnmount() {
    store.off(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdated, this);
    store.off(UPDATE_BOOKS, this.onBooksUpdated, this);
    firebaseService.off(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  onDrawerOpenUpdated() {
    const open = store.isDrawerOpen();
    this.setState({
      open,
    });
  }

  onBooksUpdated() {
    const books = store.getBooks();
    this.setState({
      books,
    });
  }

  onLoggedUpdated() {
    this.setState({
      logged: firebaseService.isLogged(),
    });
  }

  setDrawerOpen(open) {
    store.setDrawerOpen(open);
  }

  closeDrawer() {
    store.setDrawerOpen(false);
  }

  openBookAddDialog() {
    this.closeDrawer();
    store.setBookAddDialogOpen(true);
  }

  transitionToBook(bookId) {
    this.closeDrawer();
    this.context.router.transitionTo(`/books/${bookId}`);
  }

  transitionToHome() {
    this.closeDrawer();
    this.context.router.transitionTo('/');
  }

  render() {
    return (
      <MDrawer
        open={this.state.open}
        docked={false}
        onRequestChange={open => this.setDrawerOpen(open)}
      >
        <MenuItem
          leftIcon={<IconHome />}
          onTouchTap={() => this.transitionToHome()}
        >
          Home
        </MenuItem>
        {this.state.logged ?
          <MenuItem
            leftIcon={<IconAddCircle />}
            onTouchTap={() => this.openBookAddDialog()}
          >
            文献追加
          </MenuItem> : null}
        <Divider />
        <BookItems
          books={this.state.books}
          transitionToBook={bookId => this.transitionToBook(bookId)}
        />
      </MDrawer>
    );
  }
}

Drawer.contextTypes = {
  router: React.PropTypes.object,
};
