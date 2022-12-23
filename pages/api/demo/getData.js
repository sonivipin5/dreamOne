import connectDB from "../../../db";
import Demo from "../../../model/demo";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Check if name, email or password is provided
         const getData = await Demo.find()

    console.log(getData);

        res.status(200).json({
        response:getData
        
        });
      
   
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
