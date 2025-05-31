import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  password: { type: String, required: true },
  tokens: [String], // personal access tokens
  role:{ type: String, default: 'user' }, // provider
});

const User = mongoose.model("User", userSchema);

export default User;
