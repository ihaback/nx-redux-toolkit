import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import Register from './register';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<Register />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
