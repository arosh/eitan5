import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconAdd from 'material-ui/svg-icons/content/add-circle';

export default class WordList extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title="単語一覧" />
        <List>
          <ListItem leftIcon={<IconAdd />} primaryText="単語追加 (ポップアップ)" />
          <ListItem insetChildren primaryText="単語" secondaryText="例文" />
          <ListItem insetChildren primaryText="単語" secondaryText="例文" />
          <ListItem insetChildren primaryText="単語" secondaryText="例文" />
        </List>
      </Card>
    );
  }
}
