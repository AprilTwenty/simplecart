import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import authRoutes from "./routes/auth.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Running' });
});

export default app;
