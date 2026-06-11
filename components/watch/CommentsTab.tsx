'use client';

import React, { useState } from 'react';
import { User, MessageSquare, ThumbsUp } from 'lucide-react';

interface VideoComment {
  id: string;
  user: string;
  text: string;
  timeAgo: string;
  likes: number;
}

// BACKEND INTEGRATION:
// Replace mock comments with GET /api/v1/videos/{videoId}/comments.
// Submit comments with POST /api/v1/videos/{videoId}/comments.
const MOCK_COMMENTS: VideoComment[] = [
  { id: 'c1', user: 'KampalaKid', text: 'That knockout was insane! Best fight of the year.', timeAgo: '2 hours ago', likes: 124 },
  { id: 'c2', user: 'BoxingFan99', text: 'I feel like the ref stopped it too early.', timeAgo: '3 hours ago', likes: 45 },
  { id: 'c3', user: 'NaraAdmin', text: 'Full replay will be up shortly for those who missed the start.', timeAgo: '4 hours ago', likes: 312 },
];

export default function CommentsTab() {
  const [comments, setComments] = useState<VideoComment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // BACKEND INTEGRATION: POST comment to API
    const comment: VideoComment = {
      id: Date.now().toString(),
      user: 'You',
      text: newComment,
      timeAgo: 'Just now',
      likes: 0,
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const isLoggedIn = true; // BACKEND INTEGRATION: real auth state

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pt-4">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <MessageSquare className="w-5 h-5 text-gray-400" />
        <h3 className="font-bold text-white uppercase tracking-wider text-sm">{comments.length} Comments</h3>
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        
        {isLoggedIn ? (
          <form onSubmit={handleComment} className="flex-1 flex flex-col gap-2">
            <textarea 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 focus:border-[#45E3FF] transition-colors resize-none py-2 text-sm text-white placeholder-gray-500 focus:outline-none min-h-[40px]"
              rows={2}
            />
            {newComment.trim() && (
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setNewComment('')} className="text-gray-400 hover:text-white text-xs font-bold uppercase px-4 py-2 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-[#45E3FF] text-black text-xs font-bold uppercase px-6 py-2 rounded-sm transition-colors hover:bg-white">
                  Comment
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="flex-1 flex items-center bg-white/5 px-4 py-3 border border-white/5 rounded-sm">
            <span className="text-sm text-gray-400">Log in to leave a comment. </span>
            <button className="ml-2 text-[#45E3FF] hover:underline text-sm font-bold transition">Sign In</button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {comments.map(c => (
          <div key={c.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-200 text-sm">{c.user}</span>
                <span className="text-xs text-gray-500">{c.timeAgo}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
              
              <div className="flex items-center gap-4 mt-1">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-white transition group text-xs font-bold">
                  <ThumbsUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                  {c.likes > 0 && c.likes}
                </button>
                <button className="text-gray-500 hover:text-white text-xs font-bold uppercase transition">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
