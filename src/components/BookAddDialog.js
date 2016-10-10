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
      title: '',
      description: '',
    };
    store.on(UPDATE_BOOK_ADD_DIALOG_OPEN, this.onOpenUpdate.bind(this));
  }

  requestClose() {
    store.setBookAddDialogOpen(false);
  }

  requestSave() {
    const { title, description } = this.state;
    store.addBook(title, description, (bookId) => {
      this.requestClose();
      this.clearForm();
      this.context.router.transitionTo(`/books/${bookId}`);
    });
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
    });
  }

  onOpenUpdate() {
    const open = store.isBookAddDialogOpen();
    this.setState({ open });
  }

  handleTitleChanged(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChanged(e) {
    this.setState({
      description: e.target.value,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="キャンセル"
        onTouchTap={this.requestClose.bind(this)}
      />,
      <FlatButton
        label="追加"
        onTouchTap={this.requestSave.bind(this)}
        primary
      />,
    ];

    return (
      <Dialog
        title="文献の追加"
        open={this.state.open}
        actions={actions}
        onRequestClose={this.requestClose.bind(this)}
        autoScrollBodyContent
        modal
      >
        <TextField
          floatingLabelText="文献タイトル"
          value={this.state.title}
          onChange={this.handleTitleChanged.bind(this)}
          rows={1}
          fullWidth
          multiLine
        />
        <TextField
          floatingLabelText="説明"
          value={this.state.description}
          onChange={this.handleDescriptionChanged.bind(this)}
          rows={2}
          fullWidth
          multiLine
        />
      </Dialog>
    );
  }
}

BookAddDialog.contextTypes = {
  router: React.PropTypes.object,
};
