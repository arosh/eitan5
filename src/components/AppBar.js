import React from 'react';

import MAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import store from '../Store';
import firebaseService from '../FirebaseService';
import { UPDATE_LOGGED } from '../EventTypes';

class Login extends React.Component {
  render() {
    return (
      <FlatButton {...this.props} label="ログイン" onTouchTap={this.onTouchTap.bind(this)} />
    );
  }
  onTouchTap() {
    store.updateLoginDialogOpen(true);
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
    alert('ログアウトボタンを押しました');
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
    console.log(firebaseService.user);
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
