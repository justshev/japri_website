import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

const Forum = () => {
  const categories = [
    { name: "All Posts", icon: MessageCircle, count: 8924, active: true },
    { name: "Tips & Tricks", icon: Lightbulb, count: 2341 },
    { name: "Troubleshooting", icon: HelpCircle, count: 1856 },
    { name: "Harvest Results", icon: Sprout, count: 2134 },
    { name: "Smart Devices", icon: Cpu, count: 1593 },
  ];

  const sortOptions = [
    { name: "Newest", icon: Clock },
    { name: "Popular", icon: TrendingUp },
    { name: "Unanswered", icon: HelpCircle },
  ];

  const posts = [
    {
      id: 1,
      title: "Complete guide to building a low-cost mushroom growing room",
      excerpt:
        "After 2 years of trial and error, I've finally perfected my setup. Here's everything you need to know about temperature, humidity, and airflow...",
      category: "Tips & Tricks",
      author: "Pak Hendra",
      avatar: "PH",
      replies: 156,
      likes: 423,
      views: 2341,
      timeAgo: "3 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "Why are my oyster mushrooms turning yellow at the edges?",
      excerpt:
        "I've been growing oyster mushrooms for 3 months now, but lately I'm seeing yellowing on the cap edges. Could this be a humidity issue?",
      category: "Troubleshooting",
      author: "Bu Wati",
      avatar: "BW",
      replies: 28,
      likes: 45,
      views: 567,
      timeAgo: "5 hours ago",
      isHot: false,
    },
    {
      id: 3,
      title: "First harvest using automated monitoring — 3kg yield!",
      excerpt:
        "Sharing my results after installing the FungiFarm smart sensor. Temperature stayed consistent and I got my best yield ever. Photos and data inside...",
      category: "Harvest Results",
      author: "Mas Dedi",
      avatar: "MD",
      replies: 89,
      likes: 312,
      views: 1829,
      timeAgo: "8 hours ago",
      isHot: true,
    },
    {
      id: 4,
      title: "Best substrate recipe for lion's mane mushrooms?",
      excerpt:
        "I want to start growing lion's mane but I'm unsure about the ideal substrate mix. Has anyone had success with sawdust-based substrates?",
      category: "Tips & Tricks",
      author: "Ibu Sri",
      avatar: "IS",
      replies: 34,
      likes: 78,
      views: 456,
      timeAgo: "12 hours ago",
      isHot: false,
    },
    {
      id: 5,
      title: "Connecting multiple sensors to one dashboard — need help",
      excerpt:
        "I have 3 growing rooms and want to monitor them all from one place. Any recommendations for software or DIY solutions?",
      category: "Smart Devices",
      author: "Pak Bambang",
      avatar: "PB",
      replies: 12,
      likes: 23,
      views: 189,
      timeAgo: "1 day ago",
      isHot: false,
    },
  ];

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
            <Button size="lg" className="group">
              <Plus className="w-5 h-5 mr-2" />
              Create Post
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <div className="p-6 rounded-2xl bg-card border border-border/50 mb-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                        category.active
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
                      <span
                        className={`text-xs ${category.active ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                      >
                        {category.count.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sort Options */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Sort By
                </h3>
                <div className="space-y-1">
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.name}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        index === 0
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
              {posts.map((post) => (
                <Link to={`/forum/${post.id}`} key={post.id} className="block">
                  <article className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer">
                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center font-semibold text-primary flex-shrink-0">
                        {post.avatar}
                      </div>

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
                            <span className="sm:hidden w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs">
                              {post.avatar}
                            </span>
                            <span className="font-medium text-foreground">
                              {post.author}
                            </span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {post.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}

              {/* Load More */}
              <div className="text-center pt-6">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forum;
