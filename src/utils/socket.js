const socket = require("socket.io");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinChat", ({ firstName, targetUserId, loggedInuserId }) => {

            // ✅ safety check
            if (!targetUserId || !loggedInuserId) {
                console.log("❌ Invalid join data");
                return;
            }

            const roomId = [loggedInuserId, targetUserId].sort().join("_");

            console.log("✅ JOIN:", firstName, roomId);

            socket.join(roomId);
        });

        socket.on("sendMessage", ({ firstName, targetUserId, loggedInuserId, text }) => {

            if (!targetUserId || !loggedInuserId) {
                console.log("❌ Invalid message data");
                return;
            }

            const roomId = [loggedInuserId, targetUserId].sort().join("_");

            console.log("📩 MESSAGE:", text, "ROOM:", roomId);

            io.to(roomId).emit("messageRecieved", {
                firstName,
                text,
                senderId: loggedInuserId,
                time: new Date().toISOString()
            });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = initializeSocket;