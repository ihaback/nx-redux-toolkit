import {
  reduxWrapper,
  initialAppState,
} from '@nx-redux-toolkit/react-test-utils';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import CustomerList from './customer-list';

describe('CustomerList', () => {
  it('should render successfully', async () => {
    const { baseElement } = reduxWrapper(<CustomerList />, {
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

    expect(screen.queryByText('Sofia')).toBeInTheDocument();
    expect(screen.queryByText('Eva')).toBeInTheDocument();
    expect(screen.queryByText('Mark')).toBeInTheDocument();
  });
});
