import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);

export default User;
