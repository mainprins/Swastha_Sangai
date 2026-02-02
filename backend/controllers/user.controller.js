import prisma from "../db/prisma.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
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
                email: user.email,
                age: user.age,
                weight: user.weight,
                height: user.height,
                goal: user.goal,
            }
        })
    } catch (error) {
        console.error("Error in getUserData controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const updateFitnessProfile = async (req,res) => {
    try {
        const userId = req.userId;
        const { age, weight, height, goal } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                age,
                weight,
                height,
                goal
            }
        });
        res.status(200).json({
            message: "Fitness profile updated successfully",
            userData: {
                age: updatedUser.age,
                weight: updatedUser.weight,
                height: updatedUser.height,
                goal: updatedUser.goal}
        });
    } catch (error) {
        console.error("Error in updateFitnessProfile controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}