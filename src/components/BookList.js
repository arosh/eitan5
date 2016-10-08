import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconAdd from 'material-ui/svg-icons/content/add-circle';

export default class BookList extends React.Component {

  render() {
    return (
      <Card>
        <CardTitle title="文献一覧" />
        <List>
          <ListItem leftIcon={<IconAdd />} primaryText="文献追加 (ポップアップ)" />
          <ListItem
            insetChildren
            primaryText="文献の名前"
            secondaryText="文献の著者名やURLなど"
          />
          <ListItem
            insetChildren
            primaryText="文献の名前"
            secondaryText="文献の著者名やURLなど"
          />
          <ListItem
            insetChildren
            primaryText="文献の名前"
            secondaryText="文献の著者名やURLなど"
          />
        </List>
      </Card>
    );
  }
}
