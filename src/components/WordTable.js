import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

export default class WordTable extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <Table multiSelectable={true} onRowSelection={this.onRowSelection.bind(this) }>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody showRowHover={true} deselectOnClickaway={false}>
                            {tableData.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.status}</TableRowColumn>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </div>
                <div className="col-xs-12 end-xs">
                    <RaisedButton label="消去" secondary={true}/>
                </div>
            </div>
        );
    }

    onRowSelection(selectedRows) {
        console.log(selectedRows);
    }
}