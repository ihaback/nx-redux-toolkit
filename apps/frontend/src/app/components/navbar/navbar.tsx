import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { LogOutBtn } from '../log-out-btn/log-out-btn';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Box, Button } from '@material-ui/core';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '@nx-redux-toolkit/redux-modules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      marginRight: 'auto',
    },
  })
);

export function Navbar() {
  const loggedIn = useSelector(selectUserLoggedIn);
  const classes = useStyles();
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box display="flex" alignItems="center" className={classes.logo}>
            <Box />
            <RecentActorsIcon fontSize="large" />
          </Box>
          {loggedIn === false && (
            <>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          )}
          {loggedIn === true && (
            <>
              <Button color="inherit" component={RouterLink} to="/customers">
                Customers
              </Button>
              <LogOutBtn />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
