import React from 'react';
import MAppBar from 'material-ui/AppBar';
import store from '../Store';

const AppBar = () => (
    <MAppBar
      title="eitan5go"
      onLeftIconButtonTouchTap={() => store.updateDrawerOpen(true)}
      className="appbar-fixed-top"
    />
);

export default AppBar;
