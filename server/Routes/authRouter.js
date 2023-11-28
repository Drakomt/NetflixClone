import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserSchema.js";
import { generateToken } from "../utils.js";

const authRouter = express.Router();

authRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // console.log(
    //   "in Signin:  Email: ",
    //   req.body.email,
    //   " Password: ",
    //   req.body.password
    // );
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("success");
        res.send({
          // _id: user._id,
          // username: user.username,
          // profilePicture: user.profilePicture,
          // email: user.email,
          // isAdmin: user.isAdmin,
          user: user,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send("Invalid Password/User");
  })
);

authRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    // console.log(
    //   "in SignUp:  Email: ",
    //   req.body.email,
    //   " Password: ",
    //   req.body.password
    // );
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();

    res.send({
      // _id: user._id,
      // username: user.username,
      // email: user.email,
      user: user,
      token: generateToken(user),
    });
  })
);

export default authRouter;
