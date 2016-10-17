import * as React from 'react';
import MicroContainer from 'react-micro-container';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import store from '../Store';

const WordEditor = props => (
  <div className="margin-top-1rem">
    <div className="row middle-xs">
      <div className="col-md-10 col-sm-9 col-xs-12">
        <TextField
          ref={props.setSentenceRef}
          value={props.sentence}
          onChange={e => props.dispatch('changeSentence', e)}
          floatingLabelText="例文"
          rows={2}
          multiLine
          fullWidth
        />
      </div>
      <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
        <RaisedButton
          onTouchTap={() => props.dispatch('copy')}
          label="選択範囲をコピー"
        />
      </div>
    </div>
    <div className="row middle-xs">
      <div className="col-md-5 col-sm-4 col-xs-12">
        <TextField
          value={props.word}
          onChange={e => props.dispatch('changeWord', e)}
          floatingLabelText="単語（必須）"
          fullWidth
        />
      </div>
      <div className="col-md-5 col-sm-5 col-xs-12">
        <TextField
          value={props.answer}
          onChange={e => props.dispatch('changeAnswer', e)}
          floatingLabelText="答え"
          fullWidth
        />
      </div>
      <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
        <RaisedButton
          disabled={!props.allowSubmittion}
          onTouchTap={() => props.dispatch('save')}
          label="追加"
          primary
        />
      </div>
    </div>
  </div>
);

WordEditor.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  sentence: React.PropTypes.string.isRequired,
  setSentenceRef: React.PropTypes.func.isRequired,
  word: React.PropTypes.string.isRequired,
  answer: React.PropTypes.string.isRequired,
  allowSubmittion: React.PropTypes.bool.isRequired,
};

export default class WordEditorContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      sentence: '',
      word: '',
      answer: '',
    };
  }

  componentDidMount() {
    this.subscribe({
      changeSentence: this.handleSentenceChanged,
      copy: this.handleCopyClicked,
      changeWord: this.handleWordChanged,
      changeAnswer: this.handleAnswerChanged,
      save: this.handleSaveClicked,
    });
  }

  handleCopyClicked() {
    const uniqueId = this.sentenceRef.uniqueId;
    const textarea = document.getElementById(uniqueId);
    const s = textarea.selectionStart;
    const e = textarea.selectionEnd;
    const subString = this.state.sentence.substring(s, e);
    this.setState({
      word: subString,
    });
  }

  handleSentenceChanged(e) {
    this.setState({
      sentence: e.target.value,
    });
  }

  handleWordChanged(e) {
    this.setState({
      word: e.target.value,
    });
  }

  handleAnswerChanged(e) {
    this.setState({
      answer: e.target.value,
    });
  }

  handleSaveClicked() {
    const { bookId } = this.props;
    const { word, answer, sentence } = this.state;
    store.createWord(bookId, word, answer, sentence, () => {
      this.setState({
        word: '',
        answer: '',
      });
    });
  }

  validate() {
    if (this.state.word === '') {
      return false;
    }
    return true;
  }

  render() {
    const allowSubmittion = this.validate();
    return (
      <WordEditor
        dispatch={this.dispatch}
        {...this.state}
        setSentenceRef={ref => this.sentenceRef = ref}
        allowSubmittion={allowSubmittion}
      />
    );
  }
}

WordEditorContainer.propTypes = {
  bookId: React.PropTypes.string.isRequired,
};
