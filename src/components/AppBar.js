import React from 'react';
import AppBarUI from 'material-ui/AppBar';
import store from "../Store";

const AppBar = () => (
    <AppBarUI title="eitan5go" onLeftIconButtonTouchTap={ () => store.updateDrawerOpen(true) }/>
);

export default AppBar;