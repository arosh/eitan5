import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const padding = {
    paddingLeft: "15px",
    paddingRight: "15px",
}

const Editor = () => (
    <div style={padding}>
        <div className="row middle-xs">
            <div className="col-sm-10 col-xs-12">
                <TextField floatingLabelText="Sentence" multiLine={true} fullWidth={true} rows={2}/>
            </div>
            <div className="col-sm-2 start-sm col-xs-12 end-xs">
                <RaisedButton label="消去"/>
            </div>
        </div>
        <div className="row middle-xs">
            <div className="col-sm-5 col-xs-12">
                <TextField floatingLabelText="Question" fullWidth={true}/>
            </div>
            <div className="col-sm-5 col-xs-12">
                <TextField floatingLabelText="Answer" fullWidth={true}/>
            </div>
            <div className="col-sm-2 start-sm col-xs-12 end-xs">
                <RaisedButton label="追加" primary={true}/>
            </div>
        </div>
    </div>
);

export default Editor;