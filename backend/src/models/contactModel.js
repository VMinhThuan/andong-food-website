import mongoose from 'mongoose';
import Contact from './Contact.js';
import { dbStore } from './store.js';

class ContactModel {
  async findAll(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      const q = {};
      if (filter.status) q.status = filter.status;
      return await Contact.find(q).sort({ createdAt: -1 }).lean();
    }

    let contacts = dbStore.getCollection('contacts');
    if (filter.status) {
      contacts = contacts.filter(c => c.status === filter.status);
    }
    return contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await Contact.findOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] }).lean();
    }
    const contacts = dbStore.getCollection('contacts');
    return contacts.find(c => c.id === id) || null;
  }

  async create(contactData) {
    const id = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newContact = {
      id,
      status: 'pending',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      ...contactData
    };

    if (mongoose.connection.readyState === 1) {
      return await Contact.create(newContact);
    }

    const contacts = dbStore.getCollection('contacts');
    contacts.unshift(newContact);
    dbStore.setCollection('contacts', contacts);
    return newContact;
  }

  async updateStatus(id, status, assignedTo = null) {
    if (mongoose.connection.readyState === 1) {
      const updates = { status };
      if (assignedTo) updates.assignedTo = assignedTo;
      return await Contact.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
    }

    const contacts = dbStore.getCollection('contacts');
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return null;

    contacts[index] = {
      ...contacts[index],
      status,
      ...(assignedTo ? { assignedTo } : {}),
      updatedAt: new Date().toISOString()
    };
    dbStore.setCollection('contacts', contacts);
    return contacts[index];
  }

  async delete(id) {
    if (mongoose.connection.readyState === 1) {
      const res = await Contact.deleteOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
      return res.deletedCount > 0;
    }

    const contacts = dbStore.getCollection('contacts');
    const filtered = contacts.filter(c => c.id !== id);
    if (filtered.length === contacts.length) return false;
    dbStore.setCollection('contacts', filtered);
    return true;
  }
}

export const contactModel = new ContactModel();
