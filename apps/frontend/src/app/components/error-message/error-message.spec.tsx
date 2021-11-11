import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import ErrorMessage from './error-message';

describe('ErrorMessage', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(
      <ErrorMessage error="this is a error" />,
      {
        initialAppState: {
          ...initialAppState,
        },
      }
    );
    expect(baseElement).toBeTruthy();
  });
});
