'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isAdmin?: boolean;
}

// BACKEND INTEGRATION:
// Replace mock chat messages with GET /api/v1/live-events/{eventId}/chat/messages.
// Real-time chat can be connected here using the selected broadcast driver.
// Sending message should POST to /api/v1/live-events/{eventId}/chat/messages.
const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'BoxingFan99', text: 'Let\'s go!! 🥊', timestamp: '12:00PM' },
  { id: '2', user: 'NaraAdmin', text: 'Welcome to the live chat! Keep it respectful.', timestamp: '12:01PM', isAdmin: true },
  { id: '3', user: 'KampalaKid', text: 'What time is the main event?', timestamp: '12:05PM' },
];

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!isPaused) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPaused]);

  // BACKEND INTEGRATION: 
  // Add effect here to listen to Echo/WebSocket channel for new messages.
  // e.g. Echo.channel(`live-event.${eventId}`).listen('ChatMessageSent', (msg) => setMessages(prev => [...prev, msg]))

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 10;
    setIsPaused(!isAtBottom);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Send the message, then append the accepted response.
    const msg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
    setIsPaused(false);
  };

  const isLoggedIn = true; // BACKEND INTEGRATION: check true auth state

  return (
    <div className="flex flex-col h-[500px] bg-[#0a1017] border border-white/5 rounded-sm">
      <div className="p-4 border-b border-white/5 bg-[#121922] flex justify-between items-center">
        <h3 className="font-bold text-white uppercase tracking-wider text-sm">Live Chat</h3>
        <span className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          Live
        </span>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        {messages.map(msg => (
          <div key={msg.id} className="flex items-start gap-3 text-sm">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.isAdmin ? 'bg-[#eaff04] text-black' : 'bg-white/10 text-white'}`}>
              <User className="w-3 h-3" />
            </div>
            <div className="flex-1 leading-snug">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className={`font-bold ${msg.isAdmin ? 'text-[#eaff04]' : 'text-gray-300'}`}>
                  {msg.user}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">{msg.timestamp}</span>
              </div>
              <p className="text-gray-300 break-words">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isPaused && (
        <button 
          onClick={() => setIsPaused(false)}
          className="absolute bottom-[70px] left-1/2 -translate-x-1/2 bg-[#2a3038] hover:bg-[#343b45] text-white text-xs px-3 py-1 rounded-full shadow-lg transition"
        >
          Resume auto-scroll
        </button>
      )}

      <div className="p-3 border-t border-white/5 bg-[#121922]">
        {isLoggedIn ? (
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Chat publicly..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-[#eaff04] transition-colors"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-[#eaff04] disabled:bg-white/10 disabled:text-gray-500 text-black px-4 py-2 rounded-sm flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center py-2">
            <span className="text-xs text-gray-400">Please </span>
            <button className="text-[#eaff04] hover:underline text-xs font-bold uppercase transition">log in</button>
            <span className="text-xs text-gray-400"> to connect.</span>
          </div>
        )}
      </div>
    </div>
  );
}
