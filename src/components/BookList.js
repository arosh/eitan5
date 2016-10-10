import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconAdd from 'material-ui/svg-icons/content/add-circle';

import store from '../Store';

export default class BookList extends React.Component {
  render() {
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
            onTouchTap={this.handleBookAddClicked.bind(this)}
          />
          <div>
            {bookItems}
          </div>
        </List>
      </Card>
    );
  }

  handleBookAddClicked() {
    store.setBookAddDialogOpen(true);
  }

  handleBookClicked(bookId) {
    store.setDrawerOpen(false);
    this.context.router.transitionTo(`/books/${bookId}`);
  }
}

BookList.contextTypes = {
  router: React.PropTypes.object,
};
