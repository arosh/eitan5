import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  loading: {
    position: 'fixed',
    top: 'calc(50% + 32px - 40px)',
    left: 'calc(50% - 40px)',
  },
};

const Loading = () => (
  <div style={styles.loading}>
    <CircularProgress size={60} thickness={4.5} />
  </div>
);

export default Loading;
