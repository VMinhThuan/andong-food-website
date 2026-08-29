import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

// A serverless instance can process multiple requests, so reuse one MongoDB
// initialization promise for its lifetime.
let databaseReady;

export default async function handler(req, res) {
  databaseReady ??= connectDB();
  await databaseReady;
  return app(req, res);
}
