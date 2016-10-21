import * as React from 'react';
import Link from 'react-router/Link';

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

  openPopover(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  closePopover() {
    this.setState({
      open: false,
    });
  }

  login(providerName) {
    this.setState({ open: false });
    firebaseService.login(providerName);
  }

  render() {
    return (
      <div>
        <FlatButton {...this.props} label="ログイン" onTouchTap={() => this.openPopover()} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={() => this.closePopover()}
        >
          <Menu>
            <MenuItem
              primaryText="Sign in with Google"
              onTouchTap={() => this.login('Google')}
            />
            <MenuItem
              primaryText="Sign in with Twitter"
              onTouchTap={() => this.login('Twitter')}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

// https://github.com/callemall/material-ui/issues/5053
Login.muiName = 'FlatButton';

class Logged extends React.Component {
  logout() {
    firebaseService.logout();
    this.context.router.transitionTo('/');
  }

  render() {
    return (
      <FlatButton {...this.props} label="ログアウト" onTouchTap={() => this.logout()} />
    );
  }
}

// https://github.com/callemall/material-ui/issues/5053
Logged.muiName = 'FlatButton';

Logged.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const styles = {
  appbar: {
    top: 0,
    position: 'fixed',
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
};

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: firebaseService.isLogged(),
    };
  }

  componentDidMount() {
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  componentWillUnmount() {
    firebaseService.off(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  onLoggedUpdated() {
    this.setState({
      logged: firebaseService.isLogged(),
    });
  }

  render() {
    return (
      <MAppBar
        title={<Link to="/" style={styles.link}>eitan5</Link>}
        onLeftIconButtonTouchTap={() => store.setDrawerOpen(true)}
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
        style={styles.appbar}
      />
    );
  }
}
