import React from 'react';
import MAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import store from '../Store';
import { UPDATE_LOGGED } from '../EventTypes';

class Login extends React.Component {
  render() {
    return (
      <FlatButton {...this.props} label="ログイン" onTouchTap={this.onTouchTap.bind(this)} />
    );
  }
  onTouchTap() {
    store.login();
    alert('ログインボタンを押しました');
  }
}

// ↓と{...this.props}を付けるとテーマが反映される
Login.muiName = 'FlatButton';

class Logged extends React.Component {
  render() {
    return (
      <FlatButton {...this.props} label="ログアウト" onTouchTap={this.onTouchTap.bind(this)} />
    );
  }
  onTouchTap() {
    store.logout();
    alert('ログアウトボタンを押しました');
  }
}

// ↓と{...this.props}を付けるとテーマが反映される
Logged.muiName = 'FlatButton';

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: store.isLogged(),
    };
    store.on(UPDATE_LOGGED, this.onLoggedUpdate.bind(this));
  }

  onLoggedUpdate() {
    this.setState({
      logged: store.isLogged(),
    });
  }

  render() {
    return (
      <MAppBar
        title="eitan5go"
        onLeftIconButtonTouchTap={() => store.updateDrawerOpen(true)}
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
        className="appbar-fixed-top"
      />
    );
  }
}
