import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';

import CustomerForm from './customer-form';

describe('CustomerForm', () => {
  it('should render successfully', () => {
    const { baseElement } = reduxWrapper(<CustomerForm />, {
      initialAppState: {
        ...initialAppState,
      },
    });
    expect(baseElement).toBeTruthy();
  });
});
