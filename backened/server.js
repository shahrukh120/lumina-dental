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
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://maxodent.co.in",                       // Primary custom domain
    "https://www.maxodent.co.in",                   // www custom domain
    "https://lumina-dental.vercel.app",
    "https://dental-maxillofacial-clinic.vercel.app",
    "http://localhost",            // Old Android (Keep it)
    "https://localhost",           // ✅ NEW: Android Secure Localhost
    "capacitor://localhost"        // iOS/Android Hybrid
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mdsulemanarchie@gmail.com";
// Set ADMIN_PASSWORD in your environment (e.g. Render dashboard). The fallback
// is only for local development — change it before going live.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "maxodent@2026";
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const emailOk = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const passwordOk = password === ADMIN_PASSWORD;

  if (emailOk && passwordOk) {
    const token = jwt.sign({ email: ADMIN_EMAIL, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password." });
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