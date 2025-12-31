import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";

// 1. IMPORT CLOUDINARY LIBRARIES
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 2. CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 3. CONFIGURE STORAGE ENGINE
// This tells Multer: "Don't save to hard drive, upload directly to Cloudinary"
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lumina_dental', // Folder name in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

const ADMIN_EMAIL = "mdsulemanarchie@gmail.com";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_dental';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// --- MODELS ---
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
const Service = mongoose.model('Service', serviceSchema);

const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
});
const Gallery = mongoose.model('Gallery', gallerySchema);


// --- ROUTES ---

// Auth
app.post('/api/admin/verify', (req, res) => {
  const { email } = req.body;
  if (email === ADMIN_EMAIL) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(403).json({ success: false });
  }
});

// Gemini
app.post("/api/gemini", async (req, res) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) { res.status(500).json({ error: "Gemini Error" }); }
});

// --- SERVICES ENDPOINTS ---
app.get('/api/services', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    // 4. CHANGE: Cloudinary returns the URL in req.file.path
    const imageUrl = req.file ? req.file.path : '';
    
    const newService = new Service({ ...req.body, image: imageUrl });
    await newService.save();
    res.json(newService);
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- GALLERY ENDPOINTS ---
app.get('/api/gallery', async (req, res) => {
  const photos = await Gallery.find();
  res.json(photos);
});

app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    // 4. CHANGE: Cloudinary returns the URL in req.file.path
    const imageUrl = req.file ? req.file.path : '';
    
    const newPhoto = new Gallery({ ...req.body, image: imageUrl });
    await newPhoto.save();
    res.json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(3001, () => console.log("✅ Server running on port 3001"));