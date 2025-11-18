import { useState, useRef, useEffect } from "react";
import { useAuth, logout } from "@/lib/firebaseAuth";

import {
  useConversations,
  useCreateConversation,
  useDeleteConversation,
} from "@/hooks/useConversations";

import { useMessages, useSendMessage } from "@/lib/useMessages";

import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import LoadingDots from "@/components/LoadingDots";
import InputBar from "@/components/InputBar";
import ChatSidebar from "@/components/ChatSidebar";
import SuggestionChips from "@/components/SuggestionChips";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function ChatWindow() {
  // AUTH
  const { user, loading } = useAuth();

  // ----------------------------
  // LOAD USER CONVERSATIONS
  // ----------------------------
  const userId = user?.uid;

  const { data: conversations = [] } = useConversations(userId!, {
    enabled: !!userId,
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // LOAD MESSAGES FOR ACTIVE CONVERSATION
  const { data: messages = [], isLoading: isLoadingMessages } =
    useMessages(activeConversationId);

  const createConversation = useCreateConversation();
  const deleteConversation = useDeleteConversation();
  const sendMessage = useSendMessage();

  // UI state
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Morning yoga routine for beginners",
    "Help with stress and anxiety",
    "Breathing exercises",
    "Meditation guidance",
  ];

  // ----------------------------
  // DEFAULT ACTIVE CONVERSATION
  // ----------------------------
  useEffect(() => {
    if (user && conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
    }
  }, [user, conversations, activeConversationId]);

  // AUTO SCROLL
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sendMessage.isPending]);

  // SUGGESTION LOGIC
  useEffect(() => {
    setShowSuggestions(messages.length === 1 && messages[0]?.sender === "bot");
  }, [messages]);

  // ----------------------------
  // CONDITIONAL RETURNS
  // ----------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading your wellness journey...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Please login first!
      </div>
    );
  }

  // ----------------------------
  // ACTION HANDLERS
  // ----------------------------
  const handleNewConversation = async () => {
    const newConv = await createConversation.mutateAsync({
      userId: user.uid,
      title: "New conversation",
    });

    setActiveConversationId(newConv.id);
    setShowSuggestions(true);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation.mutateAsync(id);

    const updated = conversations.filter((c) => c.id !== id);

    if (id === activeConversationId) {
      if (updated.length > 0) {
        setActiveConversationId(updated[0].id);
      } else {
        setActiveConversationId(null);
        await handleNewConversation();
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) {
      const newConv = await createConversation.mutateAsync({
        userId: user.uid,
        title: content.slice(0, 40),
      });

      setActiveConversationId(newConv.id);

      await sendMessage.mutateAsync({
        conversationId: newConv.id,
        content,
      });
    } else {
      setShowSuggestions(false);

      await sendMessage.mutateAsync({
        conversationId: activeConversationId,
        content,
      });
    }
  };

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const userName = user.email || "Guest";

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">

        {/* Sidebar */}
        <ChatSidebar
          conversations={conversations.map((c) => ({
            id: c.id,
            title: c.title,
            timestamp: new Date(c.updatedAt!),
          }))}
          activeConversationId={activeConversationId || ""}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          onLogout={logout}
          userName={userName}
        />

        <div className="flex flex-1 flex-col">
          <Header />

          {/* Chat Header */}
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <span className="text-sm text-muted-foreground">
              {activeConversation?.title || "New conversation"}
            </span>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1">
            <div ref={scrollRef} className="mx-auto max-w-4xl space-y-6 px-4 py-6">
              {isLoadingMessages ? (
                <div className="flex justify-center py-8">
                  <LoadingDots />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg text-muted-foreground">
                    Namaste! I'm Sakhi, your wellness companion.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    I'm here to support you on your yoga and wellness journey.
                  </p>
                </div>
              ) : (
                messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    content={m.content}
                    sender={m.sender as "user" | "bot"}
                    timestamp={new Date(m.createdAt!)}
                  />
                ))
              )}

              {/* Bot typing */}
              {sendMessage.isPending && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent/80" />
                  <div className="flex items-center rounded-2xl bg-gradient-to-br from-accent to-accent/90 px-5 py-3">
                    <LoadingDots />
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {showSuggestions && !sendMessage.isPending && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Try asking about:</p>
                  <SuggestionChips
                    suggestions={suggestions}
                    onSuggestionClick={handleSendMessage}
                  />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <InputBar
            onSendMessage={handleSendMessage}
            disabled={sendMessage.isPending}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
