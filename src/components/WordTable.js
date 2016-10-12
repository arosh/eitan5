import * as React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../Store';

const styles = {
  rowColumn: {
    whiteSpace: 'wrap',
  },
};

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

  deleteSelectedRows() {
    if (confirm('削除してもよろしいですか？')) {
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
                  <TableRowColumn style={styles.rowColumn}>{word.word}</TableRowColumn>
                  <TableRowColumn style={styles.rowColumn}>{word.answer}</TableRowColumn>
                  <TableRowColumn style={styles.rowColumn}>{word.sentence}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="col-xs-12 end-xs margin-top-1rem">
          <RaisedButton
            label="削除"
            disabled={this.state.selectedRows.length === 0}
            onTouchTap={(e) => { e.preventDefault(); this.deleteSelectedRows(); }}
            secondary
          />
        </div>
      </div>
    );
  }
}

WordTable.propTypes = {
  bookId: React.PropTypes.string,
  words: React.PropTypes.arrayOf(React.PropTypes.object),
};
