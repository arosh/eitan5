import * as React from 'react';

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
  }

  componentDidMount() {
    store.on(UPDATE_SNACKBAR, this.onMessageUpdated, this);
  }

  componentWillUnmount() {
    store.off(UPDATE_SNACKBAR, this.onMessageUpdated, this);
  }

  onMessageUpdated() {
    const message = store.getSnackbarMessage();
    this.setState({
      open: true,
      message,
    });
  }

  closeSnackbar() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <MSnackbar
        open={this.state.open}
        message={this.state.message}
        action="Close"
        autoHideDuration={4000}
        onActionTouchTap={this.closeSnackbar.bind(this)}
        onRequestClose={this.closeSnackbar.bind(this)}
      />
    );
  }
}
