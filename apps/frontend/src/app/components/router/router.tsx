import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Customers } from '../customers/customers';
import { Login } from '../login/login';
import { Navbar } from '../navbar/navbar';
import { Register } from '../register/register';
import { Container, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  getLoggedIn,
  selectUserLoggedIn,
  selectUserError,
} from '@nx-redux-toolkit/redux-modules';
import { ErrorMessage } from '../error-message/error-message';

export function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  const userError = useSelector(selectUserError);

  const loggedIn = useSelector(selectUserLoggedIn);
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Box pt={6} />
        <ErrorMessage error={userError} />
        <Switch>
          {loggedIn === false && (
            <>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Redirect from="*" to="/login" />
            </>
          )}
          {loggedIn === true && (
            <>
              <Route exact path="/customers">
                <Customers />
              </Route>
              <Redirect from="*" to="/customers" />
            </>
          )}
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
