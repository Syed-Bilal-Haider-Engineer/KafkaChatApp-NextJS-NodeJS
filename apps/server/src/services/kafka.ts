import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import main from "./prisma";

// Kafka Configuration
const kafka = new Kafka({
  brokers: ["kafka-23b1bd61-nanthealth-396f.e.aivencloud.com:21524"],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    username: "avnadmin",
    password: "AVNS_erhdY0sGeaPDclEEW5c",
    mechanism: "plain",
  },
});

let producer: Producer | null = null;

// Create and connect Kafka producer
export async function createProducer(): Promise<Producer> {
  if (producer) return producer;

  producer = kafka.producer();
  await producer.connect();
  return producer;
}

// Produce a message to Kafka topic
export async function produceMessage(message: string): Promise<boolean> {
  const producer = await createProducer();
  try {
    await producer.send({
      messages: [{ key: `message-${Date.now()}`, value: message }],
      topic: "MESSAGES",
    });
    return true;
  } catch (error) {
    console.error("Failed to send message:", error);
    return false;
  }
}

// Start Kafka message consumer
export async function startMessageConsumer() {
  console.log("Consumer is running...");
  
  const consumer = kafka.consumer({ groupId: "default" });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

    await consumer.run({
      autoCommit: true,
      eachMessage: async ({ message, pause }) => {
        if (!message.value) return;

        console.log(`New Message Received...`);
        try {
          await main(String(message.value));
        } catch (error) {
          console.error("Error processing message:", error);
          pause();
          setTimeout(() => consumer.resume([{ topic: "MESSAGES" }]), 60000);
        }
      },
    });
  } catch (error) {
    console.error("Failed to start consumer:", error);
    process.exit(1);
  }
}

export default kafka;
