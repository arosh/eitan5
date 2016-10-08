import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import AppBar from './components/AppBar';
import WordEditor from './components/WordEditor';
import WordTable from './components/WordTable';
import Drawer from './components/Drawer';
import BookPanel from './components/BookPanel';
// import Home from "./components/Home";
import BookAddDialog from './components/BookAddDialog';

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
      <AppBar />
      <Drawer />
      <BookAddDialog />
      <div className="container container-fluid">
        <BookPanel />
        <WordEditor />
        <WordTable />
      </div>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
