const User = require("../model/userModel");
const bcrypt = require("bcrypt"); //used to encrypt password

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect username or password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
            return res.json({ msg: "Incorrect username or password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
};

module.exports.register = async (req, res, next) => {
    //console.log(req.body);
    try {
        const { username, email, password } = req.body;
        //to check is username is already present in the database 
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        //to check is email is already present in the database
        const emailCheck = await User.findOne({ email });
        if (emailCheck) 
            return res.json({ msg: "Email already used", status: false });
        // to hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
          userId,
          {
            isAvatarImageSet: true,
            avatarImage,
          },
          //{ new: true }
        );
        return res.json({
          isSet: userData.isAvatarImageSet,
          image: userData.avatarImage,
        });
    }
    catch(ex) {
        next(ex)
    }
};