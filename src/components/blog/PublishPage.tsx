import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogPosts, type BlogPost } from "./blogData";
import SEO from "../layout/SEO";
import Footer from "../footer/Footer";

const PRESET_IMAGES = [
  { url: "/images/desktop_setup.png", label: "Desktop Workspace" },
  { url: "/images/laptop_setup.png", label: "Laptop Workstation" },
  { url: "/images/blog-ai-agents.png", label: "AI & Neural Net Network" },
  { url: "/images/quantum_security_gateway.png", label: "Quantum Security" },
  { url: "/images/cognitive_knowledge_mining.png", label: "Cognitive Mining" }
];

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin Verification States
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = localStorage.getItem("amthromax-user");
    const session = localStorage.getItem("amthromax_admin_session");
    return user === "admin@amthromax.com" || user === "kishorekanth@gmail.com" || session === "active";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Form states
  const [title, setTitle] = useState("AI Agents: The Future of Automation");
  const [excerpt, setExcerpt] = useState("How autonomous cognitive entities are reshaping standard industrial workflows.");
  const [category, setCategory] = useState("AI Agents");
  const [readTime, setReadTime] = useState("5 min read");
  const [authorName, setAuthorName] = useState("Kishore Kanth");
  const [authorRole, setAuthorRole] = useState("Founder, Amthromax");
  const [authorAvatar, setAuthorAvatar] = useState("K");
  const [image, setImage] = useState("/images/desktop_setup.png");
  const [customImage, setCustomImage] = useState("");
  const [content, setContent] = useState(
    "In the evolving landscape of technology, autonomous agents represent a massive leap forward. Rather than acting as simple chat interfaces, these agents can reason, plan, and call APIs in a loop.\n\nAt Amthromax, we build secure, zero-latency runtimes that sandbox these agents. This guarantees safety while executing high-stakes enterprise workflows."
  );

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [dragActive, setDragActive] = useState(false);

  // Helper to get paragraphs
  const getParagraphs = () => {
    return content
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  };

  // Handle file import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readAndPopulateFile(file);
  };

  const readAndPopulateFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        // Try parsing basic layout, otherwise dump to content
        const lines = text.split("\n");
        let parsedTitle = "";
        let parsedExcerpt = "";
        let parsedContent = "";

        if (lines.length > 0) {
          parsedTitle = lines[0].replace(/^(Title:|#)\s*/i, "").trim();
        }
        if (lines.length > 1 && lines[1].trim().length > 0) {
          parsedExcerpt = lines[1].replace(/^(Excerpt:|Summary:)\s*/i, "").trim();
          parsedContent = lines.slice(2).join("\n").trim();
        } else if (lines.length > 2) {
          parsedExcerpt = lines[2].replace(/^(Excerpt:|Summary:)\s*/i, "").trim();
          parsedContent = lines.slice(3).join("\n").trim();
        } else {
          parsedContent = lines.slice(1).join("\n").trim();
        }

        if (parsedTitle) setTitle(parsedTitle);
        if (parsedExcerpt) setExcerpt(parsedExcerpt);
        if (parsedContent) setContent(parsedContent);
      }
    };
    reader.readAsText(file);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      readAndPopulateFile(e.dataTransfer.files[0]);
    }
  };

  // Publish handler
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert("Please fill in Title, Excerpt, and Content.");
      return;
    }

    const newPostId = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost: BlogPost = {
      id: newPostId || `post-${Date.now()}`,
      title: title.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      readTime: readTime.trim() || "5 min read",
      author: {
        name: authorName.trim() || "Anonymous",
        role: authorRole.trim() || "Contributor",
        avatar: (authorAvatar.trim() || authorName[0] || "A").toUpperCase()
      },
      image: customImage.trim() ? customImage.trim() : image,
      content: getParagraphs()
    };

    // Load existing posts from localStorage, fallback to blogData.ts
    const stored = localStorage.getItem("amthromax_blog_posts");
    let currentPosts: BlogPost[] = [];
    if (stored) {
      try {
        currentPosts = JSON.parse(stored);
      } catch (err) {
        currentPosts = [...blogPosts];
      }
    } else {
      currentPosts = [...blogPosts];
    }

    // Prepend new post
    const updatedPosts = [newPost, ...currentPosts];
    localStorage.setItem("amthromax_blog_posts", JSON.stringify(updatedPosts));

    // Redirect to blog index
    navigate("/blog");
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Amthromax@2026") {
      localStorage.setItem("amthromax_admin_session", "active");
      setIsAdmin(true);
      setPasswordError("");
    } else {
      setPasswordError("Invalid administrative password.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-300">
        <SEO
          title="Admin Verification | Amthromax"
          description="Secure gate to verify administrative access to Amthromax publishing utilities."
        />
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 shadow-2xl border border-gray-105 dark:border-gray-800 space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-blue-100 dark:border-blue-900/30 text-xl font-bold">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Verification</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Please enter the master password to access the publishing dashboard.
            </p>
          </div>

          <form onSubmit={handleVerifyPassword} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Master Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
              />
              {passwordError && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-97 cursor-pointer"
            >
              Verify and Access
            </button>
          </form>

          <Link to="/blog" className="block text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <SEO
        title="Publish Article | Amthromax Blog Editor"
        description="Write and publish a new article to the Amthromax Blog with real-time markdown-style rendering."
      />

      {/* Editor Header */}
      <header className="border-b border-gray-150 dark:border-white/[0.04] bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to="/blog"
              className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-bold flex items-center gap-1.5"
            >
              <span>←</span> <span className="hidden sm:inline">Back to Blog</span>
            </Link>
            <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800"></div>
            <span className="text-sm font-black tracking-tight text-blue-600 dark:text-blue-400 uppercase">
              Creator Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Tab buttons for mobile view */}
            <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-full md:hidden">
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "edit" ? "bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "preview" ? "bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                }`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-97 cursor-pointer"
            >
              Publish Article
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Editor Panel */}
          <section
            className={`md:col-span-6 space-y-6 ${
              activeTab === "edit" ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Compose Article</h2>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Import TXT File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".txt"
                  className="hidden"
                />
              </div>

              {/* Drag and Drop text area */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                  dragActive
                    ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/10"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Drag and drop a <span className="font-bold">.txt</span> file here to auto-fill title & body
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="Enter article title..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Provide a brief summary of the article..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      placeholder="e.g. AI Agents, Security"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Read Time</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-150 dark:border-white/[0.04] pt-4 grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Author Role</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Avatar Init</label>
                    <input
                      type="text"
                      maxLength={1}
                      value={authorAvatar}
                      onChange={(e) => setAuthorAvatar(e.target.value.substring(0, 1))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Cover Image</label>
                  <div className="grid grid-cols-5 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => {
                          setImage(preset.url);
                          setCustomImage("");
                        }}
                        className={`aspect-video rounded-lg overflow-hidden border-2 relative group transition-all ${
                          image === preset.url && !customImage
                            ? "border-blue-500 ring-2 ring-blue-500/20"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        title={preset.label}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder="Or paste a custom image URL..."
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Article Content</label>
                    <span className="text-[9px] text-gray-400">Separate paragraphs with double newlines (Enter key twice)</span>
                  </div>
                  <textarea
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white font-mono leading-relaxed"
                    placeholder="Write the body paragraphs here..."
                  />
                </div>
              </form>
            </div>
          </section>

          {/* RIGHT: Live Preview Panel */}
          <section
            className={`md:col-span-6 space-y-6 ${
              activeTab === "preview" ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-28 bg-gray-50 dark:bg-[#161617] border border-gray-150 dark:border-white/[0.04] rounded-[32px] p-6 md:p-8 space-y-6 shadow-sm max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-250 dark:border-white/[0.04]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Preview</h2>
                <span className="text-[9px] font-bold text-green-500 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-900/30">
                  Rendering Live
                </span>
              </div>

              {/* Rendering exactly like BlogPostDetail */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    <span>{category || "Uncategorized"}</span>
                    <span>•</span>
                    <span className="text-gray-400">{readTime || "5 min read"}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    {title || "Untitled Article"}
                  </h1>
                  {excerpt && (
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-3 py-0.5">
                      {excerpt}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 py-4 border-y border-gray-200/50 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black font-black text-sm flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
                    {(authorAvatar || authorName?.[0] || "A").toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{authorName || "Anonymous"}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{authorRole || "Contributor"}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[9px] text-gray-400">Published</p>
                    <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                      {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/7] w-full overflow-hidden rounded-2xl border border-gray-150 dark:border-white/[0.04] shadow-sm bg-gray-100 dark:bg-gray-900">
                  <img
                    src={customImage.trim() ? customImage.trim() : image}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/desktop_setup.png";
                    }}
                  />
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                  {getParagraphs().map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {getParagraphs().length === 0 && (
                    <p className="text-gray-400 italic">No content written yet...</p>
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublishPage;
