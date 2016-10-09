import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Match } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';

import AppBar from './components/AppBar';
import BookAddDialog from './components/BookAddDialog';
import BookPanel from './components/BookPanel';
import Drawer from './components/Drawer';
import Home from './components/Home';
import LoginDialog from './components/LoginDialog';
import WordEditor from './components/WordEditor';
import WordTable from './components/WordTable';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.indigo500,
    accent1Color: colors.redA700,
  },
  fontFamily: "'Roboto', 'Noto Sans JP', 'sans-serif'",
});

const WordAdd = () => (
  <div>
    <BookPanel />
    <WordEditor />
    <WordTable />
  </div>
);

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
      <div>
        <AppBar />
        <Drawer />
        <BookAddDialog />
        <LoginDialog />
        <div className="container container-fluid">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/book/:bookId" component={WordAdd} />
        </div>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
