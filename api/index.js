import express from "express";
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import authRoutes from "./routes/auth.js";


const app = express();
app.use(express.json());
// Routes
app.use("/api", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "test pass" });
});

export default app;