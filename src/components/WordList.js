import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

class WordItems extends React.Component {
  transitionTo(bookId) {
    this.context.router.transitionTo(`/books/${bookId}`);
  }

  render() {
    if (this.props.words.length === 0) {
      return <ListItem primaryText="登録された単語はありません" />;
    }

    const items = this.props.words.map(word => (
      <ListItem
        key={word.wordId}
        primaryText={word.word}
        secondaryText={word.answer}
        onTouchTap={() => this.transitionTo(word.bookId)}
      />
    ));

    return <div>{items}</div>;
  }
}

WordItems.propTypes = {
  words: React.PropTypes.arrayOf(React.PropTypes.object),
};

WordItems.contextTypes = {
  router: React.PropTypes.object,
};

export default class WordList extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title="単語一覧" />
        <List>
          <WordItems words={this.props.words} />
        </List>
      </Card>
    );
  }
}

WordList.propTypes = {
  words: React.PropTypes.arrayOf(React.PropTypes.object),
};
