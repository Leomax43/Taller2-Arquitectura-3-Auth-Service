import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/api/auth', authRoutes);

// Iniciar servidor y base de datos
app.listen(port, async () => {
    console.log(`🔐 Auth Service corriendo en http://localhost:${port}`);
    await initDB();
});