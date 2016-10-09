import React from 'react';

import MAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import store from '../Store';
import firebaseService from '../FirebaseService';
import { UPDATE_LOGGED } from '../EventTypes';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  onRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <FlatButton {...this.props} label="ログイン" onTouchTap={this.onTouchTap.bind(this)} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.onRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem
              primaryText="Sign in with Google"
              onTouchTap={() => this.login('Google')}
            />
          </Menu>
        </Popover>
      </div>
    );
  }

  login(providerName) {
    this.setState({ open: false });
    firebaseService.login(providerName);
  }
}

// https://github.com/callemall/material-ui/issues/5053
Login.muiName = 'FlatButton';

class Logged extends React.Component {
  render() {
    return (
      <FlatButton {...this.props} label="ログアウト" onTouchTap={this.onTouchTap.bind(this)} />
    );
  }

  onTouchTap() {
    firebaseService.logout();
  }
}

// https://github.com/callemall/material-ui/issues/5053
Logged.muiName = 'FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: firebaseService.isLogged(),
    };
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdate.bind(this));
  }

  onLoggedUpdate() {
    this.setState({
      logged: firebaseService.isLogged(),
    });
  }

  onTitleTouchTap() {
    this.context.router.transitionTo('/');
  }

  render() {
    return (
      <MAppBar
        title={<span style={styles.title}>eitan5</span>}
        onTitleTouchTap={this.onTitleTouchTap.bind(this)}
        onLeftIconButtonTouchTap={() => store.updateDrawerOpen(true)}
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
        className="appbar-fixed-top"
      />
    );
  }
}

AppBar.contextTypes = {
  router: React.PropTypes.object,
};
