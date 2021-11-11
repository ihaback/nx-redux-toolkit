import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import LogOutBtn from './log-out-btn';

describe('LogOutBtn', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<LogOutBtn />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
