import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import store from '../Store';
import firebaseService from '../FirebaseService';
import { UPDATE_LOGIN_DIALOG_OPEN } from '../EventTypes';

export default class LoginDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    store.on(UPDATE_LOGIN_DIALOG_OPEN, this.onLoginDialogOpenUpdated.bind(this));
  }

  onLoginDialogOpenUpdated() {
    const open = store.isLoginDialogOpen();
    this.setState({ open }, () => {
      if (open) {
        firebaseService.startUI();
        this.forceUpdate();
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="閉じる"
        onTouchTap={() => store.updateLoginDialogOpen(false)}
      />,
    ];

    return (
      <Dialog
        title="ログイン"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={() => store.updateLoginDialogOpen(false)}
      >
        <div className="firebaseui-auth" />
      </Dialog>
    );
  }
}
