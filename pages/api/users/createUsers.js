import connectDB from '../../../db';
import User from '../../../model/user'; 
import bcrypt from 'bcryptjs';
import GenerateToken from '../../../controller/Jwt';

const handler = async (req, res) => {
  if (req.method === 'POST') {

    // Check if name, email or password is provided
    const { name, email, password } = req.body;

    // Check user exists
    const user = await User.findOne({email})
    
    if(user) {
      res.status(400).json('User Already Exists')
    } 

    if (name && email && password) {
      try {
        // Hash password to store it in DB
        const salt = await bcrypt.genSalt(10)
        const HashedPass = await bcrypt.hash(password, salt)
     
          const user = await User.create({
            name,
            email,
            password:HashedPass,
           

          });
          // Create new user
       
          res.status(200).json({
            _id: user._id,
            name,
            email,
            token: GenerateToken(user._id)
          });
        } catch (error) {
          console.log(error.message)
        res.status(500).send("Something went wrong")
        }
      } else {
        res.status(422).send('data_incomplete');
      }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);