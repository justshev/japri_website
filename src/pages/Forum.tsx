import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Plus,
  Filter,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Cpu,
  Sprout,
  Loader2,
} from "lucide-react";
import { useForumPosts } from "@/hooks/use-forum";
import { UserAvatar } from "@/components/ui/avatar-placeholder";

const Forum = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );
  const [activeSort, setActiveSort] = useState("newest");
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useForumPosts({
    search: search || undefined,
    category: activeCategory,
    sort: activeSort,
    page,
    limit: 10,
  });

  const posts = response?.data?.posts ?? [];
  const pagination = response?.data?.pagination;

  const categories = [
    { name: "All Posts", value: undefined, icon: MessageCircle },
    { name: "Tips & Tricks", value: "tips", icon: Lightbulb },
    { name: "Troubleshooting", value: "question", icon: HelpCircle },
    { name: "Harvest Results", value: "showcase", icon: Sprout },
    { name: "Smart Devices", value: "news", icon: Cpu },
  ];

  const sortOptions = [
    { name: "Newest", value: "newest", icon: Clock },
    { name: "Popular", value: "popular", icon: TrendingUp },
    { name: "Unanswered", value: "unanswered", icon: HelpCircle },
  ];

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString("id-ID");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Community Forum
              </h1>
              <p className="text-muted-foreground">
                Ask questions, share knowledge, and connect with fellow farmers
              </p>
            </div>
            <Link to="/forum/create">
              <Button size="lg" className="group">
                <Plus className="w-5 h-5 mr-2" />
                Create Post
              </Button>
            </Link>
          </div>

          {/* Search and Filter Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12" type="submit">
              <Filter className="w-5 h-5 mr-2" />
              Search
            </Button>
          </form>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <div className="p-6 rounded-2xl bg-card border border-border/50 mb-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.value;
                    return (
                      <button
                        key={category.name}
                        onClick={() => {
                          setActiveCategory(category.value);
                          setPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sort Options */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Sort By
                </h3>
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => {
                        setActiveSort(option.value);
                        setPage(1);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        activeSort === option.value
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Posts List */}
            <div className="lg:col-span-3 space-y-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <Skeleton className="hidden sm:block w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>
                ))
              ) : posts.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No posts found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <Link
                    to={`/forum/${post.id}`}
                    key={post.id}
                    className="block"
                  >
                    <article className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer">
                      <div className="flex items-start gap-4">
                        {/* Author Avatar */}
                        <UserAvatar
                          name={post.author.fullName}
                          src={post.author.avatar}
                          size="lg"
                          className="hidden sm:flex"
                        />

                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {post.category}
                            </span>
                            {post.isHot && (
                              <span className="px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                                🔥 Hot
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-semibold text-foreground text-lg mb-2 line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                {post.author.fullName}
                              </span>
                              <span>•</span>
                              <span>{timeAgo(post.createdAt)}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.replyCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likeCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pagination.totalPages || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    {isFetching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Next"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forum;
