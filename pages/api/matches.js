import connectDB from "../../db";
import Matches from "../../model/matches"


const handler = async (req, res) => {
  if (req.method == "GET") {
   const  matches = await Matches.find()


  let items = []


  for(const key in matches){
    let data = matches[key].response
    items.push(data)
    
  }
  
   res.status(200).json({status: 'Ok', response:{
    items
   }
   })
  }
  else{
    res.status(400).send('Method Not Allow')
  }
};

export default connectDB(handler);
