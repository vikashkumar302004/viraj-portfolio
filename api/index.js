import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// On Vercel, the filesystem is read-only except for /tmp.
// Locally we write in the same folder.
const LEADS_FILE = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'leads.json')
  : path.join(__dirname, 'leads.json');

app.use(cors());
app.use(express.json());

// Helper to read leads from local JSON file
async function readLeadsLocal() {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper to write leads to local JSON file
async function writeLeadsLocal(leads) {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
}

// MongoDB Setup (Optional)
let dbClient = null;
let useMongo = false;

if (process.env.MONGODB_URI) {
  try {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    client.connect()
      .then(c => {
        dbClient = c;
        useMongo = true;
        console.log('Connected to MongoDB successfully!');
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB, falling back to local file storage:', err);
      });
  } catch (e) {
    console.error('Failed to require mongodb driver, falling back to local file storage:', e);
  }
}

// Helper: Get leads database collection or array
async function getLeads() {
  if (useMongo && dbClient) {
    const db = dbClient.db();
    return await db.collection('leads').find().sort({ createdAt: -1 }).toArray();
  } else {
    return await readLeadsLocal();
  }
}

// Helper: Add lead
async function addLead(lead) {
  const newLead = {
    id: Date.now().toString(),
    ...lead,
    createdAt: new Date().toISOString()
  };

  if (useMongo && dbClient) {
    const db = dbClient.db();
    await db.collection('leads').insertOne(newLead);
    return newLead;
  } else {
    const leads = await readLeadsLocal();
    leads.unshift(newLead);
    await writeLeadsLocal(leads);
    return newLead;
  }
}

// Helper: Update lead
async function updateLead(id, updates) {
  if (useMongo && dbClient) {
    const db = dbClient.db();
    await db.collection('leads').updateOne({ id: id }, { $set: updates });
  } else {
    const leads = await readLeadsLocal();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates };
      await writeLeadsLocal(leads);
    }
  }
}

// Helper: Delete lead
async function deleteLead(id) {
  if (useMongo && dbClient) {
    const db = dbClient.db();
    await db.collection('leads').deleteOne({ id: id });
  } else {
    const leads = await readLeadsLocal();
    const filtered = leads.filter(l => l.id !== id);
    await writeLeadsLocal(filtered);
  }
}

// Endpoints
// 1. Submit lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, whatsapp, email, projectType, description, brandColor, referenceLink, budget, deadline } = req.body;
    if (!name || !whatsapp || !description) {
      return res.status(400).json({ error: 'Name, whatsapp number, and description are required.' });
    }
    const leadData = {
      name,
      whatsapp,
      email: email || '',
      projectType,
      description,
      brandColor: brandColor || '#00f0ff',
      referenceLink: referenceLink || '',
      budget,
      deadline,
      status: 'new'
    };
    const saved = await addLead(leadData);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving lead.' });
  }
});

// 2. Get all leads (passcode verified)
app.get('/api/leads', async (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode !== 'viraj17' && passcode !== '7498' && passcode !== '2009') {
      return res.status(401).json({ error: 'Unauthorized passcode.' });
    }
    const leads = await getLeads();
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error retrieving leads.' });
  }
});

// 3. Update lead status/notes (passcode verified)
app.put('/api/leads/:id', async (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode !== 'viraj17' && passcode !== '7498' && passcode !== '2009') {
      return res.status(401).json({ error: 'Unauthorized passcode.' });
    }
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    await updateLead(id, updates);
    res.json({ message: 'Lead updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating lead.' });
  }
});

// 4. Delete lead (passcode verified)
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode !== 'viraj17' && passcode !== '7498' && passcode !== '2009') {
      return res.status(401).json({ error: 'Unauthorized passcode.' });
    }
    const { id } = req.params;
    await deleteLead(id);
    res.json({ message: 'Lead deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting lead.' });
  }
});

// Export default for Vercel Serverless Function compatibility
export default app;

// Listen only when run locally (not as a serverless function on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
  });
}
