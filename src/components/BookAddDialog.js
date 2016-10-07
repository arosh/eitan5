import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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

  handleOpen() {
    store.updateBookAddDialogOpen(true);
  }

  handleClose() {
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
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="追加"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    return (
            <Dialog
              title="文献の追加"
              actions={actions}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
                <TextField floatingLabelText="文献タイトル" multiLine fullWidth rows={2} />
                <TextField floatingLabelText="説明" multiLine fullWidth rows={2} />
            </Dialog>
        );
  }
}
