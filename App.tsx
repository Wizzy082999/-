
import React, { useState, useEffect, useRef } from 'react';
import { WeatherLayer } from './components/WeatherLayer';
import { DraggableDecoration } from './components/DraggableDecoration';
import { PostCard } from './components/PostCard';
import { DIYPanel } from './components/DIYPanel';
import { AppMode, Chapter, MemoryPost, WeatherType, DecorationType, Decoration } from './types';
import { INITIAL_CHAPTERS, INITIAL_DECORATIONS } from './constants';
import { Edit2, Heart, Settings, X, Upload, Music, Plus, BookOpen, ArrowDownUp, Volume2, VolumeX, Pencil, Trash2, AlertTriangle, Download, Copy, EyeOff, Info, Image as ImageIcon, PlayCircle, Gift, ArrowRight, ArrowLeft, RotateCcw, Video } from 'lucide-react';

const App: React.FC = () => {
  // Mode State
  // 🎄 默认为 'viewer' (浏览模式)，给她看的时候是纯净的
  const [mode, setMode] = useState<AppMode>('viewer');
  
  // Start Screen State (For Autoplay and Volume Control)
  const [showStartScreen, setShowStartScreen] = useState(true);
  
  // Admin State - Default to FALSE. 
  // Click the heart icon 5 times to unlock admin features.
  const [isAdmin, setIsAdmin] = useState(false); 
  
  const [adminUnlockCount, setAdminUnlockCount] = useState(0);
  
  // Easter Egg State
  const [giantHeartVisible, setGiantHeartVisible] = useState(false);

  // State: Chapters
  // 🚀 修改逻辑：优先读取代码里的 INITIAL_CHAPTERS，确保部署后所有人看到的是最新的
  // 不再自动读取 localStorage，避免旧缓存导致内容不更新
  const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS);

  const [currentChapterId, setCurrentChapterId] = useState<string>(() => {
     // Also try to restore the last viewed chapter
     return chapters[0]?.id || 'c1';
  });

  const [isDIYPanelOpen, setIsDIYPanelOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false); 
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // New Export Modal

  // Delete Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'post' | 'chapter', id: string } | null>(null);

  // Local state for Hero Edit Modal
  const [heroEditTitle, setHeroEditTitle] = useState("");
  const [heroEditSubtitle, setHeroEditSubtitle] = useState("");
  const [isEditingHero, setIsEditingHero] = useState(false);
  
  // Sort State
  const [sortAscending, setSortAscending] = useState(true); 

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 🚀 新增：滚动容器 Ref，用于控制页面滚动
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(false); // Start unmuted, but browser policy might block
  const [autoPlayFailed, setAutoPlayFailed] = useState(false);

  // Form state for new post
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDate, setNewPostDate] = useState('');
  
  // Updated Post Form States for Multi-Image
  const [newPostType, setNewPostType] = useState<'image' | 'video'>('image');
  const [newPostFiles, setNewPostFiles] = useState<FileList | null>(null);
  const [newPostManualInput, setNewPostManualInput] = useState('');

  // Form state for Chapter
  const [chapterFormMode, setChapterFormMode] = useState<'create' | 'edit'>('create');
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterFormTitle, setChapterFormTitle] = useState('');
  const [chapterFormBGM, setChapterFormBGM] = useState<File | null>(null);
  const [chapterFormBgmUrlInput, setChapterFormBgmUrlInput] = useState('');
  // For previewing BGM in the modal
  const [previewBgmUrl, setPreviewBgmUrl] = useState('');

  const currentChapter = chapters.find(c => c.id === currentChapterId) || chapters[0];
  const displayHeroTitle = currentChapter?.heroTitle || "Merry Christmas";
  const displayHeroSubtitle = currentChapter?.heroSubtitle || "收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️";

  // Calculate Navigation Indices
  const currentChapterIndex = chapters.findIndex(c => c.id === currentChapterId);
  const prevChapter = chapters[currentChapterIndex - 1];
  const nextChapter = chapters[currentChapterIndex + 1];

  // Prevent overwriting localStorage on initial load
  const isFirstRender = useRef(true);

  // Save to localStorage whenever chapters change
  useEffect(() => {
    // 🚀 关键修改：第一次渲染时不保存，防止把空状态或代码状态覆盖到本地缓存中
    // 只有当你真正开始操作（导致 chapters 变化）时，才写入本地缓存
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('christmas_chapters', JSON.stringify(chapters));
  }, [chapters]);

  // 🚀 新增：每次切换章节时，强制回到顶部
  // 因为 overflow 是设在内部 div 上的，window.scrollTo 不起作用，必须操作 Ref
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentChapterId]);

  // 🚀 新增：手动恢复草稿功能
  const handleRecoverDraft = () => {
    const saved = localStorage.getItem('christmas_chapters');
    if (saved) {
      if (window.confirm("确认加载未保存的草稿？\n\n这会覆盖当前显示的内容。如果你之前编辑了一半没保存代码就刷新了，请点确定。")) {
        try {
          const parsed = JSON.parse(saved);
          setChapters(parsed);
          // 如果当前章节在新数据里不存在，重置为第一个
          if (!parsed.find((c: Chapter) => c.id === currentChapterId)) {
             setCurrentChapterId(parsed[0]?.id || 'c1');
          }
          alert("草稿已恢复！别忘了点击“保存代码”导出哦。");
        } catch (e) {
          console.error("Failed to parse saved chapters", e);
          alert("草稿文件损坏，无法恢复。");
        }
      }
    } else {
      alert("没有在本地找到已保存的草稿。");
    }
  };

  useEffect(() => {
    if (isEditingHero) {
      setHeroEditTitle(displayHeroTitle);
      setHeroEditSubtitle(displayHeroSubtitle);
    }
  }, [isEditingHero, displayHeroTitle, displayHeroSubtitle]);

  // --- AUDIO LOGIC 1: Handle Source Switching (Chapter Change) ---
  useEffect(() => {
    if (!audioRef.current || !currentChapter) return;

    // Default volume
    audioRef.current.volume = 0.5; 

    const newBgm = currentChapter.bgmUrl;
    
    // If the BGM source is different, change it.
    // Decode URI to handle Chinese characters in filenames if needed
    const currentSrc = decodeURIComponent(audioRef.current.src || "").split(window.location.origin)[1];
    
    if (newBgm && currentSrc !== newBgm && !newBgm.includes('undefined')) {
       console.log("Changing BGM to:", newBgm);
       audioRef.current.src = newBgm;
       
       // Only play if we passed the start screen
       if (!showStartScreen && !isMuted) {
         const playPromise = audioRef.current.play();
         if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay blocked during switch:", error);
                setAutoPlayFailed(true);
            });
         }
       }
    } else if (!newBgm) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [currentChapterId, showStartScreen]);

  // --- AUDIO LOGIC 2: Mute/Unmute Toggle ---
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.pause();
    } else {
       if (!showStartScreen && audioRef.current.src) {
           audioRef.current.play().catch(() => setAutoPlayFailed(true));
       }
    }
  }, [isMuted, showStartScreen]);

  const handleStartExperience = () => {
     setShowStartScreen(false);
     if (audioRef.current && currentChapter.bgmUrl) {
         audioRef.current.src = currentChapter.bgmUrl;
         audioRef.current.play().then(() => {
             setAutoPlayFailed(false);
         }).catch((e) => {
             console.error("Autoplay failed:", e);
             setAutoPlayFailed(true);
         });
     }
  };

  // Handlers
  const handleWeatherChange = (weather: WeatherType) => {
    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId ? { ...c, weather } : c
    );
    setChapters(updatedChapters);
  };

  const handleAddDecoration = (type: DecorationType) => {
    const newDecoration: Decoration = {
      id: `d-${Date.now()}`,
      type,
      x: 50, // Center
      y: 50, // Center
      scale: type === 'tree' ? 2.0 : 1.0,
      visible: true
    };

    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? { ...c, decorations: [...c.decorations, newDecoration] }
        : c
    );
    setChapters(updatedChapters);
  };

  const handleUpdateDecoration = (id: string, newPos: { x: number; y: number }) => {
    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? {
            ...c,
            decorations: c.decorations.map(d => 
              d.id === id ? { ...d, ...newPos } : d
            )
          }
        : c
    );
    setChapters(updatedChapters);
  };

  const handleRemoveDecoration = (type: DecorationType) => {
     // Remove the LAST added decoration of this type (LIFO)
     // so it feels natural to "undo" adding one
     const updatedChapters = chapters.map(c => {
         if (c.id !== currentChapterId) return c;
         
         // Find all indices of this type
         const indices = c.decorations
             .map((d, index) => d.type === type ? index : -1)
             .filter(index => index !== -1);
         
         if (indices.length === 0) return c;

         const lastIndex = indices[indices.length - 1];
         const newDecorations = [...c.decorations];
         newDecorations.splice(lastIndex, 1);

         return { ...c, decorations: newDecorations };
     });
     setChapters(updatedChapters);
  };

  // --- CHAPTER MANAGEMENT ---
  const openCreateChapterModal = () => {
      setChapterFormMode('create');
      setEditingChapterId(null);
      setChapterFormTitle('');
      setChapterFormBgmUrlInput('');
      setPreviewBgmUrl('');
      setIsChapterModalOpen(true);
  };

  const openEditChapterModal = (chapter: Chapter) => {
      setChapterFormMode('edit');
      setEditingChapterId(chapter.id);
      setChapterFormTitle(chapter.title);
      setChapterFormBgmUrlInput(chapter.bgmUrl || '');
      setPreviewBgmUrl(chapter.bgmUrl || '');
      setIsChapterModalOpen(true);
  };

  const handleSaveChapter = () => {
      if (!chapterFormTitle) {
          alert("请输入章节标题");
          return;
      }

      // Determine BGM URL: Prioritize file upload, then manual input
      let finalBgmUrl = chapterFormBgmUrlInput;
      if (chapterFormBGM) {
          finalBgmUrl = `/bgm/${chapterFormBGM.name}`;
      }
      // If user manually typed a simple filename like "song.mp3", prefix it
      if (finalBgmUrl && !finalBgmUrl.startsWith('http') && !finalBgmUrl.startsWith('/')) {
          finalBgmUrl = `/bgm/${finalBgmUrl}`;
      }

      if (chapterFormMode === 'create') {
          const newChapter: Chapter = {
              id: `c-${Date.now()}`,
              title: chapterFormTitle,
              heroTitle: "Merry Christmas",
              heroSubtitle: "新的篇章",
              weather: 'snow',
              decorations: JSON.parse(JSON.stringify(INITIAL_DECORATIONS)),
              bgmUrl: finalBgmUrl,
              posts: []
          };
          setChapters([...chapters, newChapter]);
          setCurrentChapterId(newChapter.id);
      } else if (chapterFormMode === 'edit' && editingChapterId) {
          setChapters(chapters.map(c => c.id === editingChapterId ? {
              ...c,
              title: chapterFormTitle,
              bgmUrl: finalBgmUrl
          } : c));
      }

      setIsChapterModalOpen(false);
      setChapterFormBGM(null);
  };

  const handleDeleteChapter = (id: string) => {
      if (chapters.length <= 1) {
          alert("至少保留一个章节哦！");
          setDeleteConfirm(null);
          return;
      }
      
      const newChapters = chapters.filter(c => c.id !== id);
      setChapters(newChapters);
      if (currentChapterId === id) {
          setCurrentChapterId(newChapters[0].id);
      }
      setDeleteConfirm(null);
  };

  // --- POST MANAGEMENT (Updated for Multi-Image) ---
  
  const handleCreatePost = () => {
    if (!newPostTitle || !newPostDate) {
      alert("标题和日期是必填的哦！");
      return;
    }

    let finalMediaUrl = '';
    let finalImages: string[] = [];

    if (newPostType === 'video') {
       if (newPostFiles && newPostFiles[0]) {
         finalMediaUrl = URL.createObjectURL(newPostFiles[0]);
       } else if (newPostManualInput) {
         finalMediaUrl = newPostManualInput.trim();
       }
    } else {
       // Image Logic
       if (newPostFiles && newPostFiles.length > 0) {
          // Temporary Mode: Multiple files selected via file input
          Array.from(newPostFiles).forEach(file => {
             finalImages.push(URL.createObjectURL(file));
          });
          // Primary mediaUrl backup
          if (finalImages.length > 0) finalMediaUrl = finalImages[0];
       } else if (newPostManualInput) {
          // Permanent Mode: Manual input (comma separated)
          // e.g. "/images/1.jpg, /images/2.jpg" or just "1.jpg, 2.jpg"
          const urls = newPostManualInput.split(/[,，]/).map(s => {
             let trimmed = s.trim();
             // Optional: smart prefix helper
             // if (!trimmed.startsWith('/') && !trimmed.startsWith('http')) {
             //    return `/images/${trimmed}`;
             // }
             return trimmed;
          }).filter(s => s.length > 0);
          
          finalImages = urls;
          if (finalImages.length > 0) finalMediaUrl = finalImages[0];
       }
    }

    const newPost: MemoryPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      date: newPostDate,
      content: newPostContent,
      mediaUrl: finalMediaUrl, // Keep for backward compat
      images: finalImages.length > 0 ? finalImages : undefined, // New: Multi-image array
      mediaType: newPostType,
      likes: 0
    };

    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? { ...c, posts: [newPost, ...c.posts] }
        : c
    );
    setChapters(updatedChapters);
    setIsPostModalOpen(false);
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostDate('');
    setNewPostFiles(null);
    setNewPostManualInput('');
  };

  const handleDeletePost = (postId: string) => {
     const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? { ...c, posts: c.posts.filter(p => p.id !== postId) }
        : c
    );
    setChapters(updatedChapters);
    setDeleteConfirm(null);
  };
  
  const handleUpdatePost = (postId: string, data: Partial<MemoryPost>) => {
      const updatedChapters = chapters.map(c => 
          c.id === currentChapterId 
            ? { 
                ...c, 
                posts: c.posts.map(p => p.id === postId ? { ...p, ...data } : p) 
              }
            : c
      );
      setChapters(updatedChapters);
  };

  const handleLikePost = (postId: string) => {
    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? {
            ...c,
            posts: c.posts.map(p => 
              p.id === postId ? { ...p, likes: p.likes + 1 } : p
            )
          }
        : c
    );
    setChapters(updatedChapters);
  };

  const handleSaveHeroEdit = () => {
    const updatedChapters = chapters.map(c => 
      c.id === currentChapterId 
        ? { ...c, heroTitle: heroEditTitle, heroSubtitle: heroEditSubtitle }
        : c
    );
    setChapters(updatedChapters);
    setIsEditingHero(false);
  }

  // Export / Import
  const handleExportData = () => {
    const dataStr = JSON.stringify(chapters, null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
        alert("JSON 代码已复制到剪贴板！\n\n请打开 constants.ts 文件，替换 INITIAL_CHAPTERS 的内容，这样你的修改就能永久保存了。");
        setIsExportModalOpen(false);
    });
  };

  const toggleAdmin = () => {
      setAdminUnlockCount(prev => prev + 1);
      if (adminUnlockCount + 1 >= 5) {
          setIsAdmin(!isAdmin);
          setAdminUnlockCount(0);
          alert(isAdmin ? "已退出管理员模式" : "管理员模式已开启！\n现在你可以编辑页面、添加删减内容了。");
      }
  };

  // Easter Egg Trigger
  const handleTriggerEasterEgg = () => {
      setGiantHeartVisible(true);
      setTimeout(() => setGiantHeartVisible(false), 3000);
  };

  const sortedPosts = [...currentChapter.posts].sort((a, b) => {
      return sortAscending 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (showStartScreen) {
    return (
      <div className="fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center text-center p-4">
         <WeatherLayer weather="starry" />
         <div className="relative z-10 animate-fade-in-up">
             <h1 className="font-handwriting text-6xl text-christmas-red mb-6 drop-shadow-[0_0_15px_rgba(212,36,38,0.8)]">
                 To My Love
             </h1>
             <p className="text-gray-300 mb-12 font-cute text-xl max-w-md mx-auto leading-relaxed">
                 准备好进入我们的回忆世界了吗？<br/>
                 戴上耳机，体验最佳效果 🎧
             </p>
             <button 
                onClick={handleStartExperience}
                className="bg-christmas-green text-white px-8 py-3 rounded-full text-xl font-bold shadow-[0_0_20px_rgba(22,91,51,0.6)] hover:scale-110 hover:bg-green-700 transition-all duration-300 flex items-center gap-2 mx-auto"
             >
                <PlayCircle size={24} />
                开始旅程
             </button>
         </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <audio ref={audioRef} loop crossOrigin="anonymous" />

      {/* Background Layers */}
      <WeatherLayer weather={currentChapter.weather} />
      
      {/* Decorations Layer */}
      {currentChapter.decorations.map(d => (
        <DraggableDecoration 
          key={d.id} 
          decoration={d} 
          mode={isAdmin ? 'editor' : 'viewer'}
          onUpdate={handleUpdateDecoration}
        />
      ))}

      {/* Main Content Scrollable Area */}
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden z-10 perspective-1000">
        <div className="min-h-screen w-full flex flex-col items-center pb-32">
          
          {/* Hero Section */}
          <div className="relative w-full h-[50vh] flex flex-col items-center justify-center text-center px-4 mt-10 mb-10">
             {/* Title Edit Mode */}
             {isEditingHero && isAdmin ? (
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md flex flex-col gap-4 animate-scale-in w-full max-w-lg">
                    <input 
                       value={heroEditTitle}
                       onChange={(e) => setHeroEditTitle(e.target.value)}
                       className="bg-transparent border-b border-white/50 text-5xl font-handwriting text-christmas-red text-center focus:outline-none"
                       placeholder="大标题"
                    />
                    <textarea 
                       value={heroEditSubtitle}
                       onChange={(e) => setHeroEditSubtitle(e.target.value)}
                       className="bg-transparent border-b border-white/50 text-xl text-white text-center focus:outline-none resize-none h-24 font-cute"
                       placeholder="副标题 (支持换行)"
                    />
                    <div className="flex justify-center gap-4 mt-2">
                        <button onClick={handleSaveHeroEdit} className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 text-sm">保存</button>
                        <button onClick={() => setIsEditingHero(false)} className="bg-gray-600 px-4 py-1 rounded hover:bg-gray-700 text-sm">取消</button>
                    </div>
                </div>
             ) : (
                <div className="group relative">
                    <h1 className="font-handwriting text-6xl md:text-8xl text-christmas-red mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-float">
                      {displayHeroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-cute whitespace-pre-wrap drop-shadow-md leading-relaxed">
                      {displayHeroSubtitle}
                    </p>
                    {isAdmin && (
                        <button 
                          onClick={() => setIsEditingHero(true)}
                          className="absolute -top-4 -right-8 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-white/50 hover:text-white"
                        >
                           <Pencil size={20} />
                        </button>
                    )}
                </div>
             )}
          </div>

          {/* Chapter Navigation Bar (New Design) */}
          <div className="sticky top-4 z-40 flex items-center gap-2 bg-black/30 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl mb-12 transition-all hover:bg-black/50">
             {/* Previous Chapter Button */}
             <button 
               onClick={() => prevChapter && setCurrentChapterId(prevChapter.id)}
               disabled={!prevChapter}
               className={`p-2 rounded-full transition-all ${prevChapter ? 'hover:bg-white/20 text-white' : 'text-white/20 cursor-not-allowed'}`}
               title={prevChapter?.title}
             >
               <ArrowLeft size={20} />
             </button>

             {/* Chapter Title (Click to Edit) */}
             <div className="flex items-center gap-2 px-4 border-x border-white/10">
                 <button 
                    onClick={() => isAdmin && openEditChapterModal(currentChapter)}
                    className={`text-sm font-bold text-christmas-gold font-cute tracking-widest ${isAdmin ? 'hover:underline cursor-pointer' : 'cursor-default'}`}
                 >
                    {currentChapter.title}
                 </button>
                 {isAdmin && (
                   <button onClick={openCreateChapterModal} className="p-1 hover:bg-white/20 rounded-full text-green-400" title="新建章节">
                      <Plus size={14} />
                   </button>
                 )}
             </div>

             {/* Next Chapter Button */}
             <button 
               onClick={() => nextChapter && setCurrentChapterId(nextChapter.id)}
               disabled={!nextChapter}
               className={`p-2 rounded-full transition-all ${nextChapter ? 'hover:bg-white/20 text-white' : 'text-white/20 cursor-not-allowed'}`}
               title={nextChapter?.title}
             >
               <ArrowRight size={20} />
             </button>
             
             {isAdmin && (
                <button 
                    onClick={() => setDeleteConfirm({ type: 'chapter', id: currentChapterId })}
                    className="ml-2 p-2 hover:bg-red-500/30 rounded-full text-red-400 transition-colors" 
                    title="删除当前章节"
                >
                    <Trash2 size={16} />
                </button>
             )}
          </div>

          {/* Post List */}
          <div className="w-full max-w-3xl px-4 space-y-8">
            {/* Sort & Add Bar */}
            <div className="flex justify-between items-center px-2 mb-4">
               <button 
                 onClick={() => setSortAscending(!sortAscending)} 
                 className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
               >
                 <ArrowDownUp size={16} />
                 {sortAscending ? "时间倒序" : "时间正序"}
               </button>
               
               {isAdmin && (
                 <button 
                   onClick={() => setIsPostModalOpen(true)}
                   className="flex items-center gap-2 bg-christmas-red hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 font-cute"
                 >
                   <Edit2 size={16} />
                   写新回忆
                 </button>
               )}
            </div>

            {sortedPosts.length === 0 ? (
               <div className="text-center py-20 text-white/50 bg-white/5 rounded-2xl border border-dashed border-white/10">
                   <Gift size={48} className="mx-auto mb-4 opacity-50" />
                   <p className="font-cute text-lg">这一章还没有回忆哦，快来添加吧！</p>
               </div>
            ) : (
               sortedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  mode={isAdmin ? 'editor' : 'viewer'}
                  onLikePost={handleLikePost}
                  onDeletePost={() => setDeleteConfirm({ type: 'post', id: post.id })}
                  onUpdatePost={handleUpdatePost}
                  onTriggerEasterEgg={handleTriggerEasterEgg}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Music Toggle */}
        <div className="relative group">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${
                isMuted ? 'bg-gray-500/50 text-gray-300' : 'bg-white/20 text-white animate-pulse'
              }`}
            >
              {isMuted ? <VolumeX size={24} /> : <Music size={24} />}
            </button>
            {autoPlayFailed && !isMuted && (
                <div className="absolute right-full mr-2 top-0 bg-black/80 text-white text-xs p-2 rounded whitespace-nowrap">
                    点击播放音乐 👉
                </div>
            )}
        </div>

        {/* Recover Draft Button (Visible only if admin or hidden trick) */}
        {isAdmin && (
            <button 
            onClick={handleRecoverDraft}
            className="p-3 rounded-full bg-yellow-500/80 text-white shadow-lg hover:bg-yellow-600 backdrop-blur-md"
            title="恢复上次未保存的草稿"
            >
            <RotateCcw size={24} />
            </button>
        )}

        {/* DIY Panel Toggle (Only Admin) */}
        {isAdmin && (
           <button 
            onClick={() => setIsDIYPanelOpen(true)}
            className="p-3 rounded-full bg-christmas-green text-white shadow-lg hover:bg-green-800 transition-transform hover:rotate-90"
          >
            <Settings size={24} />
          </button>
        )}

        {/* Admin Toggle / Secret Heart */}
        <button 
          onClick={toggleAdmin}
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${
            isAdmin ? 'bg-christmas-red text-white' : 'bg-pink-500/30 text-pink-200 hover:bg-pink-500/50'
          }`}
        >
          <Heart size={24} className={isAdmin ? "fill-current" : ""} />
        </button>
        
        {/* Export Button (Only Admin) */}
        {isAdmin && (
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="p-3 rounded-full bg-blue-600/80 text-white shadow-lg hover:bg-blue-700 backdrop-blur-md"
              title="导出/保存代码"
            >
                <Download size={24} />
            </button>
        )}
      </div>

      {/* DIY Panel */}
      <DIYPanel 
        isOpen={isDIYPanelOpen}
        onClose={() => setIsDIYPanelOpen(false)}
        currentWeather={currentChapter.weather}
        onWeatherChange={handleWeatherChange}
        decorations={currentChapter.decorations}
        onAddDecoration={handleAddDecoration}
        onRemoveDecoration={handleRemoveDecoration}
        chapterTitle={currentChapter.title}
      />

      {/* --- MODALS --- */}

      {/* Create/Edit Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-cute text-xl text-gray-800">写下新的回忆 📝</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">标题</label>
                <input 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-christmas-green outline-none text-gray-800"
                  placeholder="例如：第一次去迪士尼..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">日期</label>
                <input 
                  type="date"
                  value={newPostDate}
                  onChange={(e) => setNewPostDate(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-christmas-green outline-none text-gray-800"
                />
              </div>
              
              {/* Media Selection */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                 <div className="flex gap-4 mb-3 border-b border-gray-200 pb-2">
                     <button 
                        onClick={() => setNewPostType('image')}
                        className={`flex items-center gap-1 text-sm font-bold pb-1 ${newPostType === 'image' ? 'text-christmas-green border-b-2 border-christmas-green' : 'text-gray-400'}`}
                     >
                         <ImageIcon size={16} /> 照片
                     </button>
                     <button 
                        onClick={() => setNewPostType('video')}
                        className={`flex items-center gap-1 text-sm font-bold pb-1 ${newPostType === 'video' ? 'text-christmas-green border-b-2 border-christmas-green' : 'text-gray-400'}`}
                     >
                         <Video size={16} /> 视频
                     </button>
                 </div>

                 <div className="space-y-3">
                    {/* Option A: File Upload (Temporary) */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                           <Upload size={12} /> 临时上传 ({newPostType === 'image' ? '支持多选' : '单文件'})
                        </label>
                        <input 
                            type="file"
                            accept={newPostType === 'image' ? "image/*" : "video/*"}
                            multiple={newPostType === 'image'} 
                            onChange={(e) => setNewPostFiles(e.target.files)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-christmas-green/10 file:text-christmas-green hover:file:bg-christmas-green/20"
                        />
                    </div>
                    
                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-2 text-gray-400 text-xs">或者</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Option B: Manual Input (Permanent) */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                           <BookOpen size={12} /> 永久保存 (输入 public 文件夹下的文件名)
                        </label>
                        <input 
                            value={newPostManualInput}
                            onChange={(e) => setNewPostManualInput(e.target.value)}
                            className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-christmas-green outline-none text-gray-800"
                            placeholder={newPostType === 'image' ? "例如: 1.jpg, 2.jpg (用逗号隔开多张)" : "例如: video.mp4"}
                        />
                        <p className="text-[10px] text-gray-400 mt-1">
                           提示: 把文件放在 public/images 文件夹下，这里直接填文件名即可。
                        </p>
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">内容</label>
                <textarea 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-christmas-green outline-none text-gray-800 resize-none"
                  placeholder="写下那一刻的故事..."
                />
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleCreatePost}
                className="px-6 py-2 bg-christmas-red text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-transform active:scale-95"
              >
                发布回忆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Edit/Create Modal */}
      {isChapterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                      <h3 className="font-cute text-xl text-gray-800">
                          {chapterFormMode === 'create' ? '新建章节 📑' : '编辑章节 ⚙️'}
                      </h3>
                      <button onClick={() => setIsChapterModalOpen(false)}><X className="text-gray-400" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                      <div>
                          <label className="text-sm font-bold text-gray-600">章节名称</label>
                          <input 
                              value={chapterFormTitle}
                              onChange={(e) => setChapterFormTitle(e.target.value)}
                              className="w-full p-2 mt-1 border rounded focus:ring-christmas-green outline-none text-gray-800"
                              placeholder="例如：第二章·热恋"
                          />
                      </div>
                      
                      <div className="border-t pt-4">
                          <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                              <Music size={16} /> 背景音乐 (BGM)
                          </label>
                          
                          {/* BGM Upload */}
                          <div className="mt-2 bg-gray-50 p-3 rounded border border-dashed border-gray-300">
                              <p className="text-xs text-gray-500 mb-2">方式1: 上传文件 (临时预览)</p>
                              <input 
                                  type="file" 
                                  accept="audio/*"
                                  onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if(file) {
                                          setChapterFormBGM(file);
                                          setPreviewBgmUrl(URL.createObjectURL(file));
                                      }
                                  }}
                                  className="text-xs w-full"
                              />
                          </div>
                          
                          <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">方式2: 输入文件名 (需上传到 public/bgm)</p>
                              <input 
                                  value={chapterFormBgmUrlInput}
                                  onChange={(e) => {
                                      setChapterFormBgmUrlInput(e.target.value);
                                      // Don't auto preview text input to avoid 404 spam
                                  }}
                                  className="w-full p-2 text-sm border rounded text-gray-800"
                                  placeholder="例如: love_story.mp3"
                              />
                          </div>
                          
                          {previewBgmUrl && (
                              <audio controls src={previewBgmUrl} className="w-full mt-3 h-8" />
                          )}
                      </div>
                  </div>
                  <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
                      <button onClick={() => setIsChapterModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-200 rounded">取消</button>
                      <button onClick={handleSaveChapter} className="px-4 py-2 bg-christmas-green text-white rounded shadow hover:bg-green-700">保存</button>
                  </div>
              </div>
          </div>
      )}
      
      {/* Export Modal */}
      {isExportModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
                 <button onClick={() => setIsExportModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X /></button>
                 <h2 className="text-2xl font-cute text-gray-800 mb-4 flex items-center gap-2">
                     <Copy className="text-blue-500" /> 
                     保存你的作品
                 </h2>
                 <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800 leading-relaxed">
                     <p className="font-bold mb-2">⚠️ 注意：网页刷新后，你刚才添加的内容可能会消失！</p>
                     <p>为了永久保存，请点击下方的 <strong>“复制 JSON 代码”</strong> 按钮，然后：</p>
                     <ol className="list-decimal ml-5 mt-2 space-y-1">
                         <li>打开项目中的 <code className="bg-white px-1 rounded border">constants.ts</code> 文件。</li>
                         <li>找到 <code className="bg-white px-1 rounded border">export const INITIAL_CHAPTERS = [...]</code> 这一段。</li>
                         <li>把复制的代码粘贴进去，替换掉原来的内容。</li>
                     </ol>
                 </div>
                 <textarea 
                    className="w-full h-64 bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg focus:outline-none resize-none"
                    readOnly
                    value={JSON.stringify(chapters, null, 2)}
                 />
                 <div className="mt-4 flex justify-end">
                     <button 
                        onClick={handleExportData}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2"
                     >
                         <Copy size={18} />
                         一键复制 JSON 代码
                     </button>
                 </div>
             </div>
          </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center animate-scale-in">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">确定要删除吗？</h3>
                  <p className="text-gray-500 text-sm mb-6">
                      {deleteConfirm.type === 'chapter' 
                          ? "删除章节会连同里面的所有回忆一起消失，无法恢复哦！" 
                          : "这条美好的回忆将被永久删除，无法恢复哦！"}
                  </p>
                  <div className="flex gap-3 justify-center">
                      <button 
                          onClick={() => setDeleteConfirm(null)}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                          再想想
                      </button>
                      <button 
                          onClick={() => {
                              if (deleteConfirm.type === 'chapter') handleDeleteChapter(deleteConfirm.id);
                              else handleDeletePost(deleteConfirm.id);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg"
                      >
                          确认删除
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Giant Heart Easter Egg */}
      {giantHeartVisible && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[1000] animate-scale-in">
             <Heart className="text-pink-500 drop-shadow-[0_0_50px_rgba(236,72,153,0.8)] animate-pulse" size={300} fill="currentColor" />
        </div>
      )}
    </div>
  );
};

export default App;
