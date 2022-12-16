import connectDB from '../../../db';
import User from '../../../model/user'; 
import bcrypt from 'bcryptjs';
import GenerateToken from '../../../controller/Jwt';

const handler = async (req, res) => {
  
  if (req.method === 'POST') {

    // Check if name, email or password is provided
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({email})
    
    if(!user) {
      res.status(400).json('You are not user')
      return
    } 

    if (user && await(bcrypt.compare(password, user.password))) {
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email,
            token: GenerateToken(user._id)
          });
      } else {
        res.status(422).send('invalid credential');
      }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB( handler)