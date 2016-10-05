import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <RaisedButton label="Default" />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);