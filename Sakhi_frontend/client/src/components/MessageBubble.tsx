import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

export default function MessageBubble({ content, sender, timestamp }: MessageBubbleProps) {
  const isUser = sender === "user";

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.div
      className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      data-testid={`message-${sender}`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
        isUser 
          ? "bg-gradient-to-br from-primary to-primary/80" 
          : "bg-gradient-to-br from-accent to-accent/80"
      }`}>
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" data-testid="icon-user" />
        ) : (
          <Bot className="h-5 w-5 text-accent-foreground" data-testid="icon-bot" />
        )}
      </div>
      
      <div className={`flex max-w-[75%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-5 py-3 ${
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
              : "rounded-tl-sm bg-gradient-to-br from-accent to-accent/90 text-accent-foreground"
          }`}
          data-testid={`bubble-${sender}`}
        >
          <p className="text-[15px] leading-relaxed">{content}</p>
        </div>
        {timestamp && (
          <span className="px-1 text-xs text-muted-foreground" data-testid="text-timestamp">
            {timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  );
}
