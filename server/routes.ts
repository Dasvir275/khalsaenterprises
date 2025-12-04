import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chat } from "./gemini";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/chat", async (req, res) => {
    try {
      const result = chatSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid message" });
      }
      
      const { message } = result.data;
      const response = await chat(message);
      
      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Failed to process your request",
        response: "I apologize, but I'm having trouble right now. Please try again or call us at 7009073061 for immediate assistance."
      });
    }
  });

  return httpServer;
}
