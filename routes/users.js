const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../modals/user");
const express = require("express");
const router = express.Router();

//======POST=======
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log("Error while signing up!", error);
      let errorMsg = error.details[0].message;
      res.render("signUp", { errorMsg: errorMsg });
    }

    //make sure user is not already registered
    let user = await User.findOne({ email: req.body.email });
    let errorMsg = "user already registered";
    if (user) res.render("signUp", { errorMsg: errorMsg });

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.cookie("authcookie", token, { maxAge: 9000000, httpOnly: true });

    console.log("User registered sucessfully!");
    return res.redirect("/signin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
