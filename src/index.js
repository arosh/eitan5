import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as colors from "material-ui/styles/colors";
// import MyAwesomeReactComponent from "./MyAwesomeReactComponent";
import AppBar from "./components/AppBar";
import WordEditor from "./components/WordEditor";
import WordTable from "./components/WordTable";
import Drawer from "./components/Drawer";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.indigo500,
    accent1Color: colors.redA700,
  },
  fontFamily: "'Roboto', 'Noto Sans JP', 'sans-serif'",
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar/>
      <div className="container-fluid">
        <WordEditor />
        <WordTable/>
        <Drawer/>
      </div>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);