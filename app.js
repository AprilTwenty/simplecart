import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 4000;
app.use(express.json());

const prisma = new PrismaClient();

// ✅ ตัวอย่าง route: ดึงสินค้าทั้งหมด
app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany({
    include: {
      product_flavours: {
        include: { product_variants: true },
      },
    },
  });
  res.json(products);
});

// ✅ ตัวอย่าง route: เพิ่มสินค้าใหม่
app.post("/products", async (req, res) => {
  const { title, description } = req.body;
  const product = await prisma.products.create({
    data: { title, description },
  });
  res.json(product);
});

app.listen(PORT, () => console.log("🚀 Server running at http://localhost:" + PORT));