const LastSeenModel  =require("../model/LastSeenModel");

  module.exports={
    saveUserLastSeen:async(body)=>{
      // Update last seen details against User Id
      let item = await LastSeenModel.updateOne({ userId: body.userId }, body, {
        upsert: true,
      });
    },
    getUserLastSeen:async(req,res)=>{
       let paramId = req.body.id;
      // console.log("USER ID ite => ", paramId);
    
      // Query for the user's last seen
      try {
        const lastSeen = await LastSeenModel.find({ userId: paramId });
        // console.log("USER LAST SEEN ==> ", lastSeen);
    
        res.status(200).json({
          success: true,
          lastSeen: lastSeen,
        });
      } catch (error) {
        1;
        return res.status(200).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
