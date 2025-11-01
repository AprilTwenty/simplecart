import express from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate } from '../utils/authMiddleware.js';

const router = express.Router();

// ✅ GET /api/cart (ต้องล็อกอิน)
router.get('/', authenticate, async (req, res) => {
  try {
    const cart = await prisma.cart_items.findMany({
      where: { user_id: req.user.id },
      include: {
        product_variant: {
          include: {
            product_flavour: {
              include: { product: true },
            },
          },
        },
      },
    });
    res.json({ success: true, data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

// ✅ POST /api/cart (เพิ่มสินค้า)
router.post('/', authenticate, async (req, res) => {
  try {
    const { product_variant_id, quantity } = req.body;

    if (!product_variant_id || !quantity)
      return res.status(400).json({ error: 'Missing product or quantity' });

    // ตรวจ stock ก่อน
    const variant = await prisma.product_variants.findUnique({
      where: { product_variant_id: Number(product_variant_id) },
    });

    if (!variant || variant.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // ตรวจว่ามีอยู่ใน cart แล้วไหม
    const existing = await prisma.cart_items.findFirst({
      where: {
        user_id: req.user.id,
        product_variant_id: Number(product_variant_id),
      },
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cart_items.update({
        where: { cart_id: existing.cart_id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cart_items.create({
        data: {
          user_id: req.user.id,
          product_variant_id: Number(product_variant_id),
          quantity,
        },
      });
    }

    res.json({ success: true, data: cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

export default router;