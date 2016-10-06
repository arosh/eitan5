import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as colors from "material-ui/styles/colors";
// import MyAwesomeReactComponent from "./MyAwesomeReactComponent";
import WordEditor from "./WordEditor";
import WordTable from "./WordTable"

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.indigo500,
    accent1Color: colors.redA700,
  },
  fontFamily: "'Roboto', 'Noto Sans JP', 'sans-serif'",
});

const padding = {
  paddingLeft: "15px",
  paddingRight: "15px",
}

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="container" style={padding}>
        <WordEditor />
        <WordTable/>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);