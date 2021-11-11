import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import Login from './login';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<Login />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
