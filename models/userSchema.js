import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Name Required!'],
  },
  email: {
    type: String,
    required: [true, 'Email Required!'],
  },
  aboutMe: {
    type: String,
    required: [true, 'About Me Field Required!'],
  },
  phone: {
    type: String,
    required: [true, 'Phone Number Required!'],
  },
  password: {
    type: String,
    required: [true, 'Password Required!'],
    min: [8, 'Password must contain at least 8 characters!'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, 'Portfolio URL is Required!'],
  },
  githubURL: String,
  linkedinURL: String,
  instagramURL: String,
  twitterURL: String,
  facebookURL: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJSONWebToken = function () {
  const payload = {
    id: this._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model('User', userSchema);
