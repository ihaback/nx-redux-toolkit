import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Box,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { registerUser } from '@nx-redux-toolkit/redux-modules';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const registerData = {
      email,
      password,
      passwordVerify,
      history,
    };

    dispatch(registerUser(registerData));
  };

  return (
    <div>
      <form onSubmit={register} autoComplete="off">
        <Container maxWidth="xs">
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box mt={2} />
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Box mt={2} />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordVerify"
              label="Verify password"
              type="password"
              id="passwordVerify"
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
            />
            <Box mt={1} />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign up
            </Button>
          </Grid>
        </Container>
      </form>
    </div>
  );
}

export default Register;
