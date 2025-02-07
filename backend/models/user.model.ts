import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    auth0Id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

  });
  
  const User = mongoose.model("User", userSchema);
  export default User;