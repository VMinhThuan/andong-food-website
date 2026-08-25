import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Create index
userSchema.index({ username: 1, email: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
