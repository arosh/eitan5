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
    store.on(UPDATE_DRAWER_OPEN, this.onDrawerOpenUpdate.bind(this));
  }

  render() {
    return (
      <MDrawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.onDrawerRequestChange.bind(this)}
      >
        <MenuItem
          leftIcon={<IconHome />}
          onTouchTap={this.onHomeTouchTap.bind(this)}
        >
          Home
        </MenuItem>
        <MenuItem
          leftIcon={<IconAddCircle />}
          onTouchTap={this.onBookAddTouchTap.bind(this)}
        >
          文献追加
        </MenuItem>
        <Divider />
        <MenuItem onTouchTap={() => this.onBookTouchTap(114514)}>文献1</MenuItem>
      </MDrawer>
    );
  }

  onBookAddTouchTap() {
    store.updateDrawerOpen(false);
    store.updateBookAddDialogOpen(true);
  }

  onDrawerRequestChange(open) {
    store.updateDrawerOpen(open);
  }

  onBookTouchTap(bookId) {
    store.updateDrawerOpen(false);
    this.context.router.transitionTo(`/book/${bookId}`);
  }

  onHomeTouchTap() {
    store.updateDrawerOpen(false);
    this.context.router.transitionTo('/');
  }

  onDrawerOpenUpdate() {
    const open = store.isDrawerOpen();
    this.setState({
      open,
    });
  }
}

Drawer.contextTypes = {
  router: React.PropTypes.object,
};
