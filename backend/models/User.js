import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength : 5
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    blogs : [{
      type : mongoose.Types.ObjectId,
      ref : 'Blog',
      required : true
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
