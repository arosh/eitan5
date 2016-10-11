import React from 'react';

import BookPanel from './BookPanel';
import WordEditor from './WordEditor';
import WordTable from './WordTable';
import Loading from './Loading';

import store from '../Store';
import { UPDATE_WORDS } from '../EventTypes';

const BookPaneOn = props => (
  <div>
    <BookPanel {...props} />
    <WordEditor {...props} />
    <WordTable {...props} />
  </div>
);

export default class BookPage extends React.Component {
  constructor(props) {
    super(props);
    const bookId = this.props.params.bookId;
    this.fetchBook(bookId);
  }

  componentDidMount() {
    store.on(UPDATE_WORDS, this.onBookUpdated, this);
  }

  componentWillReceiveProps(nextProps) {
    const nextBookId = nextProps.params.bookId;
    if (this.props.params.bookId !== nextBookId) {
      this.fetchBook(nextBookId);
    }
  }

  componentWillUnmount() {
    store.off(UPDATE_WORDS, this.onBookUpdated, this);
  }

  onBookUpdated() {
    this.fetchBook(this.props.params.bookId);
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

  updateBook() {
    store.updateBook(
      this.props.params.bookId,
      this.state.title,
      this.state.description);
  }

  fetchBook(bookId) {
    store.fetchBook(bookId, (book) => {
      this.setState({
        title: book.title,
        description: book.description,
        words: book.words,
      });
    });
  }

  render() {
    if (!this.state) {
      return <Loading />;
    }
    return (<BookPaneOn
      bookId={this.props.params.bookId}
      title={this.state.title}
      description={this.state.description}
      onTitleChange={this.handleTitleChanged.bind(this)}
      onDescriptionChange={this.handleDescriptionChanged.bind(this)}
      onSaveBookClick={this.updateBook.bind(this)}
      words={this.state.words}
    />);
  }
}

BookPage.propTypes = {
  params: React.PropTypes.shape({
    bookId: React.PropTypes.string,
  }),
};
