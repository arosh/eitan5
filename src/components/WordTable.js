import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../Store';

export default class WordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentWillReceiveProps() {
    this.setState({
      selectedRows: [],
    });
  }

  render() {
    return (
      <div className="row margin-top-1rem">
        <div className="col-xs-12">
          <Table multiSelectable onRowSelection={this.handleSelectedRowsChanged.bind(this)}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>単語</TableHeaderColumn>
                <TableHeaderColumn>答え</TableHeaderColumn>
                <TableHeaderColumn>例文</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover deselectOnClickaway={false}>
              {this.props.words.map((word, index) => (
                <TableRow
                  key={word.wordId}
                  selected={this.state.selectedRows.indexOf(index) !== -1}
                >
                  <TableRowColumn>{word.word}</TableRowColumn>
                  <TableRowColumn>{word.answer}</TableRowColumn>
                  <TableRowColumn>{word.sentence}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="col-xs-12 end-xs margin-top-1rem">
          <RaisedButton
            label="消去"
            disabled={this.state.selectedRows.length === 0}
            onTouchTap={this.deleteSelectedRows.bind(this)}
            secondary
          />
        </div>
      </div>
    );
  }

  handleSelectedRowsChanged(selectedRows) {
    this.setState({
      selectedRows,
    });
  }

  deleteSelectedRows() {
    if (confirm('消去してもよろしいですか？')) {
      const wordIds = this.state.selectedRows
        .map(index => this.props.words[index].wordId);
      store.deleteWords(this.props.bookId, wordIds);
    }
  }
}

WordTable.propTypes = {
  bookId: React.PropTypes.string,
  words: React.PropTypes.arrayOf(React.PropTypes.object),
};
