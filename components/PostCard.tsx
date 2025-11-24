

import React, { useState, useRef, useEffect } from 'react';
import { MemoryPost, AppMode } from '../types';
import { Heart, Trash2, Edit3, Save, X, ImageOff, Loader2, Upload, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

// --- SafeImage Component (The Diagnostic Detective) ---
interface SafeImageProps {
  src: string;
  alt: string;
  className?: string; // Allow passing styles
  onClick?: () => void;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className, onClick }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [tempSrc, setTempSrc] = useState<string | null>(null);
  
  // Reset state when the source prop changes
  useEffect(() => {
    setStatus('loading');
    setTempSrc(null);
  }, [src]);

  const handleTempUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTempSrc(objectUrl);
      setStatus('success');
    }
  };

  if (status === 'error' && !tempSrc) {
    const fileName = src.split('/').pop();

    return (
      <div className={`w-full bg-gray-900 border-2 border-red-500 rounded-lg p-2 flex flex-col items-center text-center gap-2 animate-fade-in ${className}`}>
        <div className="bg-red-500/20 p-2 rounded-full">
           <ImageOff className="text-red-400" size={20} />
        </div>
        <p className="text-red-300 font-bold text-xs">加载失败</p>
        <code className="text-[10px] font-mono text-yellow-400 break-all">{fileName}</code>
        
        {/* Temporary Repair Button - Mini Version */}
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs cursor-pointer mt-1">
            <input type="file" accept="image/*" className="hidden" onChange={handleTempUpload} />
            上传修复
        </label>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden ${className || 'w-full flex justify-center min-h-[100px]'}`} onClick={onClick}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10">
          <Loader2 className="animate-spin text-christmas-gold" size={24} />
        </div>
      )}
      
      <img 
        src={tempSrc || src} 
        alt={alt} 
        className={`transition-opacity duration-300 ${status === 'loading' ? 'opacity-0' : 'opacity-100'} ${className ? 'w-full h-full object-cover' : 'max-w-full max-h-[80vh] object-contain w-auto h-auto rounded-lg'}`}
        onLoad={() => setStatus('success')}
        onError={() => {
            if (!tempSrc) setStatus('error');
        }}
      />
    </div>
  );
};

interface PostCardProps {
  post: MemoryPost;
  mode: AppMode;
  onLikePost: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onUpdatePost?: (postId: string, data: Partial<MemoryPost>) => void;
  onTriggerEasterEgg: () => void; 
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

  // Determine images to display (Backwards compatibility)
  const displayImages = post.images && post.images.length > 0 
      ? post.images 
      : (post.mediaUrl && post.mediaType === 'image' ? [post.mediaUrl] : []);

  const handleLikeClick = () => {
    onLikePost(post.id);

    clickCountRef.current += 1;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    if (clickCountRef.current === 23) {
      onTriggerEasterEgg();
      clickCountRef.current = 0; 
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

  // Helper for grid layout
  const getGridClass = (count: number) => {
      if (count === 1) return ""; // Single image handled separately
      if (count === 2 || count === 4) return "grid-cols-2 max-w-sm"; // 2 or 4 images = 2 columns
      return "grid-cols-3 max-w-md"; // 3, 5-9 images = 3 columns
  };

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
              <div className="flex items-center gap-1.5 mt-2 text-xs md:text-sm text-pink-200/90 font-mono bg-pink-500/10 border border-pink-500/20 px-2 py-1 rounded w-fit">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
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
              
              {onDeletePost && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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

      {/* Media Section */}
      <div className="w-full bg-black/20 p-2">
        {post.mediaType === 'video' && post.mediaUrl ? (
             <div className="flex justify-center">
                 <video src={post.mediaUrl} controls className="w-full h-auto max-h-[80vh] rounded" />
             </div>
        ) : displayImages.length > 0 ? (
             // Image Logic
             displayImages.length === 1 ? (
                 // Single Image (Normal display)
                 <SafeImage src={displayImages[0]} alt={post.title} />
             ) : (
                 // Multiple Images (WeChat Grid Style)
                 <div className={`grid gap-1 mx-auto ${getGridClass(displayImages.length)}`}>
                     {displayImages.map((img, idx) => (
                         <SafeImage 
                            key={idx} 
                            src={img} 
                            alt={`${post.title}-${idx}`} 
                            className="w-full aspect-square object-cover rounded hover:opacity-90 transition-opacity cursor-pointer"
                         />
                     ))}
                 </div>
             )
        ) : null}
      </div>

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
