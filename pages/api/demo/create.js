import connectDB from "../../../db";
import Demo from "../../../model/demo";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { name, mobile, address } = req.body;

    if (name && mobile && address) {
      try {
        const user = await Demo.create({
          name,
          mobile,
          address,
        });
        // Create new user

        res.status(200).json({
          _id: user._id,
          name,
          mobile,
          address,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong");
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
