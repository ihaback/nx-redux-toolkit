import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { Provider } from 'react-redux';

import { store } from '@nx-redux-toolkit/redux-modules';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
