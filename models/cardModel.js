//?
import mongoose from "../util/mongoose.js";

// todo
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
  href: {
    type: String,
  },
  img: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// todo
export default mongoose.model("Card", cardSchema);
