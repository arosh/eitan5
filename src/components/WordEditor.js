import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class WordEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: '',
      word: '',
      answer: '',
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
              onChange={e => this.setState({ sentence: e.target.value })}
              floatingLabelText="例文"
              multiLine
              fullWidth
              rows={2}
            />
          </div>
          <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
            <RaisedButton
              label="選択範囲をコピー"
              onTouchTap={this.onCopySelectionClick.bind(this)}
            />
          </div>
        </div>
        <div className="row middle-xs">
          <div className="col-md-5 col-sm-4 col-xs-12">
            <TextField
              value={this.state.word}
              floatingLabelText="単語"
              fullWidth
            />
          </div>
          <div className="col-md-5 col-sm-5 col-xs-12">
            <TextField
              value={this.state.answer}
              floatingLabelText="答え"
              fullWidth
            />
          </div>
          <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
            <RaisedButton label="追加" primary />
          </div>
        </div>
      </div>
    );
  }

  onCopySelectionClick() {
    const uniqueId = this.sentenceRef.uniqueId;
    const textarea = document.getElementById(uniqueId);
    const s = textarea.selectionStart;
    const e = textarea.selectionEnd;
    const subString = this.state.sentence.substring(s, e);
    this.setState({
      word: subString,
    });
  }
}
