import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User,
  Loader2,
  MessageCircle
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function HiTechBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! Welcome to Khalsa Hitech Enterprises! I'm HiTech Bot, your AI assistant. Ask me anything about computer services, online applications, or government schemes in Punjab. \n\nਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ? How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: () => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or call us at 7009073061 for immediate assistance.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const suggestedQuestions = [
    "How to apply for driving licence?",
    "PAN card kaise banwaye?",
    "Fard online check kaise kare?",
    "Ayushman card apply",
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg"
              onClick={() => setIsOpen(true)}
              data-testid="button-open-chat"
            >
              <MessageCircle className="w-7 h-7" />
            </Button>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[80vh] flex flex-col"
          >
            <Card className="flex flex-col h-[600px] max-h-[80vh] shadow-2xl border-orange-200">
              {/* Header */}
              <CardHeader className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg flex-shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        HiTech Bot
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          <Sparkles className="w-2.5 h-2.5 mr-1" />
                          AI
                        </Badge>
                      </CardTitle>
                      <p className="text-xs text-orange-100">Powered by Gemini</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                    data-testid="button-close-chat"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                            message.role === "user"
                              ? "bg-orange-500 text-white rounded-tr-sm"
                              : "bg-muted text-foreground rounded-tl-sm"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {chatMutation.isPending && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Suggested Questions */}
                  {messages.length <= 1 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">Try asking:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto py-1.5 px-3"
                            onClick={() => {
                              setInput(question);
                              inputRef.current?.focus();
                            }}
                            data-testid={`button-suggestion-${index}`}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={chatMutation.isPending}
                    data-testid="input-chat-message"
                  />
                  <Button
                    size="icon"
                    className="rounded-full bg-orange-500 hover:bg-orange-600 flex-shrink-0"
                    onClick={handleSend}
                    disabled={!input.trim() || chatMutation.isPending}
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
