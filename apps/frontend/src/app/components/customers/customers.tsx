import React, { useEffect } from 'react';
import { CustomerForm } from '../customer-form/customer-form';
import { CustomerList } from '../customer-list/customer-list';
import { selectCustomers } from '@nx-redux-toolkit/redux-modules';
import { useSelector } from 'react-redux';

export function Customers() {
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [customers]);

  return (
    <div>
      <CustomerForm />
      <CustomerList />
    </div>
  );
}

export default Customers;
