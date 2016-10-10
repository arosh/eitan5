import React from 'react';

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

class BookItems extends React.Component {
  render() {
    const bookItems = this.props.books.map(book =>
      <MenuItem
        key={book.bookId}
        onTouchTap={() => this.props.handleBookClicked(book.bookId)}
      >
        {book.title}
      </MenuItem>
    );
    return <div>{ bookItems }</div>;
  }
}

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: store.isDrawerOpen(),
      books: store.getBooks() || [],
      logged: false,
    };
    store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdated.bind(this));
    store.on(UPDATE_BOOKS, this.onBooksUpdated.bind(this));
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdated.bind(this));
  }

  render() {
    return (
      <MDrawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.requestDrawerOpenChange.bind(this)}
      >
        <MenuItem
          leftIcon={<IconHome />}
          onTouchTap={this.handleHomeClicked.bind(this)}
        >
          Home
        </MenuItem>
        {this.state.logged ?
          <MenuItem
            leftIcon={<IconAddCircle />}
            onTouchTap={this.handleBookAddClicked.bind(this)}
          >
            文献追加
          </MenuItem> : <div />}
        <Divider />
        <BookItems
          books={this.state.books}
          handleBookClicked={this.handleBookClicked.bind(this)}
        />
      </MDrawer>
    );
  }

  requestDrawerOpenChange(open) {
    store.setDrawerOpen(open);
  }

  handleBookAddClicked() {
    store.setDrawerOpen(false);
    store.setBookAddDialogOpen(true);
  }

  handleBookClicked(bookId) {
    store.setDrawerOpen(false);
    this.context.router.transitionTo(`/books/${bookId}`);
  }

  handleHomeClicked() {
    store.setDrawerOpen(false);
    this.context.router.transitionTo('/');
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
}

Drawer.contextTypes = {
  router: React.PropTypes.object,
};
