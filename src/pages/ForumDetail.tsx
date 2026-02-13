import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
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
  Loader2,
} from "lucide-react";
import {
  useForumPost,
  useComments,
  useToggleLike,
  useToggleBookmark,
  useCreateComment,
  useToggleCommentLike,
} from "@/hooks/use-forum";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/components/ui/avatar-placeholder";

const ForumDetail = () => {
  const { id } = useParams();
  const postId = id ?? "";
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data: postRes, isLoading: postLoading } = useForumPost(postId);
  const { data: commentsRes, isLoading: commentsLoading } = useComments(postId);
  const toggleLike = useToggleLike(postId);
  const toggleBookmark = useToggleBookmark(postId);
  const createComment = useCreateComment(postId);
  const toggleCommentLike = useToggleCommentLike();

  const post = postRes?.data;
  const comments = commentsRes?.data?.comments ?? [];

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

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    await createComment.mutateAsync({ content: commentText });
    setCommentText("");
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl bg-card border border-border/50 p-8 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-64 w-full" />
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <Link to="/forum">
              <Button>Back to Forum</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                      <UserAvatar
                        name={post.author.fullName}
                        src={post.author.avatar}
                        size="lg"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {post.author.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          post.isBookmarked
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }
                        onClick={() => toggleBookmark.mutate()}
                        disabled={toggleBookmark.isPending}
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
                        className={`gap-2 hover:bg-primary/10 ${post.isLiked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                        onClick={() => toggleLike.mutate()}
                        disabled={toggleLike.isPending}
                      >
                        <Heart
                          className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`}
                        />
                        <span>{post.likeCount}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.replyCount}</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.viewCount.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-border/50">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Comments ({post.replyCount})
                  </h2>
                </div>

                {/* Add Comment */}
                <div className="p-6 sm:p-8 border-b border-border/50 bg-muted/20">
                  <div className="flex gap-4">
                    <UserAvatar
                      name={user?.fullName || "?"}
                      src={null}
                      size="md"
                      className="hidden sm:flex"
                    />
                    <div className="flex-1">
                      <Textarea
                        placeholder={
                          user ? "Write your comment..." : "Login to comment..."
                        }
                        className="min-h-[100px] resize-none mb-3"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!user}
                      />
                      <div className="flex justify-end">
                        <Button
                          className="gap-2"
                          onClick={handlePostComment}
                          disabled={
                            !commentText.trim() ||
                            createComment.isPending ||
                            !user
                          }
                        >
                          {createComment.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="divide-y divide-border/50">
                  {commentsLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-6 sm:p-8">
                        <div className="flex gap-4">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : comments.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No comments yet. Be the first to comment!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="p-6 sm:p-8">
                        {/* Main Comment */}
                        <div className="flex gap-4">
                          <UserAvatar
                            name={comment.author.fullName}
                            src={comment.author.avatar}
                            size="md"
                            className={
                              comment.author.isPostAuthor
                                ? "ring-2 ring-primary"
                                : ""
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="font-medium text-foreground">
                                {comment.author.fullName}
                              </span>
                              {comment.author.isPostAuthor && (
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
                                {timeAgo(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-4">
                              <button
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() =>
                                  toggleCommentLike.mutate(comment.id)
                                }
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{comment.likeCount}</span>
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
                                <UserAvatar
                                  name={reply.author.fullName}
                                  src={reply.author.avatar}
                                  size="sm"
                                  className={
                                    reply.author.isPostAuthor
                                      ? "ring-2 ring-primary"
                                      : ""
                                  }
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="font-medium text-foreground text-sm">
                                      {reply.author.fullName}
                                    </span>
                                    {reply.author.isPostAuthor && (
                                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                        Author
                                      </span>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      {timeAgo(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                                    {reply.content}
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likeCount}</span>
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
                    ))
                  )}
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
                  <UserAvatar
                    name={post.author.fullName}
                    src={post.author.avatar}
                    size="xl"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {post.author.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Member since{" "}
                      {new Date(post.author.memberSince).getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="font-semibold text-foreground">
                      {post.author.postCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="font-semibold text-foreground">
                      {post.replyCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Replies</p>
                  </div>
                </div>
                <Link to={`/farmers/${post.author.id}`}>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
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
                      {post.viewCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      Likes
                    </span>
                    <span className="font-medium text-foreground">
                      {post.likeCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      Replies
                    </span>
                    <span className="font-medium text-foreground">
                      {post.replyCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Posted
                    </span>
                    <span className="font-medium text-foreground">
                      {timeAgo(post.createdAt)}
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
                  {(post.relatedPosts ?? []).map((related) => (
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
                          {related.replyCount}
                        </span>
                        <span>•</span>
                        <span>{timeAgo(related.createdAt)}</span>
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
