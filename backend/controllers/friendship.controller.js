import prisma from "../db/prisma.js"

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.userId;
        const { receiverId } = req.body;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        if (receiverId === senderId) {
            return res.status(400).json({ message: "Cannot send friend request to yourself." });
        }

        const receiver = await prisma.user.findUnique({
            where: { id: receiverId },
        });

        if (!receiver) {
            return res.status(400).json({ message: "Receiver not found." });
        }

        const newRequest = await prisma.friendRequest.create({
            data: {
                senderId,
                receiverId
            }
        });
        res.status(200).json({ message: "Friend request sent successfully", request: newRequest });
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const acceptFriendRequest = async (req, res) => {
  try {
    const receiverId = req.userId;
    const { senderId } = req.body;

    if (!senderId) {
      return res.status(400).json({ message: "Sender ID is required" });
    }

    // 1️⃣ Find pending request
    const friendRequest = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status !== "PENDING") {
      return res.status(400).json({ message: "Friend request already handled" });
    }

    // 2️⃣ Transaction: update request + create friends
    await prisma.$transaction([
      prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId,
            receiverId,
          },
        },
        data: {
          status: "ACCEPTED",
          respondedAt: new Date(),
        },
      }),

      prisma.friend.createMany({
        data: [
          { userId: senderId, friendId: receiverId },
          { userId: receiverId, friendId: senderId },
        ],
        skipDuplicates: true,
      }),
    ]);

    res.status(200).json({ message: "Friend request accepted successfully" });

  } catch (error) {
    console.error("Error in acceptFriendRequest controller", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};


export const getPendingSentRequests = async (req, res) => {
    try {
        const userId = req.userId;
        const sentRequests = await prisma.friendRequest.findMany({
            where: {
                senderId: userId
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        profileImage: true
                    }
                }
            }
        });

        if (sentRequests.length === 0) {
            return res.status(200).json({ message: "No sent friend requests found.", sentRequests: [] });
        }

        const pendingRequests = sentRequests.filter(request => request.status === 'PENDING');

        if (pendingRequests.length === 0) {
            return res.status(200).json({ message: "No pending friend requests found.", sentRequests: [] });
        }


        res.status(200).json({ message: "Sent friend requests retrieved successfully", sentRequests: pendingRequests });
    } catch (error) {
        console.error("Error in getAllPendingSentRequests controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const getPendingReceivedRequests = async (req, res) => {
    try {
        const userId = req.userId;
        const receivedRequests = await prisma.friendRequest.findMany({
            where: {
                receiverId: userId,
                status: "PENDING"
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        profileImage: true
                    }
                }
            }
        });

        if (receivedRequests.length === 0) {
            return res.status(200).json({ message: "No pending received friend requests found.", receivedRequests: [] });
        }

        const pendingRequests = receivedRequests.filter(request => request.status === 'PENDING');

        if (pendingRequests.length === 0) {
            return res.status(200).json({ message: "No pending received friend requests found.", receivedRequests: [] });
        }

        res.status(200).json({ message: "Received pending friend requests retrieved successfully", receivedRequests: pendingRequests });
    } catch (error) {
        console.error("Error in getPendingReceivedRequests controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const getAllSentRequests = async (req,res) => {
     try {
        const userId = req.userId;
        const sentRequests = await prisma.friendRequest.findMany({
            where: {
                senderId: userId
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        profileImage: true
                    }
                }
            }
        });

        if (sentRequests.length === 0) {
            return res.status(200).json({ message: "No sent friend requests found.", sentRequests: [] });
        }

        res.status(200).json({ message: "Sent friend requests retrieved successfully", sentRequests: sentRequests });
    } catch (error) {
        console.error("Error in getAllSentRequests controller", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}
