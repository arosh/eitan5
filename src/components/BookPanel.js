import React from 'react';
import TextField from 'material-ui/TextField';
import Panel from './Panel';
import store from '../Store';

export default class BookPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: store.getBookTitle(),
      description: store.getBookDescription(),
    };
  }
  
  render() {
    return (
      <Panel heading="文献情報">
        <TextField
          value={this.state.title}
          onChange={this.handleTitleChanged.bind(this)}
          floatingLabelText="文献タイトル"
          multiLine
          fullWidth
          rows={1}
        />
        <TextField
          onChange={this.handleDescriptionChanged.bind(this)}
          value={this.state.description}
          floatingLabelText="説明"
          multiLine
          fullWidth
          rows={2}
        />
      </Panel>
    );
  }

  handleTitleChanged(e) {
    // 遅延Ajaxみたいなのが必要かも
    this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChanged(e) {
    // 遅延Ajaxみたいなのが必要かも
    this.setState({
      description: e.target.value,
    });
  }
}
