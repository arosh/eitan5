import * as React from 'react';
import MicroContainer from 'react-micro-container';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import store from '../Store';
import { UPDATE_BOOK_ADD_DIALOG_OPEN } from '../EventTypes';

// Dialogの中でTextFieldを使うと問題が出る
// http://qiita.com/koizuss@github/items/ddd656cbafd888f179d6
// https://github.com/callemall/material-ui/issues/3394
const BookAddDialog = ({ dispatch, actions, open, title, description }) => (
  <Dialog
    title="文献の追加"
    open={open}
    actions={actions}
    onRequestClose={() => dispatch('closeDialog')}
    autoScrollBodyContent
    modal
  >
    <TextField
      floatingLabelText="文献タイトル（必須）"
      defaultValue={title}
      onChange={e => dispatch('changeTitle', e)}
      rows={1}
      fullWidth
      multiLine
    />
    <TextField
      floatingLabelText="説明"
      defaultValue={description}
      onChange={e => dispatch('changeDescription', e)}
      rows={2}
      fullWidth
      multiLine
    />
  </Dialog>
);

BookAddDialog.propTypes = {
  dispatch: React.PropTypes.func,
  actions: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  open: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};

export default class BookAddDialogContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    store.on(UPDATE_BOOK_ADD_DIALOG_OPEN, this.handleOpenUpdate, this);
    this.subscribe({
      changeTitle: this.handleTitleChange,
      changeDescription: this.handleDescriptionChange,
      closeDialog: this.closeDialog,
      createBook: this.createBook,
    });
  }

  componentWillUnmount() {
    store.off(UPDATE_BOOK_ADD_DIALOG_OPEN, this.handleOpenUpdate, this);
  }

  handleOpenUpdate() {
    const open = store.isBookAddDialogOpen();
    this.setState({
      open,
    });
  }

  closeDialog() {
    store.setBookAddDialogOpen(false);
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
    });
  }

  createBook() {
    const { title, description } = this.state;
    store.createBook(title, description).then((bookId) => {
      this.closeDialog();
      this.clearForm();
      this.context.router.transitionTo(`/books/${bookId}`);
    });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChange(e) {
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
        onTouchTap={() => this.dispatch('closeDialog')}
      />,
      <FlatButton
        label="追加"
        onTouchTap={() => this.dispatch('createBook')}
        disabled={!allowSubmittion}
        primary
      />,
    ];

    return (
      <BookAddDialog dispatch={this.dispatch} actions={actions} {...this.state} />
    );
  }
}

BookAddDialogContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
