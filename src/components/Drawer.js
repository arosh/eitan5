import React from 'react';
import MDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconHome from 'material-ui/svg-icons/action/home';
import IconAddCircle from 'material-ui/svg-icons/content/add-circle';
import Divider from 'material-ui/Divider';
import store from "../Store";
import {UPDATE_DRAWER_OPEN} from "../EventTypes";

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: store.isDrawerOpen() };
        store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdate.bind(this));
    }

    render() {
        return (
            <MDrawer open={this.state.open} docked={false} onRequestChange={ this.onRequestChange.bind(this) }>
                <MenuItem leftIcon={<IconHome/>}>Home</MenuItem>
                <MenuItem leftIcon={<IconAddCircle/>} onTouchTap={ this.onBookAddClick.bind(this) }>文献追加</MenuItem>
                <MenuItem leftIcon={<IconAddCircle/>}>単語追加</MenuItem>
                <Divider/>
                <MenuItem>文献の名前</MenuItem>
            </MDrawer>
        );
    }

    onBookAddClick() {
        store.updateBookAddDialogOpen(true);
        store.updateDrawerOpen(false);
    }

    onRequestChange(open) {
        store.updateDrawerOpen(open);
    }

    onDrawerOpenUpdate() {
        const open = store.isDrawerOpen();
        this.setState({
            open,
        });
    }
}