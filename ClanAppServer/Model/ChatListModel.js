const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ChatBody } =require("./ChatRoomModel");

const ChatUnreadCount = {
  userId: { type: String, required: true },
  count: { type: Number, required: true }
};

const chatListSchema = new Schema(
  {
    roomId: { type: String, required: false },
    userId: { type: String, required: true },
    chatId: { type: String, required: true },
    chatUnreadCount: { type: Number, required: false },
    chat: { type: [ChatBody], required: true }
  },
  { timestamps: true }
);

const ChatListModel = mongoose.model('chatList', chatListSchema);
module.exports = ChatListModel;