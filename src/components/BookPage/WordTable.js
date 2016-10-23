import * as React from 'react';
import MicroContainer from 'react-micro-container';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import store from '../../Store';

const styles = {
  rowColumn: {
    whiteSpace: 'wrap',
  },
};

const Header = props => (
  <TableHeader {...props} displaySelectAll={false}>
    <TableRow>
      <TableHeaderColumn>単語</TableHeaderColumn>
      <TableHeaderColumn>答え</TableHeaderColumn>
      <TableHeaderColumn>例文</TableHeaderColumn>
    </TableRow>
  </TableHeader>
);

Header.muiName = 'TableHeader';

const Body = props => (
  <TableBody {...props} showRowHover deselectOnClickaway={false}>
    {props.words.map((word, index) => (
      <TableRow
        key={word.wordId}
        selected={props.selectedRows.indexOf(index) !== -1}
      >
        <TableRowColumn style={styles.rowColumn}>{word.word}</TableRowColumn>
        <TableRowColumn style={styles.rowColumn}>{word.answer}</TableRowColumn>
        <TableRowColumn style={styles.rowColumn}>{word.sentence}</TableRowColumn>
      </TableRow>
    ))}
  </TableBody>
);

Body.muiName = 'TableBody';

Body.propTypes = {
  words: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectedRows: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};

const RemoveButton = props => (
  <RaisedButton
    label="削除"
    disabled={!props.enable}
    onTouchTap={() => props.dispatch('deleteSelectedRows')}
    secondary
  />
);

RemoveButton.muiName = 'RaisedButton';

RemoveButton.propTypes = {
  enable: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default class WordTable extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    this.subscribe({
      deleteSelectedRows: this.deleteSelectedRows,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      selectedRows: [],
    });
  }

  deleteSelectedRows() {
    const numSelectedRows = this.state.selectedRows.length;
    if (confirm(`${numSelectedRows}件の単語を削除してもよろしいですか？`)) {
      const wordIds = this.state.selectedRows
        .map(index => this.props.words[index].wordId);
      store.deleteWords(this.props.bookId, wordIds);
    }
  }

  render() {
    return (
      <div className="row margin-top-1rem">
        <div className="col-xs-12">
          <Table
            onRowSelection={selectedRows => this.setState({ selectedRows })}
            multiSelectable
          >
            <Header />
            <Body
              words={this.props.words}
              selectedRows={this.state.selectedRows}
            />
          </Table>
        </div>
        <div className="col-xs-12 end-xs margin-top-1rem">
          <RemoveButton
            enable={this.state.selectedRows.length > 0}
            dispatch={this.dispatch}
          />
        </div>
      </div>
    );
  }
}

WordTable.propTypes = {
  bookId: React.PropTypes.string.isRequired,
  words: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
