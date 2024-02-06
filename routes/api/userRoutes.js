const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controller/userController");

// /api/students
router.route("/").get(getUsers).post(createUser);

// /api/students/:studentId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

const {
  addFriend,
  removeFriend,
} = require("../../controller/friendController");

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
