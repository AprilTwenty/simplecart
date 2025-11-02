import express from 'express';
import { prisma } from '../utils/prismaClient.js';

const productRoutes = express.Router();

// ✅ GET /api/products
productRoutes.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const products = await prisma.products.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        product_flavours: {
          include: {
            product_variants: true,
          },
        },
      },
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default productRoutes;