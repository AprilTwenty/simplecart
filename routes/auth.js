import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from '../prisma/client.js';
import { postUserValidation, loginValidation } from "../utils/validateData.js";

const authRoutes = express.Router();

// POST /api/login
authRoutes.post("/login", loginValidation, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ success: false, error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, error: "Invalid password" });

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

authRoutes.post("/register", postUserValidation, async (req, res) => {
    //1 access request
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        //2 sql
        const createUser = {
            data: {
                username,
                email,
                password: passwordHash,
                created_at: new Date(),
                updated_at: new Date()
            }
        };
        const collision = await prisma.users.findUnique({
            where: { username }
        });
        if (collision) {
            return res.status(409).json({
                "success": false,
                "message": "ชื่อ username " + collision.username + " มีอยู่ในระบบแล้ว"
            });
        }
        const collisionEmail = await prisma.users.findUnique({
            where: { email }
        });
        if (collisionEmail) {
            return res.status(409).json({
                "success": false,
                "message": "ชื่อ email " + collisionEmail.email + " มีอยู่ในระบบแล้ว"
            });
        }
        const result = await prisma.users.create(createUser);
        //3 response
        return res.status(201).json({
            "success": true,
            "message": "User registered successfully",
            "data": result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal server error. Please try again later"
        });
    }
});

export default authRoutes;
