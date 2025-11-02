import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // 🔍 1. ดึง token จาก header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token format",
      });
    }

    // 🧩 2. ตัดคำว่า 'Bearer ' ออก
    const token = authHeader.split(" ")[1];

    // 🔐 3. ตรวจสอบ token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET not found in environment");
      return res.status(500).json({
        success: false,
        message: "Server configuration error: missing JWT_SECRET",
      });
    }

    const decoded = jwt.verify(token, secret);

    // ✅ 4. เก็บข้อมูล user ไว้ใน req.user ให้ endpoint ถัดไปใช้งานได้
    req.user = decoded;

    // ✅ ผ่านการตรวจสอบ เรียก next() ไปยัง controller ต่อไป
    next();
  } catch (err) {
    console.error("JWT verify failed:", err.message);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
