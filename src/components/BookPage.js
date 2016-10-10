import React from 'react';

import BookPanel from './BookPanel';
import WordEditor from './WordEditor';
import WordTable from './WordTable';
import Loading from './Loading';

import store from '../Store';

const BookPaneOn = props => (
  <div>
    <BookPanel {...props} />
    <WordEditor bookId={props.bookId} />
    <WordTable bookId={props.bookId} />
  </div>
);

BookPaneOn.propTypes = {
  bookId: React.PropTypes.string,
};

export default class BookPage extends React.Component {
  constructor(props) {
    super(props);
    const bookId = this.props.params.bookId;
    this.fetchBook(bookId);
  }

  componentWillReceiveProps(nextProps) {
    const nextBookId = nextProps.params.bookId;
    if (this.props.params.bookId !== nextBookId) {
      this.fetchBook(nextBookId);
    }
  }

  render() {
    if (!this.state) {
      return <Loading />;
    }
    return (<BookPaneOn
      bookId={this.props.params.bookId}
      title={this.state.bookTitle}
      description={this.state.bookDescription}
      onTitleChange={this.handleBookTitleChanged.bind(this)}
      onDescriptionChange={this.handleBookDescriptionChanged.bind(this)}
      onSaveBookClick={this.handleSaveBookClicked.bind(this)}
    />);
  }

  handleBookTitleChanged(e) {
    this.setState({
      bookTitle: e.target.value,
    });
  }

  handleBookDescriptionChanged(e) {
    this.setState({
      bookDescription: e.target.value,
    });
  }

  handleSaveBookClicked() {
    store.updateBook(
      this.props.params.bookId,
      this.state.bookTitle,
      this.state.bookDescription);
  }

  fetchBook(bookId) {
    store.fetchBook(bookId).then((snapshot) => {
      const book = snapshot.val();
      this.setState({
        bookTitle: book.title,
        bookDescription: book.description,
      });
    });
  }
}
