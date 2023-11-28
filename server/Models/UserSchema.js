import { mongoose, Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profilePicture: {
      type: String,
      default: "https://i.pravatar.cc/300",
      required: true,
    },

    isAdmin: { type: Boolean, default: false, required: true },

    // watchList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    watchList: [
      {
        content: { type: Schema.Types.ObjectId, ref: "Content" },
        stoppedAt: { type: Number, default: 0 },
        totalDuration: { type: Number, default: 0 },
      },
    ],
    favoritesList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
