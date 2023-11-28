import { data } from "../data.js";
import User from "../Models/UserSchema.js";
import Content from "../Models/ContentSchema.js";

export const seedData = async (req, res) => {
  try {
    await Content.deleteMany({});
    const createdContent = await Content.insertMany(data.content);
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdContent, createdUsers });
  } catch (err) {
    console.log(`Failed to seed: ${err.message}`);
  }
};
