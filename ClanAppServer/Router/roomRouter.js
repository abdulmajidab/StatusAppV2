const express = require('express');
const router = express.Router();
const {
  getUserChatRoom,
  createChatRoom,
  updateChatRoom,
} =require("../controller/chatRoomController");
const authUser = require("./../middleware/auth");
const {getUserLastSeen } = require('../controller/lastSeenController');
router.post("/chatRoom",getUserChatRoom);
router.post("/createChatRoom",createChatRoom);
router.post("/updateChatRoom",updateChatRoom);
router.post("/lastSeen",getUserLastSeen);

module.exports=router;
