import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const WordEditor = () => (
    <div>
        <div className="row middle-xs">
            <div className="col-md-10 col-sm-9 col-xs-12">
                <TextField floatingLabelText="例文" multiLine={true} fullWidth={true} rows={2}/>
            </div>
            <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
                <RaisedButton label="選択範囲をコピー"/>
            </div>
        </div>
        <div className="row middle-xs">
            <div className="col-md-5 col-sm-4 col-xs-12">
                <TextField floatingLabelText="単語" fullWidth={true}/>
            </div>
            <div className="col-md-5 col-sm-5 col-xs-12">
                <TextField floatingLabelText="答え" fullWidth={true}/>
            </div>
            <div className="col-md-2 col-sm-3 center-sm col-xs-12 end-xs">
                <RaisedButton label="追加" primary={true}/>
            </div>
        </div>
    </div>
);

export default WordEditor;