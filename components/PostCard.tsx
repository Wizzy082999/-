import React, { useState, useRef } from 'react';
import { MemoryPost, AppMode } from '../types';
import { Heart, Trash2, Edit3, Save, X } from 'lucide-react';

interface PostCardProps {
  post: MemoryPost;
  mode: AppMode;
  onLikePost: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onUpdatePost?: (postId: string, data: Partial<MemoryPost>) => void;
  onTriggerEasterEgg: () => void; // New prop for the 23 clicks
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  mode, 
  onLikePost, 
  onDeletePost,
  onUpdatePost,
  onTriggerEasterEgg
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Easter egg state
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Editing State
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDate, setEditDate] = useState(post.date);
  const [editContent, setEditContent] = useState(post.content);

  const handleLikeClick = () => {
    // Standard like action
    onLikePost(post.id);

    // Easter Egg Logic
    clickCountRef.current += 1;

    // If they stop clicking for 2 seconds, reset the counter (optional, keeps it "consecutive")
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    if (clickCountRef.current === 23) {
      onTriggerEasterEgg();
      clickCountRef.current = 0; // Reset after triggering
    }
  };

  const handleSaveEdit = () => {
    if (onUpdatePost) {
      onUpdatePost(post.id, {
        title: editTitle,
        date: editDate,
        content: editContent
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(post.title);
    setEditDate(post.date);
    setEditContent(post.content);
    setIsEditing(false);
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl mb-16 max-w-3xl mx-auto transition-all hover:shadow-2xl hover:bg-white/15 relative group animate-fade-in-up">
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-start gap-4 relative z-20">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-christmas-gold font-cute text-xl focus:outline-none focus:ring-2 focus:ring-christmas-green"
                placeholder="输入标题..."
              />
              <input 
                type="date" 
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-christmas-green"
              />
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-cute text-christmas-gold leading-snug">{post.title}</h3>
              <span className="text-sm text-gray-300 block mt-1 font-mono opacity-80">{post.date}</span>
            </>
          )}
        </div>

        {/* Controls (Edit, Delete) - Only visible in Editor Mode */}
        {mode === 'editor' && (
          <div className="flex items-center gap-2 shrink-0 bg-black/20 p-1 rounded-lg backdrop-blur-md z-50">
              {isEditing ? (
                <>
                   <button 
                    onClick={handleSaveEdit}
                    className="p-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg"
                    title="保存修改"
                  >
                    <Save size={16} />
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="p-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors shadow-lg"
                    title="取消"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded hover:bg-white/10 text-blue-300 transition-colors"
                  title="编辑帖子"
                >
                  <Edit3 size={18} />
                </button>
              )}
              
              {/* Delete Button - Always Red, Always Visible in Editor Mode */}
              {onDeletePost && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Call delete directly
                    onDeletePost(post.id);
                  }}
                  className="p-2 rounded hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer relative z-50"
                  title="删除这条回忆"
                  type="button"
                >
                  <Trash2 size={18} />
                </button>
              )}
          </div>
        )}
      </div>

      {/* Media - Adaptive Size Fix - Only render if URL exists */}
      {post.mediaUrl && (
        <div className="w-full bg-black/20 flex justify-center items-center min-h-[200px]">
          {post.mediaType === 'video' ? (
            <video src={post.mediaUrl} controls className="w-full h-auto max-h-[80vh]" />
          ) : (
            <img 
              src={post.mediaUrl} 
              alt={post.title} 
              className="max-w-full max-h-[80vh] object-contain w-auto h-auto" 
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          <textarea 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={5}
            className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white font-sans focus:outline-none focus:ring-2 focus:ring-christmas-green resize-none"
            placeholder="输入回忆内容..."
          />
        ) : (
          <p className="text-lg leading-relaxed font-sans mb-6 whitespace-pre-wrap text-gray-100">{post.content}</p>
        )}
        
        {/* Likes Only Bar */}
        <div className="flex items-center justify-end border-t border-white/10 pt-4">
          <button 
            onClick={handleLikeClick}
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group select-none"
          >
            <span className="font-bold text-sm">{post.likes} 喜欢</span>
            <div className="p-2 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 transition-all transform group-active:scale-150">
              <Heart size={24} className={post.likes > 0 ? "fill-current" : ""} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};