import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user =  Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
},{timestamps:true});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;