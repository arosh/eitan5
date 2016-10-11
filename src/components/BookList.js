import React from 'react';

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

  deleteItem(bookId) {
    store.deleteBook(bookId, () => {});
  }

  render() {
    // 削除ボタンを付ける方法
    // rightIconButton={<RemoveButton onTouchTap={() => this.deleteItem(book.bookId)} />}
    // 単語を0にしないと消せないようにする
    const bookItems = this.props.books.map(book =>
      <ListItem
        key={book.bookId}
        primaryText={book.title}
        secondaryText={book.description}
        onTouchTap={() => this.handleBookClicked(book.bookId)}
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
