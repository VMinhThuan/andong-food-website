import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  company: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
  assignedTo: { type: String, default: null }
}, {
  timestamps: true
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
