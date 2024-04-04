// const { register } = require("../controllers/usersController");
const { register, setAvatar, login} = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id",setAvatar);

module.exports = router;