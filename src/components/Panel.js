import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

// https://github.com/callemall/material-ui/blob/efd5bb306db7057829213031f1929dcbfe2a4f82/docs/src/app/components/CodeExample/index.js#L45
const paddingInPaperStyle = {
  padding: '14px 24px 24px',
};

const Panel = ({ heading, children }) => (
  <Paper>
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text={heading} />
      </ToolbarGroup>
    </Toolbar>
    <div style={paddingInPaperStyle}>
      {children}
    </div>
  </Paper>
);

export default Panel;
