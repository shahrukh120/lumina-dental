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
// NVIDIA NIM (OpenAI-compatible) — used to AI-rewrite service descriptions.
// Set NVIDIA_API_KEY in the environment (Render dashboard). Never commit it.
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || "meta/llama-3.1-8b-instruct";
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_dental';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// --- MODELS ---
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: String,   // Long-form "Learn More" content
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

// Middleware: require a valid admin JWT (sent as "Authorization: Bearer <token>")
const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Not an admin');
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
};

// --- AI: rewrite/improve a service description via NVIDIA NIM ---
app.post('/api/ai/rewrite', requireAdmin, async (req, res) => {
  try {
    if (!NVIDIA_API_KEY) {
      return res.status(500).json({ error: "AI is not configured on the server." });
    }
    const { title = '', text = '' } = req.body;
    if (!text.trim()) {
      return res.status(400).json({ error: "Nothing to rewrite." });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        temperature: 0.6,
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content:
              "You are a professional medical copywriter for MaxoDent Dental Care Clinic. " +
              "Rewrite the provided dental service description so it is clear, warm, trustworthy and patient-friendly. " +
              "Keep it factual and concise (3-5 sentences). Do not invent prices, guarantees or medical claims. " +
              "Return ONLY the rewritten description as plain text, with no preamble, headings or quotation marks.",
          },
          {
            role: "user",
            content: `Service title: ${title}\n\nCurrent description:\n${text}`,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("NVIDIA API error:", data);
      return res.status(502).json({ error: data?.detail || data?.error || "AI service error." });
    }

    const improved = data?.choices?.[0]?.message?.content?.trim();
    if (!improved) {
      return res.status(502).json({ error: "AI returned an empty response." });
    }
    res.json({ text: improved });
  } catch (err) {
    console.error("AI rewrite error:", err);
    res.status(500).json({ error: "Could not reach the AI service." });
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

app.post('/api/services', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : '';
    const { title, description, details } = req.body;

    const newService = new Service({ title, description, details, image: imageUrl });
    await newService.save();
    res.json(newService);
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Update a service (e.g. add/edit the "Learn More" details). Image is optional —
// when no new file is uploaded the existing image is kept.
app.put('/api/services/:id', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, details } = req.body;
    const update = { title, description, details };
    if (req.file) update.image = req.file.path;

    const updated = await Service.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ error: "Service not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete('/api/services/:id', requireAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- GALLERY ENDPOINTS ---
app.get('/api/gallery', async (req, res) => {
  const photos = await Gallery.find();
  res.json(photos);
});

app.post('/api/gallery', requireAdmin, upload.single('image'), async (req, res) => {
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

app.delete('/api/gallery/:id', requireAdmin, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(3001, () => console.log("✅ Server running on port 3001"));