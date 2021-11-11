import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import Router from './router';

describe('Router', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<Router />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
