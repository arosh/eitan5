import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Panel from './Panel';

const BookPanel = ({ title, description, onTitleChange, onDescriptionChange }) => (
  <Panel heading="文献情報">
    <TextField
      value={title}
      onChange={onTitleChange}
      floatingLabelText="文献タイトル"
      multiLine
      fullWidth
      rows={1}
    />
    <TextField
      value={description}
      onChange={onDescriptionChange}
      floatingLabelText="説明"
      multiLine
      fullWidth
      rows={2}
    />
    <div className="end-xs margin-top-1rem">
      <RaisedButton
        label="変更を保存"
        primary
      />
    </div>
  </Panel>
);

export default BookPanel;
