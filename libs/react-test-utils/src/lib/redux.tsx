import React, { PropsWithChildren } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  USER_FEATURE_KEY,
  initialUserState,
  userReducer,
  CUSTOMERS_FEATURE_KEY,
  initialCustomersState,
  customersReducer,
} from '@nx-redux-toolkit/redux-modules';

const initialAppState = {
  [USER_FEATURE_KEY]: initialUserState,
  [CUSTOMERS_FEATURE_KEY]: initialCustomersState,
};

function render(
  ui: React.ReactElement,
  {
    initialAppState,
    store = configureStore({
      reducer: {
        [USER_FEATURE_KEY]: userReducer,
        [CUSTOMERS_FEATURE_KEY]: customersReducer,
      },
      preloadedState: initialAppState,
      // Additional middleware can be passed to this array
      middleware: [...getDefaultMiddleware()],
      devTools: process.env.NODE_ENV !== 'production',
      // Optional Redux store enhancers
      enhancers: [],
    }),
    ...renderOptions
  } = {} as any
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render as reduxWrapper };
export { initialAppState };
