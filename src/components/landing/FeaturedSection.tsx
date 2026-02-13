import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  MessageCircle,
  Heart,
  Eye,
  Star,
  MapPin,
  Package,
} from "lucide-react";
import { useForumPosts } from "@/hooks/use-forum";
import { useProducts } from "@/hooks/use-products";

const FeaturedSection = () => {
  const { data: forumData, isLoading: loadingForum } = useForumPosts({
    limit: 3,
    sort: "popular",
  });
  const { data: productsData, isLoading: loadingProducts } = useProducts({
    limit: 3,
    sort: "popular",
  });

  const forumPosts = forumData?.data?.posts ?? [];
  const products = productsData?.data?.products ?? [];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="py-20 lg:py-32 nature-bg">
      <div className="section-container">
        {/* Forum Posts Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="trust-badge mb-3">Community Forum</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Trending Discussions
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 sm:mt-0 group">
              <Link to="/forum" className="flex items-center gap-1">
                View All Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {loadingForum
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-4" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))
              : forumPosts.map((post) => (
                  <Link to={`/forum/${post.id}`} key={post.id}>
                    <article className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm overflow-hidden">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getInitials(post.author.fullName)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {post.author.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {timeAgo(post.createdAt)}
                          </p>
                        </div>
                      </div>

                      <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                        {post.category}
                      </span>

                      <h3 className="font-display font-semibold text-foreground mb-4 line-clamp-2">
                        {post.title}
                      </h3>

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
                    </article>
                  </Link>
                ))}
          </div>
        </div>

        {/* Marketplace Products Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="trust-badge mb-3">Marketplace</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Featured Products
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 sm:mt-0 group">
              <Link to="/marketplace" className="flex items-center gap-1">
                Browse Marketplace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingProducts
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-card border border-border/50 overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              : products.map((product) => (
                  <Link to={`/marketplace/${product.id}`} key={product.id}>
                    <article className="rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift overflow-hidden cursor-pointer h-full">
                      {/* Product Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                        {product.mainImage ? (
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-16 h-16 text-primary/30" />
                        )}
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold shadow-sm">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {product.name}
                        </h3>

                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.unit && (
                            <span className="text-sm text-muted-foreground">
                              /{product.unit}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            {product.rating}
                          </span>
                          <span>({product.reviewCount} reviews)</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-sm text-muted-foreground truncate">
                            {product.seller.fullName}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {product.location}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
