const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatBody = {
  userId: { type: String, required: true },
  userName: { type: String, required: false },
  chatId: { type: String, required: true },
  chatName: { type: String, required: true },
  chatMessage: { type: String, required: true },
  chatNumber: { type: String, required: false },
  chatImage: { type: String, required: false },
  chatTime: { type: String, required: true },
  chatDelivery: { type: Number, required: false }, 
};

const LastSeen = { 
  userLastSeen: { type: String, required: false }, 
  chatLastSeen: { type: String, required: false }
};
const chatUnreadCount ={
  userId:{type:String, required:true},
  type:{type:String,required:false},
  count:{type:Number, required:false}
};
const chatRoomSchema = new Schema(
  {
    isNewChat: {type:Boolean,required:false},
    roomId: { type: String, required: false },
    userId: { type: String, required: true },
    chatId: { type: String, required: true }, 
    chatUnreadCount:{type: [chatUnreadCount], required:false },
    chat: { type: [ChatBody], required: false }
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model('chatRoom', chatRoomSchema);

module.exports = ChatRoom;
