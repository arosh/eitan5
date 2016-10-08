import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';

// https://github.com/callemall/material-ui/blob/efd5bb306db7057829213031f1929dcbfe2a4f82/docs/src/app/components/CodeExample/index.js#L45
const paddingInPaperStyle = {
  padding: '0 24px 16px',
};

const Panel = ({ heading, children }) => (
  <Card>
    <CardTitle title={heading} />
    <div style={paddingInPaperStyle}>
      {children}
    </div>
  </Card>
);

Panel.propTypes = {
  heading: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Panel;
