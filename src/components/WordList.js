import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import Subheader from 'material-ui/Subheader';

export default class WordList extends React.Component {
  render() {
    return (
            <Card>
                <List>
                    <Subheader>単語一覧</Subheader>
                    <ListItem leftIcon={<IconAdd />} primaryText="単語追加 (ポップアップ)" />
                    <ListItem insetChildren primaryText="単語" secondaryText="例文" />
                    <ListItem insetChildren primaryText="単語" secondaryText="例文" />
                    <ListItem insetChildren primaryText="単語" secondaryText="例文" />
                </List>
            </Card>
        );
  }
}
