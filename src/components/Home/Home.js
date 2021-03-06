import * as React from 'react';

import BookList from './BookList';
import WordList from './WordList';
import Loading from '../Loading';

import { UPDATE_LOGGED, UPDATE_BOOKS, UPDATE_RECENT_WORDS } from '../../EventTypes';
import firebaseService from '../../FirebaseService';
import store from '../../Store';

const Logged = ({ books, words }) => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <BookList books={books} />
      </div>
    </div>
    <div className="row margin-top-1rem">
      <div className="col-xs-12">
        <WordList words={words} />
      </div>
    </div>
  </div>
);

Logged.propTypes = {
  books: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  words: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const Anonymous = () => (
  <div>
    単語帳アプリです。
  </div>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: firebaseService.isLogged(),
      books: store.getBooks(),
      recentWords: store.getRecentWords(),
    };
  }

  componentDidMount() {
    store.on(UPDATE_BOOKS, this.onBooksUpdated, this);
    store.on(UPDATE_RECENT_WORDS, this.onRecentWordsUpdated, this);
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  componentWillUnmount() {
    store.off(UPDATE_BOOKS, this.onBooksUpdated, this);
    store.off(UPDATE_RECENT_WORDS, this.onRecentWordsUpdated, this);
    firebaseService.off(UPDATE_LOGGED, this.onLoggedUpdated, this);
  }

  onLoggedUpdated() {
    this.setState({
      logged: firebaseService.isLogged(),
    });
  }

  onBooksUpdated() {
    const books = store.getBooks();
    this.setState({
      books,
    });
  }

  onRecentWordsUpdated() {
    this.setState({
      recentWords: store.getRecentWords(),
    });
  }

  render() {
    if (!this.state.logged) {
      return <Anonymous />;
    }
    if (this.state.books === null || this.state.recentWords === null) {
      return <Loading />;
    }
    return <Logged books={this.state.books} words={this.state.recentWords} />;
  }
}
