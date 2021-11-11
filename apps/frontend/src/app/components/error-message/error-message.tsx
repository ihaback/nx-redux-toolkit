import React, { memo } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';

function Error({ error }) {
  if (error) {
    return (
      <Box pb={4}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return null;
}

export const ErrorMessage = memo(Error);

export default Error;
