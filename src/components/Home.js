import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card} from 'material-ui/Card';
import IconList from 'material-ui/svg-icons/action/list';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import Subheader from 'material-ui/Subheader';

const Home = () => (
    <div>
        <div className="row">
            <div className="col-xs-12">
                <Card>
                    <List>
                        <Subheader>文献一覧</Subheader>
                        <ListItem leftIcon={<IconAdd/>} primaryText="文献追加 (ポップアップ)"/>
                        <ListItem insetChildren={true} primaryText="文献の名前" secondaryText="文献の著者名やURLなど"/>
                        <ListItem insetChildren={true} primaryText="文献の名前" secondaryText="文献の著者名やURLなど"/>
                        <ListItem insetChildren={true} primaryText="文献の名前" secondaryText="文献の著者名やURLなど"/>
                    </List>
                </Card>
            </div>
        </div>
        <div className="row margin-top-1rem">
            <div className="col-xs-12">
                <Card>
                    <List>
                        <Subheader>単語一覧</Subheader>
                        <ListItem leftIcon={<IconAdd/>} primaryText="単語追加 (ポップアップ)"/>
                        <ListItem insetChildren={true} primaryText="単語" secondaryText="例文"/>
                        <ListItem insetChildren={true} primaryText="単語" secondaryText="例文"/>
                        <ListItem insetChildren={true} primaryText="単語" secondaryText="例文"/>
                    </List>
                </Card>
            </div>
        </div>
    </div>
);

export default Home;