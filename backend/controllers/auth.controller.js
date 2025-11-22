import prisma from "../db/prisma.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "7d" }
    );
};

export const login = async (req, res) => {

}

export const signup = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                full_name,
                email,
                password: hashedPassword,
            },
        });

        const token = createToken(newUser.id);

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error in signup controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}