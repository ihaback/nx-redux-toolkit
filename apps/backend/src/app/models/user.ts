import * as mongoose from 'mongoose';
import { UserProps } from '@nx-redux-toolkit/types';

const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserProps>('User', userSchema);

export default User;
