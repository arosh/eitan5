import React from 'react';
import DrawerUI from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import store from "../Store";
import UPDATE_DRAWER_OPEN from "../EventTypes";

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: store.isDrawerOpen() };
        store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdate.bind(this));
    }

    render() {
        return (
            <DrawerUI open={this.state.open} docked={false} onRequestChange={ this.onRequestChange.bind(this) }>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </DrawerUI>
        );
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