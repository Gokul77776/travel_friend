// models/Post.js
import mongoose from 'mongoose';
import User from "@/models/User";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
  },
  image: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,  
  },
  location: {
    type: String,
    required: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  }
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
