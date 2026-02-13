import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Reply,
  Flag,
  CheckCircle,
  Send,
} from "lucide-react";

const ForumDetail = () => {
  const { id } = useParams();

  // Sample post data (in real app, this would be fetched based on id)
  const post = {
    id: 1,
    title: "Complete guide to building a low-cost mushroom growing room",
    content: `After 2 years of trial and error, I've finally perfected my setup. Here's everything you need to know about temperature, humidity, and airflow for growing mushrooms at home.

## Introduction

Building a mushroom growing room doesn't have to be expensive. With the right materials and setup, you can create an ideal environment for growing various types of mushrooms including oyster, shiitake, and lion's mane.

## Key Factors to Consider

### 1. Temperature Control
The ideal temperature for most mushrooms is between 18-24°C. I recommend using a simple thermostat-controlled heater or cooler depending on your climate.

### 2. Humidity Management
This is crucial! Most mushrooms need 80-95% humidity. I use an ultrasonic humidifier paired with a humidity controller.

### 3. Air Circulation
Fresh air exchange is essential. Install a small exhaust fan that runs periodically to prevent CO2 buildup.

## My Setup (Total Cost: Under Rp 2.000.000)

- **Space**: 2x3 meter room
- **Shelving**: Used wooden pallets (Rp 200.000)
- **Humidifier**: Ultrasonic cool mist (Rp 350.000)
- **Thermostat**: Digital controller (Rp 150.000)
- **Fan**: Small exhaust with timer (Rp 200.000)
- **Plastic sheeting**: For walls (Rp 100.000)
- **Lighting**: Simple LED strips (Rp 150.000)

## Results

Since implementing this setup, I've consistently harvested 5-8kg of oyster mushrooms per week. The automated humidity and temperature control has reduced my daily maintenance time from 2 hours to just 30 minutes.

Feel free to ask any questions! I'm happy to share more details about specific aspects of the setup.`,
    category: "Tips & Tricks",
    author: "Pak Hendra",
    avatar: "PH",
    authorBio:
      "Mushroom farmer since 2020. Passionate about sustainable farming and helping others start their journey.",
    authorPosts: 45,
    authorReputation: 1250,
    replies: 156,
    likes: 423,
    views: 2341,
    timeAgo: "3 hours ago",
    createdAt: "Feb 13, 2026 at 2:30 PM",
    isHot: true,
    images: ["/placeholder-room-1.jpg", "/placeholder-room-2.jpg"],
    tags: ["growing room", "setup guide", "low cost", "beginner friendly"],
  };

  const comments = [
    {
      id: 1,
      author: "Bu Wati",
      avatar: "BW",
      content:
        "This is incredibly helpful! I've been wanting to start my own growing room. One question - do you use any specific brand for the humidifier? I've had issues with some breaking down too quickly.",
      timeAgo: "2 hours ago",
      likes: 45,
      isAuthor: false,
      isBestAnswer: true,
      replies: [
        {
          id: 11,
          author: "Pak Hendra",
          avatar: "PH",
          content:
            "I use the Xiaomi Deerma humidifier. It's affordable and has been running for over a year without issues. The key is to use filtered water to prevent mineral buildup.",
          timeAgo: "1 hour ago",
          likes: 23,
          isAuthor: true,
        },
      ],
    },
    {
      id: 2,
      author: "Mas Dedi",
      avatar: "MD",
      content:
        "Great guide! I followed a similar approach and can confirm this works. One addition - I found that adding a small oscillating fan inside helps distribute humidity more evenly.",
      timeAgo: "1 hour ago",
      likes: 28,
      isAuthor: false,
      isBestAnswer: false,
      replies: [],
    },
    {
      id: 3,
      author: "Ibu Sri",
      avatar: "IS",
      content:
        "Thank you for sharing! What's the best time to harvest the mushrooms? I always seem to harvest too early or too late.",
      timeAgo: "45 minutes ago",
      likes: 12,
      isAuthor: false,
      isBestAnswer: false,
      replies: [],
    },
  ];

  const relatedPosts = [
    {
      id: 4,
      title: "Best substrate recipe for lion's mane mushrooms?",
      author: "Ibu Sri",
      replies: 34,
      timeAgo: "12 hours ago",
    },
    {
      id: 5,
      title: "Connecting multiple sensors to one dashboard",
      author: "Pak Bambang",
      replies: 12,
      timeAgo: "1 day ago",
    },
    {
      id: 6,
      title: "DIY humidity controller using Arduino",
      author: "Mas Agus",
      replies: 67,
      timeAgo: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back Navigation */}
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Forum</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Post Card */}
              <article className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                {/* Post Header */}
                <div className="p-6 sm:p-8 border-b border-border/50">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {post.category}
                    </span>
                    {post.isHot && (
                      <span className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        🔥 Hot
                      </span>
                    )}
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {post.title}
                  </h1>

                  {/* Author Info */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-lg">
                        {post.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {post.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {post.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Bookmark className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 sm:p-8">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {post.content.split("\n").map((paragraph, index) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2
                            key={index}
                            className="font-display text-xl font-semibold text-foreground mt-6 mb-3"
                          >
                            {paragraph.replace("## ", "")}
                          </h2>
                        );
                      } else if (paragraph.startsWith("### ")) {
                        return (
                          <h3
                            key={index}
                            className="font-display text-lg font-semibold text-foreground mt-4 mb-2"
                          >
                            {paragraph.replace("### ", "")}
                          </h3>
                        );
                      } else if (paragraph.startsWith("- **")) {
                        const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/);
                        if (match) {
                          return (
                            <div
                              key={index}
                              className="flex items-start gap-2 ml-4 mb-1"
                            >
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">
                                <strong className="text-foreground">
                                  {match[1]}:
                                </strong>{" "}
                                {match[2]}
                              </p>
                            </div>
                          );
                        }
                      } else if (paragraph.trim()) {
                        return (
                          <p
                            key={index}
                            className="text-muted-foreground leading-relaxed mb-4"
                          >
                            {paragraph}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-6 sm:px-8 py-4 bg-muted/30 border-t border-border/50">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.replies}</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-border/50">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Comments ({comments.length})
                  </h2>
                </div>

                {/* Add Comment */}
                <div className="p-6 sm:p-8 border-b border-border/50 bg-muted/20">
                  <div className="flex gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center font-semibold text-primary text-sm flex-shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write your comment..."
                        className="min-h-[100px] resize-none mb-3"
                      />
                      <div className="flex justify-end">
                        <Button className="gap-2">
                          <Send className="w-4 h-4" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="divide-y divide-border/50">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-6 sm:p-8">
                      {/* Main Comment */}
                      <div className="flex gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                            comment.isAuthor
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {comment.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="font-medium text-foreground">
                              {comment.author}
                            </span>
                            {comment.isAuthor && (
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                Author
                              </span>
                            )}
                            {comment.isBestAnswer && (
                              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Best Answer
                              </span>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {comment.timeAgo}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Reply className="w-4 h-4" />
                              <span>Reply</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
                              <Flag className="w-4 h-4" />
                              <span>Report</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-6 ml-14 space-y-6">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 ${
                                  reply.isAuthor
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                {reply.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="font-medium text-foreground text-sm">
                                    {reply.author}
                                  </span>
                                  {reply.isAuthor && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                      Author
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {reply.timeAgo}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                                  {reply.content}
                                </p>
                                <div className="flex items-center gap-4">
                                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{reply.likes}</span>
                                  </button>
                                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <Reply className="w-3 h-3" />
                                    <span>Reply</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Load More Comments */}
                <div className="p-6 sm:p-8 text-center border-t border-border/50">
                  <Button variant="outline">Load More Comments</Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Author Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  About the Author
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xl">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {post.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Member since 2020
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {post.authorBio}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="font-semibold text-foreground">
                      {post.authorPosts}
                    </p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="font-semibold text-foreground">
                      {post.authorReputation.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Reputation</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>

              {/* Post Stats */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Post Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      Views
                    </span>
                    <span className="font-medium text-foreground">
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      Likes
                    </span>
                    <span className="font-medium text-foreground">
                      {post.likes}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      Replies
                    </span>
                    <span className="font-medium text-foreground">
                      {post.replies}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Posted
                    </span>
                    <span className="font-medium text-foreground">
                      {post.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Related Discussions
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/forum/${related.id}`}
                      className="block group"
                    >
                      <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{related.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {related.replies}
                        </span>
                        <span>•</span>
                        <span>{related.timeAgo}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForumDetail;
