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
  }

  componentDidMount() {
    store.on(UPDATE_BOOK_ADD_DIALOG_OPEN, this.onOpenUpdated, this);
  }

  componentWillUnmount() {
    store.off(UPDATE_BOOK_ADD_DIALOG_OPEN, this.onOpenUpdated, this);
  }

  onOpenUpdated() {
    const open = store.isBookAddDialogOpen();
    this.setState({
      open,
    });
  }

  closeDialog() {
    store.setBookAddDialogOpen(false);
  }

  createBook() {
    const { title, description } = this.state;
    store.createBook(title, description, (bookId) => {
      this.closeDialog();
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

  validate() {
    if (this.state.title === '') {
      return false;
    }
    return true;
  }

  render() {
    const allowSubmittion = this.validate();

    const actions = [
      <FlatButton
        label="キャンセル"
        onTouchTap={this.closeDialog.bind(this)}
      />,
      <FlatButton
        label="追加"
        onTouchTap={this.createBook.bind(this)}
        disabled={!allowSubmittion}
        primary
      />,
    ];

    return (
      <Dialog
        title="文献の追加"
        open={this.state.open}
        actions={actions}
        onRequestClose={this.closeDialog.bind(this)}
        autoScrollBodyContent
        modal
      >
        <TextField
          floatingLabelText="文献タイトル（必須）"
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
