import React from 'react';

import MSnackbar from 'material-ui/Snackbar';

import store from '../Store';
import { UPDATE_SNACKBAR } from '../EventTypes';

export default class Snackbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
    };
    store.on(UPDATE_SNACKBAR, this.onUpdateSnackbar.bind(this));
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  onUpdateSnackbar() {
    const message = store.getSnackbarMessage();
    this.setState({
      open: true,
      message,
    });
  }

  render() {
    return (
      <MSnackbar
        open={this.state.open}
        message={this.state.message}
        action="Close"
        autoHideDuration={4000}
        onActionTouchTap={this.handleRequestClose.bind(this)}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    );
  }
}
