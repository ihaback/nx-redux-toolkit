import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@nx-redux-toolkit/redux-modules';

export function LogOutBtn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(logoutUser(history));
  };
  return (
    <Button color="inherit" onClick={logOut}>
      Log out
    </Button>
  );
}

export default LogOutBtn;
