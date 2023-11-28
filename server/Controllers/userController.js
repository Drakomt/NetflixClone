import User from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

export const signIn = async (req, res) => {
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
  res.status(401).send("Invalid Password/Username");
};

export const signUp = async (req, res) => {
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
};

export const toggleFavorite = async (req, res) => {
  try {
    const contentId = req.body.contentId;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favoritesList.indexOf(contentId);
    if (index === -1) {
      user.favoritesList.push(contentId);
    } else {
      user.favoritesList.splice(index, 1);
    }

    await user.save();
    // await user.populate("favoritesList");

    res.json({ favoritesList: user.favoritesList });
  } catch (err) {
    console.error("Error in toggleFavorite: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleWatchList = async (req, res) => {
  //console.log("toggleWatchList endpoint hit");
  try {
    const userId = req.user._id;
    const contentId = req.params.contentId;
    const stoppedAt = req.body.watchItem
      ? req.body.watchItem.stoppedAt
      : req.body.stoppedAt || 0;
    const totalDuration = req.body.watchItem?.totalDuration || 0;
    //console.log("request body: ", req.body);
    //console.log("stopped at: ",stoppedAt);
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User Not Found");

    const watchItem = user.watchList.find(
      (item) => item.content.toString() === contentId
    );
    if (!watchItem) {
      user.watchList.push({ content: contentId, stoppedAt, totalDuration });
    } else if (stoppedAt === -1) {
      const index = user.watchList.findIndex(
        (watchItem) => watchItem.content.toString() === contentId
      );
      // console.log("Before Splice: ", user.watchList);
      user.watchList.splice(index, 1);
    } else {
      watchItem.stoppedAt = stoppedAt;
      watchItem.totalDuration = totalDuration;
    }

    await user.save();
    await user.populate("watchList.content");

    res.json({ watchList: user.watchList });
  } catch (err) {
    console.error("Error in toggleWatchList: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserByEmail = (email) =>
  User.findOne({ email })
    .populate("favoritesList")
    .populate("watchList.content")
    .populate("likeList")
    .populate("dislikeList")
    .catch((err) => {
      console.error("Error fetching user by email: ", err);
      return null;
    });
