import React from 'react';

import Divider from 'material-ui/Divider';
import MDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconHome from 'material-ui/svg-icons/action/home';
import IconAddCircle from 'material-ui/svg-icons/content/add-circle';

import store from '../Store';
import { UPDATE_DRAWER_OPEN } from '../EventTypes';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: store.isDrawerOpen() };
    store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdated.bind(this));
  }

  render() {
    return (
      <MDrawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.requestDrawerOpenChange.bind(this)}
      >
        <MenuItem
          leftIcon={<IconHome />}
          onTouchTap={this.handleHomeClicked.bind(this)}
        >
          Home
        </MenuItem>
        <MenuItem
          leftIcon={<IconAddCircle />}
          onTouchTap={this.handleBookAddClicked.bind(this)}
        >
          文献追加
        </MenuItem>
        <Divider />
        <MenuItem onTouchTap={() => this.handleBookClicked(114514)}>文献1</MenuItem>
      </MDrawer>
    );
  }

  requestDrawerOpenChange(open) {
    store.updateDrawerOpen(open);
  }

  handleBookAddClicked() {
    store.updateDrawerOpen(false);
    store.updateBookAddDialogOpen(true);
  }

  handleBookClicked(bookId) {
    store.updateDrawerOpen(false);
    this.context.router.transitionTo(`/books/${bookId}`);
  }

  handleHomeClicked() {
    store.updateDrawerOpen(false);
    this.context.router.transitionTo('/');
  }

  onDrawerOpenUpdated() {
    const open = store.isDrawerOpen();
    this.setState({
      open,
    });
  }
}

Drawer.contextTypes = {
  router: React.PropTypes.object,
};
