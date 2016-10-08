import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import Subheader from 'material-ui/Subheader';

export default class BookList extends React.Component {
  render() {
    return (
      <Card>
        <List>
          <Subheader>文献一覧</Subheader>
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
