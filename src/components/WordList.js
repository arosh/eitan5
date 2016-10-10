import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

class WordItems extends React.Component {
  render() {
    if (this.props.words.length === 0) {
      return <ListItem primaryText="登録された単語はありません" />;
    }

    return this.props.words.map(word => (
      <ListItem
        key={word.wordId}
        primaryText={word.word}
        secondaryText={word.answer}
      />
    ));
  }
}

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
