import * as mongoose from 'mongoose';
import { CustomerProps } from '@nx-redux-toolkit/types';

const customerSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model<CustomerProps>('Customer', customerSchema);

export default Customer;
