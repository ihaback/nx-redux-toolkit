import React, { useState, useEffect, FormEvent } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCustomer,
  setSearchString,
  customerSearchString,
  fetchCustomers,
  selectCustomersPage,
} from '@nx-redux-toolkit/redux-modules';

export function CustomerForm() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState('');

  const dispatch = useDispatch();

  const searchString = useSelector(customerSearchString);
  const page = useSelector(selectCustomersPage);

  const saveCustomer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = {
      name: customerName,
    };

    dispatch(addCustomer(customerData));
    setCustomerName('');
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch, searchString, page]);

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <form onSubmit={saveCustomer} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid container item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Search Customers"
                onChange={(e) => {
                  dispatch(setSearchString(e.target.value));
                }}
                variant="outlined"
                value={searchString || ''}
              />
            </Grid>
            <Grid container item xs={12} sm={6} wrap="nowrap">
              <TextField
                type="text"
                placeholder="Add customers"
                onChange={(e) => {
                  setCustomerName(e.target.value);
                }}
                variant="outlined"
                value={customerName}
                className={classes.input}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '& .MuiOutlinedInput-root': {
        'border-top-right-radius': 0,
        'border-bottom-right-radius': 0,
      },
    },
    button: {
      'border-top-left-radius': 0,
      'border-bottom-left-radius': 0,
      width: 130,
    },
  })
);

export default CustomerForm;
