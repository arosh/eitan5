import React from 'react';
import AppBarUI from 'material-ui/AppBar';
import store from "../Store";

const AppBar = () => (
    <AppBarUI title="Eitan5" onLeftIconButtonTouchTap={ () => store.updateDrawerOpen(true) }/>
);

export default AppBar;