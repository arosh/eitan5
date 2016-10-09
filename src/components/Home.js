import React from 'react';

import BookList from './BookList';
import WordList from './WordList';

import { UPDATE_LOGGED } from '../EventTypes';
import firebaseService from '../FirebaseService';

const Logged = () => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <BookList />
      </div>
    </div>
    <div className="row margin-top-1rem">
      <div className="col-xs-12">
        <WordList />
      </div>
    </div>
  </div>
);

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
    };
    firebaseService.on(UPDATE_LOGGED, this.onLoggedUpdated.bind(this));
  }

  render() {
    return this.state.logged ? <Logged /> : <Anonymous />;
  }

  onLoggedUpdated() {
    this.setState({
      logged: firebaseService.isLogged(),
    });
  }
}
