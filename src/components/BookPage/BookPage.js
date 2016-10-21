import * as React from 'react';
import MicroContainer from 'react-micro-container';

import BookPanel from './BookPanel';
import WordEditor from './WordEditor';
import WordTable from './WordTable';
import Loading from '../Loading';

import store from '../../Store';
import { UPDATE_WORDS } from '../../EventTypes';

const BookPaneOn = ({ dispatch, bookId, title, description, words }) => (
  <div>
    <BookPanel
      title={title}
      description={description}
      onTitleChange={e => dispatch('changeTitle', e)}
      onDescriptionChange={e => dispatch('changeDescription', e)}
      onSaveBookClick={() => dispatch('save')}
    />
    <WordEditor bookId={bookId} />
    <WordTable bookId={bookId} words={words} />
  </div>
);

BookPaneOn.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  bookId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  words: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default class BookPage extends MicroContainer {
  constructor(props) {
    super(props);
    const bookId = this.props.params.bookId;
    this.fetch(bookId);
  }

  componentDidMount() {
    store.on(UPDATE_WORDS, this.handleBookUpdate, this);
    this.subscribe({
      changeTitle: this.handleTitleChange,
      changeDescription: this.handleDescriptionChange,
      save: this.save,
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextBookId = nextProps.params.bookId;
    if (this.props.params.bookId !== nextBookId) {
      this.fetch(nextBookId);
    }
  }

  componentWillUnmount() {
    store.off(UPDATE_WORDS, this.handleBookUpdate, this);
  }

  handleBookUpdate() {
    this.fetch(this.props.params.bookId);
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

  save() {
    store.updateBook(
      this.props.params.bookId,
      this.state.title,
      this.state.description);
  }

  fetch(bookId) {
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
      dispatch={this.dispatch}
      bookId={this.props.params.bookId}
      {...this.state}
    />);
  }
}

BookPage.propTypes = {
  params: React.PropTypes.shape({
    bookId: React.PropTypes.string,
  }).isRequired,
};
