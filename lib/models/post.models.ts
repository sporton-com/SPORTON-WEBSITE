import mongoose from "mongoose";

const reactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type:{ type:String },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  isAchievement: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  react: [reactSchema],
  parentId: { type: String },
  repost: { type: mongoose.Schema.Types.ObjectId,
    ref: "Post", },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
