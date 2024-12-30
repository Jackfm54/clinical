let io;

const initSocket = (serverIo) => {
  io = serverIo;

  // Escuchar eventos de conexión
  io.on("connection", (socket) => {
    console.log("WebSocket connected:", socket.id);

    // Escuchar eventos personalizados (puedes agregar más si es necesario)
    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);

      // Emitir notificación a todos los clientes
      io.emit("notification", { message });
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected:", socket.id);
    });
  });
};

const sendNotification = (message) => {
  if (io) {
    io.emit("notification", message);
  } else {
    console.error("Socket.io not initialized");
  }
};

module.exports = { initSocket, sendNotification };
