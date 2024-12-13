import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface Message {
  text: string;
  sender: 'user' | 'ai';
  id: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const messageId = Date.now().toString();
    
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', id: messageId }]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const prompt = `As a supportive AI counselor focused on women's safety in India, please respond to the following concern: ${userMessage}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text, sender: 'ai', id: Date.now().toString() }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'ai',
        id: Date.now().toString()
      }]);
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-muted p-4 rounded-xl">
                <div className="flex space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
      
      <CardContent className="p-4 border-t">
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your concerns safely..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}