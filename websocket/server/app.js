const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const wsServer = new WebSocketServer({ port: 8080 });
const clients = [];

wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Recieved a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
});
