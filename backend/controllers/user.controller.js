import prisma from "../db/prisma.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        res.status(200).json({
            userData: {
                fullName: user.fullName,
                isAccountVerified: user.isAccountVerified,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Error in getUserData controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}