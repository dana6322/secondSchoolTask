import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  // for now later should ref user model
  sender: {
    type: String,
    required: true,
  },
});

export default mongoose.model("post", postSchema);
