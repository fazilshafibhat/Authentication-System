const bcrypt = require("bcrypt");
const { User } = require("../modals/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

//======POST=======
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    let errorMsg = error.details[0].message;
    return res.render("user_sign_in", { errorMsg: errorMsg });
  }

  //make sure user is not already registered
  let user = await User.findOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    let errorMsg = "Invalid email or password";

    return res.render("signIn", { errorMsg: errorMsg });
  }

  //Validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    let errorMsg = "Invalid email or password";
    return res.render("signIn", { errorMsg: errorMsg });
  }

  const token = user.generateAuthToken();
  console.log("this is token: ", token);

  res.cookie("authcookie", token, { maxAge: 9000000, httpOnly: true });
  res.redirect("/home");
});

//Validation function
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;
