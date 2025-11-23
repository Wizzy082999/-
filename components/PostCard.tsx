
import React, { useState, useRef, useEffect } from 'react';
import { MemoryPost, AppMode } from '../types';
import { Heart, Trash2, Edit3, Save, X, ImageOff, Loader2 } from 'lucide-react';

// --- SafeImage Component (The Diagnostic Detective) ---
interface SafeImageProps {
  src: string;
  alt: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  
  useEffect(() => {
    setStatus('loading');
  }, [src]);

  if (status === 'error') {
    return (
      <div className="w-full bg-gray-900 border-2 border-red-500 rounded-lg p-4 flex flex-col items-center text-center gap-3 my-2">
        <div className="bg-red-500/20 p-3 rounded-full animate-pulse">
           <ImageOff className="text-red-400" size={32} />
        </div>
        <h4 className="text-red-300 font-bold font-sans text-lg">图片加载失败</h4>
        
        <div className="bg-black/80 p-3 rounded text-sm font-mono text-yellow-400 w-full break-all border border-white/20">
           {src}
        </div>

        <div className="text-sm text-gray-300 text-left space-y-2 bg-white/10 p-3 rounded w-full">
          <p className="font-bold text-white border-b border-gray-500 pb-1 mb-2">排查步骤：</p>
          <ul className="list-decimal list-inside space-y-1 text-xs md:text-sm">
             <li>请确认 GitHub 仓库的 <code className="bg-gray-700 px-1 rounded text-green-300">public/images</code> 文件夹里真的有这张图。</li>
             <li><strong className="text-red-400">文件名必须完全一致！</strong> 比如 <code className="text-yellow-300">Photo.jpg</code> 和 <code className="text-yellow-300">photo.jpg</code> 是不一样的。</li>
             <li>如果你看到上面的黄色路径是 <code className="text-yellow-300">/images/xxx.jpg</code>，那说明路径是对的，通常是文件名拼错了或者文件没上传成功。</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center min-h-[100px]">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg z-10">
          <Loader2 className="animate-spin text-christmas-gold" size={32} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`max-w-full max-h-[80vh] object-contain w-auto h-auto rounded-lg transition-opacity duration-300 ${status === 'loading' ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setStatus('success')}
        onError={() => setStatus('error')}
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

      {/* Media Section with Error Handling */}
      {post.mediaUrl && (
        <div className="w-full bg-black/20 flex justify-center items-center min-h-[100px] p-2">
          {post.mediaType === 'video' ? (
            <video src={post.mediaUrl} controls className="w-full h-auto max-h-[80vh] rounded" />
          ) : (
            <SafeImage src={post.mediaUrl} alt={post.title} />
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
