const ChatRoom =require("./../model/ChatRoomModel");
const {updateChatList }=require("./chatListController");
const  {clearUserUnreadCount} =require("./unreadCountController"); 

// Fetch User Chat Room Details
module.exports ={
  getUserChatRoom:async(req,res,next)=>{
    const roomId = req.body.roomId;
    const userId = req.body.userId;
    // console.log('roomId =>',roomId);
    try {
      // clear the unread count from chat list table
      await clearUserUnreadCount(roomId, userId);

      const chats = await ChatRoom.find({ _id: roomId });
      // console.log('tsert',chats);
      if (!chats) {
        return res.status(200).json({ success: false, message: "Api Failed" });
      }
      return res.status(200).json({ success: true, data: chats });
      next();
    } catch (err){
      return res.status(200).json({ success: false, message: err });
      next();
    }
  },
  
  // Create User Chat Room Details
  createChatRoom:async(req,res) =>{
    const body= req.body;
    if (!body) {
      return res.status(200).json({
        success: false,
        message: "Invalid Data",
      });
    }
    // console.log("createChatRoom =>",body);
    const chatRoom = new ChatRoom(body);

    // Save Chat Room messages
    module.exports.saveRoomAndUpdateChatList(body, res, chatRoom, true);
  },

  // Update User Chat Room Details
  updateChatRoom:async(req,res)=>{
    try {
        const body = req.body;
        if (!body) {
          return res.status(200).json({
            success: false,
            message: "Invalid Data",
          });

        }

        // console.log("updateChatRoom  => ", body.chat);
        ChatRoom.findOne({ _id: body.roomId },async (err, chatRoom) => {
        // console.log("CHAT ROOM => ", chatRoom);
        if (err) {
          return res.status(200).json({
            success: false,
            message: err.message,
          });
        }
        // Add new message received to Array
        chatRoom.chat.push(body.chat);

        // Save Chat Room messages
        module.exports.saveRoomAndUpdateChatList(body, res, chatRoom, false);
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  },

  saveRoomAndUpdateChatList : async ( body, res,chatRoom,isNewChat) => {
    // console.log('body=>',body)
    try {
      await chatRoom.save();

      // Update Room ID as mongodb row ID
      await chatRoom.updateOne({ _id: chatRoom._id },{ $set: { roomId: chatRoom._id } });

      updateChatList(body, res, chatRoom, isNewChat);
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  },

}

