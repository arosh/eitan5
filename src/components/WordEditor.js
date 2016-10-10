import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import store from '../Store';

export default class WordEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: '',
      word: '',
      answer: '',
      allowSubmittion: false,
    };
  }

  render() {
    return (
      <div>
        <div className="row middle-xs">
          <div className="col-md-10 col-sm-9 col-xs-12">
            <TextField
              ref={ref => this.sentenceRef = ref}
              value={this.state.sentence}
              onChange={this.handleSentenceChanged.bind(this)}
              floatingLabelText="例文"
              multiLine
              fullWidth
              rows={2}
            />
          </div>
          <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
            <RaisedButton
              label="選択範囲をコピー"
              onTouchTap={this.handleCopyClicked.bind(this)}
            />
          </div>
        </div>
        <div className="row middle-xs">
          <div className="col-md-5 col-sm-4 col-xs-12">
            <TextField
              value={this.state.word}
              onChange={this.handleWordChanged.bind(this)}
              floatingLabelText="単語"
              fullWidth
            />
          </div>
          <div className="col-md-5 col-sm-5 col-xs-12">
            <TextField
              value={this.state.answer}
              onChange={this.handleAnswerChanged.bind(this)}
              floatingLabelText="答え"
              fullWidth
            />
          </div>
          <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
            <RaisedButton
              label="追加"
              onTouchTap={this.handleSaveClicked.bind(this)}
              disabled={!this.state.allowSubmittion}
              primary
            />
          </div>
        </div>
      </div>
    );
  }

  handleCopyClicked() {
    const uniqueId = this.sentenceRef.uniqueId;
    const textarea = document.getElementById(uniqueId);
    const s = textarea.selectionStart;
    const e = textarea.selectionEnd;
    const subString = this.state.sentence.substring(s, e);
    this.setState({
      word: subString,
    }, () => {
      this.validate();
    });
  }

  handleSentenceChanged(e) {
    this.setState({
      sentence: e.target.value,
    }, () => {
      this.validate();
    });
  }

  handleWordChanged(e) {
    this.setState({
      word: e.target.value,
    }, () => {
      this.validate();
    });
  }

  handleAnswerChanged(e) {
    this.setState({
      answer: e.target.value,
    }, () => {
      this.validate();
    });
  }

  handleSaveClicked() {
    const { bookId } = this.props;
    const { word, answer, sentence } = this.state;
    store.addWord(bookId, word, answer, sentence, () => {
      this.setState({
        word: '',
        answer: '',
      }, () => {
        this.validate();
      });
    });
  }

  validate() {
    if (this.state.word === '') {
      this.setState({
        allowSubmittion: false,
      });
      return;
    }
    this.setState({
      allowSubmittion: true,
    });
  }
}

WordEditor.propTypes = {
  bookId: React.PropTypes.string,
};
