import React from 'react';

import AppBar from "material-ui/AppBar";
import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {Card, CardText} from "material-ui/Card";
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    margin: ".25em",
};

const MyAwesomeReactComponent = () => (
    <div>
        <AppBar title="Title"/>
        <div className="container">
            <Badge badgeContent={4} primary={true}>
                <NotificationsIcon />
            </Badge>
            <Badge badgeContent={10} secondary={true} badgeStyle={{ top: 12, right: 12 }}>
                <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                </IconButton>
            </Badge>
            <FlatButton label="Default" />
            <FlatButton label="Primary" primary={true} />
            <FlatButton label="Secondary" secondary={true} />
            <FlatButton label="Disabled" disabled={true} />
            <br />
            <RaisedButton label="Default" style={styles} />
            <RaisedButton label="Primary" primary={true} style={styles} />
            <RaisedButton label="Secondary" secondary={true} style={styles} />
            <RaisedButton label="Disabled" disabled={true} style={styles} />
            <h1>H1</h1>
            <p>ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp ppppp</p>
            <TextField hintText="Hint text" />
            <br />
            <RaisedButton label="Default" />
            <br />
            <Card>
                <CardText>サンプルテキストです</CardText>
            </Card>
        </div>
    </div>
);

export default MyAwesomeReactComponent;