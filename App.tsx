
import React, { useState, useEffect, useRef } from 'react';
import { WeatherLayer } from './components/WeatherLayer';
import { DraggableDecoration } from './components/DraggableDecoration';
import { PostCard } from './components/PostCard';
import { DIYPanel } from './components/DIYPanel';
import { AppMode, Chapter, MemoryPost, WeatherType, DecorationType, Decoration } from './types';
import { INITIAL_CHAPTERS, INITIAL_DECORATIONS } from './constants';
import { Edit2, Heart, Settings, X, Upload, Music, Plus, BookOpen, ArrowDownUp, Volume2, VolumeX, Pencil, Trash2, AlertTriangle, Download, Copy, EyeOff, Info, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  // Mode State
  // 🎄 默认为 'viewer' (浏览模式)，给她看的时候是纯净的
  const [mode, setMode] = useState<AppMode>('viewer');
  
  // Admin State - Default to FALSE. 
  // Click the heart icon 5 times to unlock admin features.
  const [isAdmin, setIsAdmin] = useState(false); 
  
  const [adminUnlockCount, setAdminUnlockCount] = useState(0);
  
  // Easter Egg State
  const [giantHeartVisible, setGiantHeartVisible] = useState(false);

  // State: Chapters
  // Initialize from localStorage if available to prevent data loss on refresh
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('christmas_chapters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved chapters", e);
      }
    }
    return INITIAL_CHAPTERS;
  });

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
  const [isMuted, setIsMuted] = useState(false); // Start unmuted, but browser policy might block
  const [autoPlayFailed, setAutoPlayFailed] = useState(false);

  // Form state for new post
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDate, setNewPostDate] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<File | null>(null);
  const [newPostMediaType, setNewPostMediaType] = useState<'image' | 'video'>('image');
  // New field for manual URL input (crucial for deployment)
  const [newPostMediaUrlInput, setNewPostMediaUrlInput] = useState('');

  // Form state for Chapter
  const [chapterFormMode, setChapterFormMode] = useState<'create' | 'edit'>('create');
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterFormTitle, setChapterFormTitle] = useState('');
  const [chapterFormBGM, setChapterFormBGM] = useState<File | null>(null);
  const [chapterFormBgmUrlInput, setChapterFormBgmUrlInput] = useState('');

  const currentChapter = chapters.find(c => c.id === currentChapterId) || chapters[0];
  const displayHeroTitle = currentChapter?.heroTitle || "Merry Christmas";
  const displayHeroSubtitle = currentChapter?.heroSubtitle || "收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️";

  // Save to localStorage whenever chapters change
  useEffect(() => {
    localStorage.setItem('christmas_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    if (isEditingHero) {
      setHeroEditTitle(displayHeroTitle);
      setHeroEditSubtitle(displayHeroSubtitle);
    }
  }, [isEditingHero, displayHeroTitle, displayHeroSubtitle]);

  // Audio Effect
  useEffect(() => {
    if (audioRef.current && currentChapter) {
      if (audioRef.current.src !== currentChapter.bgmUrl && currentChapter.bgmUrl) {
          // Only change src if it's different to avoid reload
          audioRef.current.src = currentChapter.bgmUrl;
      }
      
      if (currentChapter.bgmUrl && !isMuted) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play prevented by browser policy:", error);
                setAutoPlayFailed(true);
            });
            }
      } else if (!currentChapter.bgmUrl) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    }
  }, [currentChapterId, currentChapter?.bgmUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && currentChapter?.bgmUrl) {
          audioRef.current.play().catch(e => {
            console.error("Play failed", e);
            setAutoPlayFailed(true);
          });
      }
    }
  }, [isMuted, currentChapter?.bgmUrl]);

  // --- Unlock Admin ---
  const handleUnlockAdmin = () => {
      if (isAdmin) return; // Already unlocked
      
      const newCount = adminUnlockCount + 1;
      setAdminUnlockCount(newCount);
      
      if (newCount === 5) {
          setIsAdmin(true);
          setMode('editor');
          setAdminUnlockCount(0); // Reset counter
          alert("管理员模式已解锁！❤️\n欢迎回来，开始编辑吧！");
      }
  };

  // --- Trigger Giant Heart ---
  const triggerGiantHeart = () => {
      setGiantHeartVisible(true);
      setTimeout(() => {
          setGiantHeartVisible(false);
      }, 3000); // Show for 3 seconds
  };

  // --- Actions ---

  const updateChapter = (chapterId: string, data: Partial<Chapter>) => {
    setChapters(prev => prev.map(c => c.id === chapterId ? { ...c, ...data } : c));
  };

  const handleSaveHeroText = () => {
    updateChapter(currentChapterId, {
      heroTitle: heroEditTitle,
      heroSubtitle: heroEditSubtitle
    });
    setIsEditingHero(false);
  };

  const handleDecorationUpdate = (id: string, newPos: { x: number; y: number }) => {
    if (!currentChapter) return;
    const updatedDecos = currentChapter.decorations.map(d => d.id === id ? { ...d, ...newPos } : d);
    updateChapter(currentChapterId, { decorations: updatedDecos });
  };

  const handleAddDecoration = (type: DecorationType) => {
    if (!currentChapter) return;
    
    let defaultY = 50;
    let defaultX = 50;

    if (type === 'santa' || type === 'moon' || type === 'rainbow') {
        defaultY = 15; 
        defaultX = Math.random() * 80 + 10;
    } else {
        defaultY = Math.random() * 40 + 50; 
        defaultX = Math.random() * 80 + 10;
    }

    const newDeco: Decoration = {
        id: `deco-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type,
        x: defaultX,
        y: defaultY,
        scale: 1,
        visible: true
    };

    updateChapter(currentChapterId, { 
        decorations: [...currentChapter.decorations, newDeco] 
    });
  };

  const handleRemoveDecoration = (type: DecorationType) => {
      if (!currentChapter) return;
      const reversed = [...currentChapter.decorations].reverse();
      const indexToRemoveInReversed = reversed.findIndex(d => d.type === type);
      
      if (indexToRemoveInReversed !== -1) {
          const idToRemove = reversed[indexToRemoveInReversed].id;
          updateChapter(currentChapterId, {
              decorations: currentChapter.decorations.filter(d => d.id !== idToRemove)
          });
      }
  };

  const handleWeatherChange = (w: WeatherType) => {
    updateChapter(currentChapterId, { weather: w });
  };

  const handleLikePost = (postId: string) => {
    setChapters(prev => prev.map(c => ({
      ...c,
      posts: c.posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
    })));
  };

  const handleDeletePostRequest = (postId: string) => {
    setDeleteConfirm({ type: 'post', id: postId });
  };

  const handleDeleteChapterRequest = (chapterId: string) => {
    setDeleteConfirm({ type: 'chapter', id: chapterId });
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;

    if (type === 'post') {
       setChapters(prevChapters => prevChapters.map(chapter => ({
        ...chapter,
        posts: chapter.posts.filter(p => p.id !== id)
      })));
    } else if (type === 'chapter') {
      if (chapters.length <= 1) {
        alert("至少需要保留一个篇章哦！");
        setDeleteConfirm(null);
        return;
      }
      const newChapters = chapters.filter(c => c.id !== id);
      if (currentChapterId === id) {
        setCurrentChapterId(newChapters[0].id);
      }
      setChapters(newChapters);
    }
    setDeleteConfirm(null);
  };

  const handleUpdatePost = (postId: string, data: Partial<MemoryPost>) => {
    setChapters(prev => prev.map(c => ({
      ...c,
      posts: c.posts.map(p => p.id === postId ? { ...p, ...data } : p)
    })));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'media' | 'bgm') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'media') {
      setNewPostMedia(file);
      setNewPostMediaType(file.type.startsWith('video') ? 'video' : 'image');
      // Clear manual input if file is selected to avoid confusion
      setNewPostMediaUrlInput('');
    } else {
      setChapterFormBGM(file);
      // Clear manual input if file is selected
      setChapterFormBgmUrlInput('');
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChapter) return;
    
    // --- SMART PATH LOGIC (LAZY MODE) ---
    // User goal: Just type "photo.jpg" and have it work.
    
    let mediaUrl = newPostMediaUrlInput.trim();
    
    if (mediaUrl && !mediaUrl.startsWith('http')) {
        // 1. Remove 'public/' prefix if user typed it (Common mistake)
        let clean = mediaUrl.replace(/^\/?public\//i, ''); // case insensitive replace
        
        // 2. Remove leading slash
        clean = clean.replace(/^\//, '');

        // 3. Ensure it starts with 'images/'
        if (!clean.startsWith('images/')) {
            clean = 'images/' + clean;
        }

        // 4. Add the leading slash back
        mediaUrl = '/' + clean;
    }

    // Fallback: Use uploaded file blob if no URL provided
    if (!mediaUrl && newPostMedia) {
        mediaUrl = URL.createObjectURL(newPostMedia);
    }

    const newPost: MemoryPost = {
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newPostTitle,
      content: newPostContent,
      date: newPostDate || new Date().toISOString().split('T')[0],
      mediaUrl: mediaUrl || undefined,
      mediaType: newPostMediaType,
      likes: 0
    };

    setChapters(prev => prev.map(c => {
      if (c.id === currentChapterId) {
        return { ...c, posts: [...c.posts, newPost] };
      }
      return c;
    }));

    setIsPostModalOpen(false);
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostDate('');
    setNewPostMedia(null);
    setNewPostMediaUrlInput('');
  };

  // --- Export Data Logic ---
  const handleExportData = () => {
      setIsExportModalOpen(true);
  };
  
  const copyToClipboard = () => {
      const dataString = JSON.stringify(chapters, null, 2);
      navigator.clipboard.writeText(`export const INITIAL_CHAPTERS = ${dataString};`);
      alert("代码已复制！\n请打开 VS Code 里的 constants.ts 文件，\n粘贴并替换原有内容，然后提交到 GitHub。");
  };


  // --- Chapter Management ---
  const openCreateChapterModal = () => {
    setChapterFormMode('create');
    setChapterFormTitle('');
    setChapterFormBGM(null);
    setChapterFormBgmUrlInput('');
    setEditingChapterId(null);
    setIsChapterModalOpen(true);
  };

  const openEditChapterModal = (chapter: Chapter) => {
    setChapterFormMode('edit');
    setChapterFormTitle(chapter.title);
    setChapterFormBGM(null);
    // Pre-fill with existing BGM URL so they can see/edit it
    setChapterFormBgmUrlInput(chapter.bgmUrl || '');
    setEditingChapterId(chapter.id);
    setIsChapterModalOpen(true);
  };

  const handleSubmitChapter = () => {
    if (!chapterFormTitle.trim()) return;
    
    let finalBgmUrl = undefined;
    
    // 1. Prioritize Manual Input (Deployment Safe)
    if (chapterFormBgmUrlInput.trim()) {
        let clean = chapterFormBgmUrlInput.trim();
        if (!clean.startsWith('http')) {
            clean = clean.replace(/^\/?public\//i, '');
            clean = clean.replace(/^\//, '');
            // Smart Path: Add 'bgm/' if missing
            if (!clean.startsWith('bgm/')) {
                clean = 'bgm/' + clean;
            }
            clean = '/' + clean;
        }
        finalBgmUrl = clean;
    } 
    // 2. Fallback to Blob (Local Test Only)
    else if (chapterFormBGM) {
        finalBgmUrl = URL.createObjectURL(chapterFormBGM);
    }

    if (chapterFormMode === 'create') {
      const newChapter: Chapter = {
        id: `c-${Date.now()}-${Math.random()}`,
        title: chapterFormTitle,
        heroTitle: 'Merry Christmas',
        heroSubtitle: '收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️',
        weather: 'snow',
        decorations: JSON.parse(JSON.stringify(INITIAL_DECORATIONS)),
        posts: [],
        bgmUrl: finalBgmUrl
      };
      setChapters(prev => [...prev, newChapter]);
      setCurrentChapterId(newChapter.id);
    } else if (chapterFormMode === 'edit' && editingChapterId) {
      setChapters(prev => prev.map(c => {
        if (c.id === editingChapterId) {
          return {
            ...c,
            title: chapterFormTitle,
            // Keep old URL if no new one provided
            bgmUrl: finalBgmUrl !== undefined ? finalBgmUrl : c.bgmUrl
          };
        }
        return c;
      }));
    }
    setIsChapterModalOpen(false);
  };

  const sortedPosts = currentChapter ? [...currentChapter.posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortAscending ? dateA - dateB : dateB - dateA;
  }) : [];

  if (!currentChapter) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      <audio ref={audioRef} loop />
      <WeatherLayer weather={currentChapter.weather} />

      {currentChapter.decorations.map(deco => (
        <DraggableDecoration 
          key={`${currentChapter.id}-${deco.id}`} 
          decoration={deco} 
          mode={mode} 
          onUpdate={handleDecorationUpdate} 
        />
      ))}

      {/* Giant Heart Easter Egg Overlay */}
      {giantHeartVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none animate-scale-in">
             <div className="text-[15rem] drop-shadow-[0_0_50px_rgba(255,0,0,0.8)] animate-pulse">
                 ❤️
             </div>
          </div>
      )}

      <div className="relative z-20 h-screen overflow-y-auto overflow-x-hidden flex flex-col">
        
        {/* Header */}
        <header className="sticky top-0 z-50 p-4 bg-gradient-to-b from-black/90 via-black/70 to-transparent pointer-events-auto">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="flex items-center gap-2 select-none">
                 <div 
                    className="bg-christmas-gold p-2 rounded-full shadow-lg animate-pulse cursor-pointer active:scale-90 transition-transform"
                    onClick={handleUnlockAdmin}
                    title={isAdmin ? "管理员模式已开启" : "点击 5 次解锁编辑模式"}
                 >
                  <Heart className="text-red-600 fill-current" size={24} />
                </div>
                <h1 className="text-2xl md:text-3xl font-cute text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">一本喵书📖</h1>
              </div>

              {currentChapter.bgmUrl && (
                <button 
                  onClick={() => {
                      if (autoPlayFailed || isMuted) {
                           // Try to resolve autoplay issue or unmute
                           audioRef.current?.play().then(() => {
                              setAutoPlayFailed(false);
                              setIsMuted(false);
                           }).catch(console.error);
                      } else {
                          // Just mute
                          setIsMuted(true);
                      }
                  }}
                  // RESTORED CLASSIC BGM BUTTON STYLE
                  className={`p-2 rounded-full transition-all flex items-center justify-center backdrop-blur-md border ${
                      !isMuted && !autoPlayFailed 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:scale-105' 
                        : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:bg-black/60'
                  }`}
                  title={autoPlayFailed || isMuted ? "播放音乐" : "静音"}
                >
                  {isMuted || autoPlayFailed ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              )}
            </div>

            {/* Chapter Tabs */}
            <div className="flex-1 overflow-x-auto w-full md:w-auto no-scrollbar mx-4">
               <div className="flex items-center gap-2">
                  {chapters.map(chapter => (
                    <div key={chapter.id} className="relative shrink-0 flex items-center group">
                      <button
                        onClick={() => setCurrentChapterId(chapter.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border mr-1 ${
                          currentChapterId === chapter.id 
                            ? 'bg-christmas-red border-christmas-gold text-white shadow-[0_0_15px_rgba(212,36,38,0.6)] transform -translate-y-1 z-10' 
                            : 'bg-black/40 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {chapter.title}
                      </button>

                      {isAdmin && mode === 'editor' && currentChapterId === chapter.id && (
                        <div className="flex gap-1 ml-1 bg-black/60 backdrop-blur-md rounded-md p-1 border border-white/20 shadow-xl z-50 relative">
                           <button 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation(); 
                                openEditChapterModal(chapter); 
                              }}
                              className="p-1.5 hover:bg-blue-500/30 rounded text-blue-300 transition-colors cursor-pointer"
                           >
                             <Pencil size={14} />
                           </button>
                           <button 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation(); 
                                handleDeleteChapterRequest(chapter.id); 
                              }}
                              className="p-1.5 hover:bg-red-500/30 rounded text-red-400 transition-colors cursor-pointer"
                           >
                             <Trash2 size={14} />
                           </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isAdmin && mode === 'editor' && (
                    <button 
                      onClick={openCreateChapterModal}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-dashed border-white/40 text-white/70 flex items-center gap-1 text-sm shrink-0 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  )}
               </div>
            </div>

            {/* Mode Switcher & Settings - ONLY VISIBLE IF ADMIN */}
            {isAdmin && (
              <div className="flex gap-2 items-center shrink-0 animate-fade-in">
                {mode === 'editor' && (
                    <button 
                      onClick={handleExportData}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-all flex items-center gap-1 px-3 mr-2"
                      title="导出数据以便部署"
                    >
                      <Download size={16} />
                      <span className="text-xs font-bold hidden md:inline">保存代码</span>
                    </button>
                )}

                <div className="bg-black/60 backdrop-blur-md rounded-full p-1 flex border border-white/10">
                  <button 
                    onClick={() => setMode('viewer')}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${mode === 'viewer' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    浏览
                  </button>
                  <button 
                    onClick={() => setMode('editor')}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${mode === 'editor' ? 'bg-christmas-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    编辑
                  </button>
                </div>
                {mode === 'editor' && (
                  <button 
                    onClick={() => setIsDIYPanelOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                    title="本章环境设置"
                  >
                    <Settings size={20} />
                  </button>
                )}

                {/* Lock / Preview Button */}
                <button 
                    onClick={() => {
                        setIsAdmin(false);
                        setMode('viewer');
                        alert("已进入纯净预览模式。\n（提示：如需重新编辑，请连续点击左上角红色爱心 5 次）");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-colors transition-colors ml-2"
                    title="退出编辑/预览最终效果"
                >
                    <EyeOff size={20} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mt-12 mb-16 px-4 relative shrink-0">
           <div className="relative inline-block mb-4 group">
              <h2 className="text-5xl md:text-7xl font-cute text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-christmas-gold to-yellow-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse select-none">
                {displayHeroTitle}
              </h2>
              {isAdmin && mode === 'editor' && (
                <button 
                  onClick={() => setIsEditingHero(true)}
                  className="absolute -top-2 -right-6 bg-white/10 hover:bg-white/30 text-white p-1.5 rounded-full backdrop-blur-sm transition-all border border-white/20 opacity-50 group-hover:opacity-100"
                >
                  <Edit2 size={14} />
                </button>
              )}
           </div>
           
           <div className="flex flex-col items-center gap-4">
              <div className="bg-black/30 backdrop-blur-sm inline-block p-4 md:p-6 rounded-2xl border border-white/10 max-w-2xl mx-auto select-none relative">
                <p className="text-xl md:text-2xl font-cute text-gray-100 leading-relaxed whitespace-pre-line pointer-events-none">
                  {displayHeroSubtitle}
                </p>
              </div>
           </div>
        </div>

        {/* Sort Toolbar */}
        {currentChapter.posts.length > 1 && (
          <div className="container mx-auto px-4 mb-6 flex justify-end">
             <button 
              onClick={() => setSortAscending(!sortAscending)}
              className="flex items-center gap-2 bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full text-sm text-gray-300 transition-colors border border-white/10"
             >
               <ArrowDownUp size={16} />
               {sortAscending ? '时间正序' : '时间倒序'}
             </button>
          </div>
        )}

        {/* Feed */}
        <main className="container mx-auto px-4 pb-40">
          {sortedPosts.length > 0 ? (
             sortedPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                mode={mode} 
                onDeletePost={handleDeletePostRequest}
                onLikePost={handleLikePost}
                onUpdatePost={handleUpdatePost}
                onTriggerEasterEgg={triggerGiantHeart}
              />
            ))
          ) : (
            <div className="text-center text-gray-300 py-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl max-w-2xl mx-auto flex flex-col items-center">
              <BookOpen size={64} className="text-white/20 mb-4" />
              <h3 className="text-2xl font-cute mb-2">本篇章还是空的</h3>
              <p className="mb-6 text-gray-400">开始书写属于这一章的故事吧。</p>
              {isAdmin && mode === 'editor' && (
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="bg-christmas-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg"
                >
                  添加回忆
                </button>
              )}
            </div>
          )}
          
          {isAdmin && mode === 'editor' && (
            <div className="fixed bottom-10 right-6 z-40 flex flex-col gap-4 items-end">
               <button 
                onClick={() => setIsPostModalOpen(true)}
                className="bg-christmas-red text-white p-4 md:px-6 md:py-4 rounded-full shadow-[0_0_20px_rgba(212,36,38,0.6)] hover:bg-red-700 transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 font-bold text-lg group"
               >
                 <Plus size={28} className="group-hover:rotate-90 transition-transform" />
                 <span className="hidden md:inline">写故事</span>
               </button>
            </div>
          )}
        </main>
      </div>

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

      {/* Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-scale-in text-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-cute text-christmas-green">添加回忆 · {currentChapter.title}</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">标题</label>
                  <input 
                    required
                    type="text" 
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">日期</label>
                  <input 
                    type="date" 
                    required
                    value={newPostDate}
                    onChange={e => setNewPostDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-green outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">故事内容</label>
                <textarea 
                  required
                  rows={4}
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-green outline-none resize-none"
                />
              </div>

              {/* Enhanced Image Input Section for Deployment */}
              <div>
                 <label className="block text-sm font-bold text-gray-600 mb-2">图片/视频来源 (二选一)</label>
                 
                 <div className="space-y-4">
                     {/* Permanent Path Option (Highlighted) */}
                     <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-green-800 font-bold text-sm">
                            <Upload size={16} />
                            <span>方案一：永久保存 (懒人模式) ❤️</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                           <span className="font-bold text-green-700">使用方法：</span><br/>
                           1. 把图片传到 GitHub 的 public/images/ 文件夹。<br/>
                           2. 下面只需填 <span className="font-bold">图片名</span> (如: <code className="bg-white px-1 rounded border border-gray-200">photo.jpg</code>)。<br/>
                           3. 我会自动帮你处理路径！
                        </p>
                        <input 
                            type="text"
                            value={newPostMediaUrlInput}
                            onChange={(e) => {
                                setNewPostMediaUrlInput(e.target.value);
                                setNewPostMedia(null); // Clear file if manual URL is used
                            }}
                            placeholder="photo.jpg"
                            className="w-full border border-green-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                        />
                     </div>

                     <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">或者 (本地测试用)</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                     </div>

                     {/* Temporary Upload Option */}
                     <div className={`border-2 border-dashed rounded-xl p-3 transition-colors relative group flex items-center gap-3 ${newPostMedia ? 'border-christmas-gold bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <div className="bg-gray-200 p-2 rounded-full shrink-0">
                            <Upload size={20} className="text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                             <span className="text-sm font-medium text-gray-700 block truncate">
                                {newPostMedia ? newPostMedia.name : "方案二：从电脑上传 (临时预览)"}
                             </span>
                             <p className="text-xs text-red-400 mt-0.5">⚠️ 注意：刷新页面后图片会消失！</p>
                             <input 
                                type="file" 
                                accept="image/*,video/*"
                                onChange={(e) => handleFileChange(e, 'media')}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        {newPostMedia && (
                            <button 
                                type="button"
                                onClick={() => setNewPostMedia(null)}
                                className="p-1 text-gray-400 hover:text-red-500 z-10"
                            >
                                <X size={16} />
                            </button>
                        )}
                     </div>
                 </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-christmas-green text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors shadow-lg"
              >
                保存回忆
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chapter Modal */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in text-gray-800">
             <h3 className="text-2xl font-cute text-christmas-red mb-6">
                {chapterFormMode === 'create' ? '开启新篇章' : '编辑篇章'}
             </h3>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-gray-600 mb-1">篇章名称</label>
                 <input 
                    type="text" 
                    value={chapterFormTitle}
                    onChange={e => setChapterFormTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-red outline-none"
                    autoFocus
                  />
               </div>

               {/* BGM Section with Smart Input */}
               <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">
                    {chapterFormMode === 'edit' ? '设置/更换 BGM' : '专属 BGM (可选)'}
                  </label>
                  
                  {/* Manual Input (Permanent) */}
                  <div className="mb-2">
                      <p className="text-xs text-green-600 mb-1">❤️ 推荐：永久保存模式</p>
                      <input 
                        type="text" 
                        value={chapterFormBgmUrlInput}
                        onChange={(e) => {
                            setChapterFormBgmUrlInput(e.target.value);
                            setChapterFormBGM(null); // Reset file if text is typed
                        }}
                        placeholder="song.mp3 (需上传到 public/bgm)"
                        className="w-full border border-green-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 bg-green-50"
                      />
                  </div>

                  <div className="relative flex py-1 items-center">
                    <span className="flex-shrink-0 text-gray-300 text-[10px] mx-auto">或临时上传</span>
                  </div>

                  {/* File Upload (Temp) */}
                  <div className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-2 bg-gray-50 relative hover:border-gray-400">
                     <input 
                        type="file" 
                        accept="audio/*"
                        onChange={(e) => handleFileChange(e, 'bgm')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     <Music className="text-gray-400" size={20} />
                     <span className="text-sm text-gray-500 flex-1 truncate">
                       {chapterFormBGM ? chapterFormBGM.name : "点击上传文件 (刷新会消失)"}
                     </span>
                  </div>
               </div>

               <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setIsChapterModalOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSubmitChapter}
                    className="flex-1 bg-christmas-red text-white py-2 rounded-lg font-bold hover:bg-red-800"
                    disabled={!chapterFormTitle.trim()}
                  >
                    {chapterFormMode === 'create' ? '创建' : '保存修改'}
                  </button>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-scale-in text-gray-800">
              <div className="flex items-center gap-3 mb-4 text-green-700">
                 <Download size={32} />
                 <h3 className="text-2xl font-bold">同步内容给女朋友</h3>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-800">
                 <div className="flex items-center gap-2 mb-2">
                     <AlertTriangle size={18} />
                     <p className="font-bold text-lg">重要提示：</p>
                 </div>
                 <p className="leading-relaxed">
                   你现在看到的内容（帖子、DIY装饰）目前只保存在 <span className="font-bold underline">你自己的浏览器缓存</span> 里。
                   你直接分享网址给别人，<span className="font-bold text-red-600">他们是看不到这些新内容的！</span>
                 </p>
              </div>

              <div className="mb-6">
                 <label className="block text-sm font-bold text-gray-600 mb-2">只需3步，让大家都能看到：</label>
                 <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <li>点击下方的 <span className="bg-green-100 text-green-800 font-bold px-1 rounded">复制配置代码</span> 按钮。</li>
                    <li>回到你的代码项目（VS Code），打开 <code className="bg-gray-200 px-1 py-0.5 rounded text-red-500 font-mono">constants.ts</code> 文件。</li>
                    <li>
                        找到 <code className="bg-gray-200 px-1 py-0.5 rounded font-mono">export const INITIAL_CHAPTERS = ...</code> 这部分，
                        把它全部替换成你刚才复制的代码。
                    </li>
                    <li className="bg-blue-50 p-2 rounded border border-blue-200 text-blue-800 font-bold">
                        <span className="flex items-center gap-1"><ImageIcon size={14}/> 上传资源文件！</span>
                        <ul className="list-disc list-inside ml-4 mt-1 font-normal">
                            <li>图片放在: <code>public/images/</code></li>
                            <li>音乐放在: <code>public/bgm/</code></li>
                        </ul>
                    </li>
                    <li>最后提交代码到 GitHub，Vercel 会自动更新网站。</li>
                 </ol>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setIsExportModalOpen(false)}
                   className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 transition-colors"
                 >
                   关闭
                 </button>
                 <button 
                   onClick={copyToClipboard}
                   className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-christmas-green to-green-600 hover:from-green-700 hover:to-green-800 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
                 >
                   <Copy size={20} />
                   复制配置代码
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Edit Hero Text Modal */}
      {isEditingHero && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 text-gray-800 animate-scale-in shadow-2xl">
             <h3 className="text-2xl font-cute text-christmas-red mb-4">修改首页文字</h3>
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">主标题</label>
                  <input 
                    type="text" 
                    value={heroEditTitle}
                    onChange={e => setHeroEditTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-red outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">副标题</label>
                  <textarea 
                    rows={4}
                    value={heroEditSubtitle}
                    onChange={e => setHeroEditSubtitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-christmas-red outline-none"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setIsEditingHero(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveHeroText}
                    className="flex-1 bg-christmas-green text-white py-2 rounded-lg font-bold hover:bg-green-800"
                  >
                    保存
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1a1a1a] border border-christmas-gold/30 rounded-2xl max-w-sm w-full p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-christmas-red to-transparent"></div>
             <AlertTriangle className="mx-auto text-christmas-gold mb-4" size={48} />
             <h3 className="text-2xl font-cute text-white mb-2">
               {deleteConfirm.type === 'post' ? '彻底删除回忆？' : '删除整个篇章？'}
             </h3>
             <p className="text-gray-400 mb-8 text-sm leading-relaxed">
               {deleteConfirm.type === 'post' 
                 ? '这段回忆将永远消失在时间的长河中，无法找回。' 
                 : '这个篇章里的所有故事和装饰都会一起消失。'}
             </p>
             <div className="flex gap-3">
               <button 
                 onClick={() => setDeleteConfirm(null)}
                 className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold transition-colors"
               >
                 我再想想
               </button>
               <button 
                 onClick={executeDelete}
                 className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
               >
                 <Trash2 size={18} />
                 确认删除
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
