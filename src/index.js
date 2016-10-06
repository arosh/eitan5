import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as colors from "material-ui/styles/colors";
// import MyAwesomeReactComponent from "./MyAwesomeReactComponent";
import WordEditor from "./WordEditor";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.indigo500,
    accent1Color: colors.redA700,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="container">
      <WordEditor />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);