
const express=require("express");
const {
  getAllUserStatus,
  createUserStatus,
  setUserStatusViewed,
} =require("../controller/statusController");
const authUser =require("../middleware/auth");

const router = express.Router();

router.get("/getAllStatus",getAllUserStatus);
router.post("/createStatus",createUserStatus);
router.post("/statusViewed",setUserStatusViewed);

module.exports=router;