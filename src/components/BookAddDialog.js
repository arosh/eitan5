import * as React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import store from '../Store';
import { UPDATE_BOOK_ADD_DIALOG_OPEN } from '../EventTypes';

export default class BookAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    store.on(UPDATE_BOOK_ADD_DIALOG_OPEN, this.onOpenUpdate.bind(this));
  }

  requestClose() {
    store.updateBookAddDialogOpen(false);
  }

  onOpenUpdate() {
    const open = store.isBookAddDialogOpen();
    this.setState({ open });
  }

  render() {
    const actions = [
      <FlatButton
        label="キャンセル"
        onTouchTap={this.requestClose.bind(this)}
      />,
      <FlatButton
        label="追加"
        onTouchTap={this.requestClose.bind(this)}
        primary
      />,
    ];

    return (
      <Dialog
        title="文献の追加"
        open={this.state.open}
        actions={actions}
        onRequestClose={this.requestClose.bind(this)}
        modal
      >
        <TextField floatingLabelText="文献タイトル" multiLine fullWidth rows={1} />
        <TextField floatingLabelText="説明" multiLine fullWidth rows={2} />
      </Dialog>
    );
  }
}
