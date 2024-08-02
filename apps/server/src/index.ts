import express from 'express';
import { createServer } from 'http';
import Redis from 'ioredis';
import { Server } from 'socket.io';
import cors from 'cors';
import { produceMessage, startMessageConsumer } from './services/kafka';
import { prisma } from './services/prisma'; // Importing prisma if needed

// Redis configuration
const redisOptions = {
  host: 'caching-17a977eb-nanthealth-396f.e.aivencloud.com',
  port: 21511,
  username: 'default',
  password: 'AVNS_8iFdJ0z_GtYFn6b56L3',
};

const pub = new Redis(redisOptions);
const sub = new Redis(redisOptions);

// Express and Socket.IO setup
const app = express();
const server = createServer(app);

app.use(cors({
  origin: 'http://localhost:8000',
  methods: ["GET", "POST"],
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('message', async ({ message }: { message: string }) => {
    console.log(`Received message: ${message}`);
    try {
      await pub.publish("MESSAGES", JSON.stringify({ message }));
      await produceMessage(message);
    } catch (error) {
      console.error("Failed to publish or produce message:", error);
    }
  });
});

// Redis subscription
sub.subscribe("MESSAGES", (error) => {
  if (error) {
    console.error("Failed to subscribe to channel:", error);
  }
});

sub.on("message", (channel, message) => {
  if (channel === "MESSAGES") {
    console.log(`New message from Redis: ${message}`);
    io.emit("message", message);
  } else {
    console.error(`Received message on unexpected channel: ${channel}`);
  }
});

// Start Kafka consumer
startMessageConsumer().catch(error => {
  console.error("Failed to start Kafka consumer:", error);
  process.exit(1);
});

// Server startup
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
