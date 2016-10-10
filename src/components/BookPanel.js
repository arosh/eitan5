import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Panel from './Panel';

const BookPanel = ({ title, description, onTitleChange, onDescriptionChange, onSaveBookClick }) => (
  <Panel heading="文献情報">
    <TextField
      value={title}
      onChange={onTitleChange}
      floatingLabelText="文献タイトル"
      rows={1}
      multiLine
      fullWidth
    />
    <TextField
      value={description}
      onChange={onDescriptionChange}
      floatingLabelText="説明"
      rows={2}
      multiLine
      fullWidth
    />
    <div className="end-xs margin-top-1rem">
      <RaisedButton
        label="変更を保存"
        onTouchTap={onSaveBookClick}
        primary
      />
    </div>
  </Panel>
);

BookPanel.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  onTitleChange: React.PropTypes.func,
  onDescriptionChange: React.PropTypes.func,
  onSaveBookClick: React.PropTypes.func,
};

export default BookPanel;
