import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

export default class WordList extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title="単語一覧" />
        <List>
          <ListItem primaryText="単語" secondaryText="例文" />
          <ListItem primaryText="単語" secondaryText="例文" />
          <ListItem primaryText="単語" secondaryText="例文" />
        </List>
      </Card>
    );
  }
}
