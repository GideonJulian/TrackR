import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
  // ONLY HASH IF PASSWORD CHANGED
  if (!this.isModified("password")) {
    return next();
  }

  // GENERATE SALT
  const salt = await bcrypt.genSalt(10);

  // HASH PASSWORD
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// COMPARE PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);

