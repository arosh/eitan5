import React from 'react';

import BookPanel from './BookPanel';
import WordEditor from './WordEditor';
import WordTable from './WordTable';

import store from '../Store';

export default class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: '',
      bookDescription: '',
    };

    store.getBookPromise(props.params.bookId).then((snapshot) => {
      const book = snapshot.val();
      this.setState({
        bookTitle: book.title,
        bookDescription: book.description,
      });
    });
  }

  render() {
    return (
      <div>
        <BookPanel
          title={this.state.bookTitle}
          description={this.state.bookDescription}
          onTitleChange={this.handleBookTitleChanged.bind(this)}
          onDescriptionChange={this.handleBookDescriptionChanged.bind(this)}
        />
        <WordEditor />
        <WordTable />
      </div>
    );
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
}
