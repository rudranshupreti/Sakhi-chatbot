import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function InputBar({ onSendMessage, disabled = false }: InputBarProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-4xl items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
          className="max-h-32 min-h-[2.75rem] resize-none rounded-2xl border-input bg-card text-[15px] leading-relaxed focus-visible:ring-primary"
          disabled={disabled}
          data-testid="input-message"
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-11 w-11 shrink-0 rounded-full"
            disabled={disabled}
            data-testid="button-mic"
            onClick={() => console.log('Microphone clicked')}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary/80"
            disabled={disabled || !message.trim()}
            data-testid="button-send"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
