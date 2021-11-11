import { reduxWrapper, initialAppState } from '@nx-redux-toolkit/react-test-utils';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<App />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
