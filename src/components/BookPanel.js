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
        primary
      />
    </div>
  </Panel>
);

export default BookPanel;
