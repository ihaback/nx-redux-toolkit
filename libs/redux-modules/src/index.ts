export * from './lib/user.slice';
export * from './lib/customers.slice';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { USER_FEATURE_KEY, userReducer } from './lib/user.slice';
import { CUSTOMERS_FEATURE_KEY, customersReducer } from './lib/customers.slice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@nx-redux-toolkit/types';

export const store = configureStore({
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
    [CUSTOMERS_FEATURE_KEY]: customersReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
