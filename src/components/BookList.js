import * as React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import store from '../Store';

const RemoveButton = props => (
  <IconButton {...props}><IconClear /></IconButton>
);

RemoveButton.muiName = 'IconButton';

export default class BookList extends React.Component {
  openBookAddDialog() {
    store.setBookAddDialogOpen(true);
  }

  handleBookClicked(bookId) {
    store.setDrawerOpen(false);
    this.context.router.transitionTo(`/books/${bookId}`);
  }

  deleteItem(bookId, title) {
    if (confirm(`文献「${title}」を削除してもよろしいですか？`)) {
      store.deleteBook(bookId);
    }
  }

  render() {
    const bookItems = this.props.books.map(book =>
      <ListItem
        key={book.bookId}
        primaryText={book.title}
        secondaryText={book.description}
        onTouchTap={() => this.handleBookClicked(book.bookId)}
        rightIconButton={
          <RemoveButton
            onTouchTap={() => this.deleteItem(book.bookId, book.title)}
          />}
        insetChildren
      />
    );

    return (
      <Card>
        <CardTitle title="文献一覧" />
        <List>
          <ListItem
            leftIcon={<IconAdd />}
            primaryText="文献追加"
            onTouchTap={this.openBookAddDialog.bind(this)}
          />
          <div>
            {bookItems}
          </div>
        </List>
      </Card>
    );
  }
}

BookList.propTypes = {
  books: React.PropTypes.arrayOf(React.PropTypes.object),
};

BookList.contextTypes = {
  router: React.PropTypes.object,
};
