import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const matches = new Schema({
  
  response: {
    type:{},
    required: true
  },
  // total_items: {
  //   type: Number,
  //   required: true,
    
  // },
  // total_pages: {
  //   type: Number,
  //   required: true
  // },
 
});

mongoose.models = {};

const User = mongoose.model('Matches', matches);

export default User;