import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Match } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';

import AppBar from './components/AppBar';
import BookAddDialog from './components/BookAddDialog';
import BookPage from './components/BookPage/BookPage';
import Drawer from './components/Drawer';
import Home from './components/Home/Home';
import Snackbar from './components/Snackbar';

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
    <BrowserRouter>
      <div>
        <AppBar />
        <Drawer />
        <BookAddDialog />
        <Snackbar />
        <div className="container">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/books/:bookId" component={BookPage} />
        </div>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
