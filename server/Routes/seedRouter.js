import express from "express";
import { seedData } from "../Controllers/seedController.js";

const seedRouter = express.Router();

seedRouter.get("/", seedData);

export default seedRouter;

// import express from "express";
// import { data } from "../data.js";
// import User from "../Models/UserSchema.js";
// import Content from "../Models/ContentSchema.js";
// import expressAsyncHandler from "express-async-handler";

// const seedRouter = express.Router();

// seedRouter.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       await Content.deleteMany({});
//       const createdContent = await Content.insertMany(data.content);
//       await User.deleteMany({});
//       const createdUsers = await User.insertMany(data.users);

//       res.send({ createdContent, createdUsers });
//     } catch (err) {
//       console.log(`Failed to update users: ${err.message}`);
//     }
//   })
// );

// export default seedRouter;
