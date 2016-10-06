import React from 'react';
import DrawerUI from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import store from "./Store";
import DRAWER_OPEN_UPDATE from "./EventTypes";

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: store.drawerOpen };
        store.on(DRAWER_OPEN_UPDATE, this.onOpenUpdate.bind(this));
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

    onOpenUpdate() {
        const open = store.drawerOpen;
        this.setState({
            open,
        });
    }
}