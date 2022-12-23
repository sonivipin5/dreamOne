import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const demoData =  Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
 
},{timestamps:true});

mongoose.models = {};

const User = mongoose.model('Demo', demoData);

export default User;