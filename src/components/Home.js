import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';

const marginStyle = {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
};

const Home = () => (
    <div>
        <div className="row">
            <div className="col-sm-4 col-sm-offset-2 col-xs-12">
                <RaisedButton label="文献追加" primary={true} fullWidth={true} style={marginStyle}/>
            </div>
            <div className="col-sm-4 col-xs-12">
                <RaisedButton label="単語一覧" fullWidth={true} style={marginStyle}/>
            </div>
        </div>
        <div className="row" style={marginStyle}>
            <div className="col-xs-12">
                <Card>
                    <List>
                        <Subheader style={{fontSize: "20px"}}>文献一覧</Subheader>
                        <ListItem primaryText="Title" secondaryText="ppppp ppppp ppppp"/>
                        <ListItem primaryText="Title" secondaryText="ppppp ppppp ppppp"/>
                        <ListItem primaryText="Title" secondaryText="ppppp ppppp ppppp"/>
                    </List>
                </Card>
            </div>
        </div>
    </div>
);

export default Home;