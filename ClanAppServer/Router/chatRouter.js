const express = require('express');
const router = express.Router();
const authUser=require("../middleware/auth");
// User Controller
const {getUserChatList } = require('../Controller/chatListController');

router.post("/chatList", getUserChatList);

module.exports=router;
