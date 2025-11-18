// API routes for Sakhi wellness chatbot
// Reference: javascript_log_in_with_replit blueprint

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Conversation routes
  app.get('/api/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const conversations = await storage.getConversationsByUserId(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.get('/api/conversations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      
      // Verify ownership
      const userId = req.user.claims.sub;
      if (conversation.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });

  app.post('/api/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertConversationSchema.parse({
        ...req.body,
        userId,
      });

      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: "Failed to create conversation" });
    }
  });

  app.patch('/api/conversations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Verify ownership
      const userId = req.user.claims.sub;
      if (conversation.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const { title } = req.body;
      const updated = await storage.updateConversation(req.params.id, title);
      res.json(updated);
    } catch (error) {
      console.error("Error updating conversation:", error);
      res.status(500).json({ message: "Failed to update conversation" });
    }
  });

  app.delete('/api/conversations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Verify ownership
      const userId = req.user.claims.sub;
      if (conversation.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await storage.deleteConversation(req.params.id);
      res.json({ message: "Conversation deleted" });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ message: "Failed to delete conversation" });
    }
  });

  // Message routes
  app.get('/api/conversations/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Verify ownership
      const userId = req.user.claims.sub;
      if (conversation.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const messages = await storage.getMessagesByConversationId(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/chat', isAuthenticated, async (req: any, res) => {
    try {
      const { conversationId, content } = req.body;

      // Verify conversation ownership
      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const userId = req.user.claims.sub;
      if (conversation.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId,
        content,
        sender: "user",
      });

      // TODO: Replace with actual AI integration
      // For now, generate a simple response
      const botResponse = getBotResponse(content);

      // Save bot message
      const botMessage = await storage.createMessage({
        conversationId,
        content: botResponse,
        sender: "bot",
      });

      res.json({ userMessage, botMessage });
    } catch (error) {
      console.error("Error processing chat:", error);
      res.status(500).json({ message: "Failed to process chat" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// TODO: Replace with actual AI integration
function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("yoga") || lowerMessage.includes("pose")) {
    return "Wonderful! Yoga is such a transformative practice. Whether you're looking for morning energizers, relaxation poses, or building strength, I'm here to guide you. What aspect of yoga would you like to explore today?";
  }
  
  if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("calm")) {
    return "I understand. Taking care of your mental wellbeing is so important. Let's work together on some calming practices. Would you like to try some breathing exercises, a gentle yoga flow, or perhaps a guided meditation?";
  }
  
  if (lowerMessage.includes("begin") || lowerMessage.includes("start") || lowerMessage.includes("new")) {
    return "That's beautiful! Starting a wellness journey takes courage. I'm here to support you every step of the way. Let's begin with something gentle - would you like to start with basic breathing techniques or simple stretches?";
  }
  
  if (lowerMessage.includes("morning")) {
    return "Morning yoga is a wonderful way to start your day! I can guide you through a gentle 10-15 minute flow that will energize your body and calm your mind. We could include Sun Salutations, gentle stretches, and some breathing exercises. Would you like to begin?";
  }
  
  return "Thank you for sharing that with me. I'm here to support your wellness journey in whatever way feels right for you. Whether it's yoga guidance, stress management, or just someone to talk to about your wellbeing - I'm listening. What would you like to explore?";
}
