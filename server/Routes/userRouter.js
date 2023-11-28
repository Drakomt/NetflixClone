import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  signIn,
  signUp,
  toggleFavorite,
  toggleWatchList,
} from "../Controllers/userController.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post("/signin", expressAsyncHandler(signIn));

userRouter.post("/signup", expressAsyncHandler(signUp));

userRouter.post("/toggleFavorite", isAuth, expressAsyncHandler(toggleFavorite));

userRouter.post(
  "/toggleWatchList",
  isAuth,
  expressAsyncHandler(toggleWatchList)
);

export default userRouter;

// import express from "express";
// import expressAsyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import User from "../Models/UserSchema.js";
// import { isAuth } from "../utils.js";

// const userRouter = express.Router();

// authRouter.post(
//   "/signin",
//   expressAsyncHandler(async (req, res) => {
//     // console.log(
//     //   "in Signin:  Email: ",
//     //   req.body.email,
//     //   " Password: ",
//     //   req.body.password
//     // );
//     const user = await User.findOne({ email: req.body.email });

//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         console.log("success");
//         res.send({
//           // _id: user._id,
//           // username: user.username,
//           // profilePicture: user.profilePicture,
//           // email: user.email,
//           // isAdmin: user.isAdmin,
//           user: user,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send("Invalid Password/User");
//   })
// );

// authRouter.post(
//   "/signup",
//   expressAsyncHandler(async (req, res) => {
//     // console.log(
//     //   "in SignUp:  Email: ",
//     //   req.body.email,
//     //   " Password: ",
//     //   req.body.password
//     // );
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password),
//     });
//     const user = await newUser.save();

//     res.send({
//       // _id: user._id,
//       // username: user.username,
//       // email: user.email,
//       user: user,
//       token: generateToken(user),
//     });
//   })
// );

// userRouter.post(
//   "/toggleFavorite",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const contentId = req.body.contentId;
//     const userId = req.user._id;

//     try {
//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // if (user.favoritesList.includes(contentId)) {
//       //   user.favoritesList = user.favoritesList.filter(
//       //     (id) => id !== contentId
//       //   );
//       // } else {
//       //   user.favoritesList.push(contentId);
//       // }

//       const index = user.favoritesList.indexOf(contentId);
//       if (index === -1) {
//         user.favoritesList.push(contentId);
//       } else {
//         user.favoritesList.splice(index, 1);
//       }

//       await user.save();

//       // res.status(200).json({
//       //   favoritesList: user.favoritesList,
//       // });
//       res.send({ favoritesList: user.favoritesList });
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   })
// );

// // userRouter.put(
// //   "update/:id",
// //   isAuth,
// //   expressAsyncHandler(async (req, res) => {
// //     if (req.user._id === req.params.id || req.user.isAdmin) {
// //       try {
// //         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
// //           $set: {
// //             ...req.user,
// //             email: req.body.email ? req.body.email : req.user.email,
// //             username: req.body.username ? req.body.username : req.user.username,
// //           },
// //         });
// //         res.status(200).json(await User.findById(req.params.id));
// //       } catch (error) {
// //         res.status(500).json(error);
// //       }
// //     } else {
// //       res.status(403).json({ message: "You can only update your account." });
// //     }
// //   })
// // );

// // //delete
// // userRouter.delete(
// //   "/delete/:id",
// //   isAuth,
// //   expressAsyncHandler(async (req, res) => {
// //     console.log("here");
// //     if (req.user._id === req.params.id || req.user.isAdmin) {
// //       try {
// //         await User.findByIdAndDelete(req.params.id);
// //         res.status(200).json({ message: "User Has Been Deleted" });
// //       } catch (error) {
// //         res.status(500).json(error);
// //       }
// //     } else {
// //       res.status(403).json({ message: "You can only delete your account." });
// //     }
// //   })
// // );
// // //get

// // userRouter.get(
// //   "/find/:id",
// //   isAuth,
// //   expressAsyncHandler(async (req, res) => {
// //     try {
// //       const user = await User.findById(req.params.id);
// //       const { password, ...info } = user._doc;
// //       res.status(200).json(user);
// //     } catch (error) {
// //       res.status(500).json(error);
// //     }
// //   })
// // );

// // //get all users

// // userRouter.get(
// //   "/admin/find-all",
// //   isAuth,
// //   expressAsyncHandler(async (req, res) => {
// //     const query = req.query.new;
// //     if (req.user.isAdmin) {
// //       try {
// //         const users = query
// //           ? await User.find().sort({ _id: -1 }).limit(5)
// //           : await User.find();
// //         res.status(200).json(users);
// //       } catch (error) {
// //         res.status(500).json(error);
// //       }
// //     } else {
// //       res.status(403).json({ message: "You are not an admin" });
// //     }
// //   })
// // );

// // //get User Stats
// // userRouter.get(
// //   "/admin/stats",
// //   isAuth,
// //   expressAsyncHandler(async (req, res) => {
// //     const today = new Date();
// //     const lastYear = today.setFullYear(today.setFullYear() - 1);

// //     try {
// //       const data = await User.aggregate([
// //         {
// //           $project: {
// //             month: { $month: "$createdAt" },
// //           },
// //         },
// //         {
// //           $group: {
// //             _id: "$month",
// //             total: { $sum: 1 },
// //           },
// //         },
// //       ]);
// //       res.status(200).json(data);
// //     } catch (err) {
// //       res.status(500).json(err);
// //     }
// //   })
// // );

// export default userRouter;
