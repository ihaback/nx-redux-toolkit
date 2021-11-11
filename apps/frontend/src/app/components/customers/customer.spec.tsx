import {
  initialAppState,
  reduxWrapper,
} from '@nx-redux-toolkit/react-test-utils';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import Customers from './customers';

describe('Customers', () => {
  it('should render successfully', async () => {
    const { baseElement } = reduxWrapper(<Customers />, {
      initialAppState: {
        ...initialAppState,
        customers: {
          data: [{ name: 'Sofia' }, { name: 'Eva' }, { name: 'Mark' }],
          searchString: '',
        },
      },
    });

    await screen.findByTestId('list-item-2');

    expect(baseElement).toBeTruthy();
  });
});
