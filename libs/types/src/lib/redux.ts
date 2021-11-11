import { store } from '@nx-redux-toolkit/redux-modules';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
