//?
import mongoose from "../util/mongoose.js";
import jwt from "jsonwebtoken";

// todo
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    sparse: true, // dup kee problem
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isReged: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// todo
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

// todo
export default mongoose.model("User", userSchema);
