import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  profileImage: {
    type: String,
  },
  backgroundImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
});

const UserProfile =
  mongoose.models.UserProfile || mongoose.model("UserProfile", profileSchema);

export default UserProfile;
