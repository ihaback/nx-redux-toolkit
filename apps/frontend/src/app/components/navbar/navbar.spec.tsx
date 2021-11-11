import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import Navbar from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<Navbar />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
