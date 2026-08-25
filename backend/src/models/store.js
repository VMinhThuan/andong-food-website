import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialUsers,
  initialCategories,
  initialCompany,
  initialProducts,
  initialContacts
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/database.json');

class DataStore {
  constructor() {
    this.data = {
      users: [],
      categories: [],
      products: [],
      contacts: [],
      company: {}
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.data = {
          users: initialUsers,
          categories: initialCategories,
          products: initialProducts,
          contacts: initialContacts,
          company: initialCompany
        };
        this.save();
      }
    } catch (err) {
      console.error('Error initializing DataStore, using defaults:', err);
      this.data = {
        users: initialUsers,
        categories: initialCategories,
        products: initialProducts,
        contacts: initialContacts,
        company: initialCompany
      };
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save DataStore to disk:', err);
    }
  }

  getCollection(name) {
    return this.data[name] || [];
  }

  setCollection(name, items) {
    this.data[name] = items;
    this.save();
  }

  getItem(name) {
    return this.data[name];
  }

  setItem(name, item) {
    this.data[name] = item;
    this.save();
  }
}

export const dbStore = new DataStore();
