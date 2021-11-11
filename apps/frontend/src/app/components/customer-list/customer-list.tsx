import React from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import {
  selectCustomers,
  setPage,
  selectCustomersPage,
  selectCustomersCount,
  selectCustomersLoading,
} from '@nx-redux-toolkit/redux-modules';
import { useSelector, useDispatch } from 'react-redux';

export function CustomerList() {
  const dispatch = useDispatch();

  const customers = useSelector(selectCustomers);
  const page = useSelector(selectCustomersPage);
  const count = useSelector(selectCustomersCount);
  const isLoading = useSelector(selectCustomersLoading);

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  return (
    <>
      <Box pt={4} />
      <List>
        {customers?.map((n, index) => {
          return (
            <React.Fragment key={n._id}>
              <Box mt={index !== 0 ? 3 : 0} />
              <Box boxShadow={1} bgcolor="background.paper">
                <ListItem data-testid={`list-item-${index}`}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={n.name} secondary={n.createdAt} />
                </ListItem>
              </Box>
            </React.Fragment>
          );
        })}
      </List>
      {count > 1 && !isLoading && (
        <>
          <Box mt={3} />
          <Pagination count={count} page={page} onChange={handlePageChange} />
        </>
      )}
      <Box pt={4} />
    </>
  );
}

export default CustomerList;
