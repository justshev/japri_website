import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Heart, Eye, Star, MapPin, Package } from "lucide-react";

const FeaturedSection = () => {
  const forumPosts = [
    {
      id: 1,
      title: "Best substrate mix for oyster mushrooms?",
      category: "Tips & Tricks",
      author: "Pak Bambang",
      avatar: "PB",
      replies: 24,
      likes: 67,
      views: 342,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "My shiitake logs aren't producing - help!",
      category: "Troubleshooting",
      author: "Bu Sari",
      avatar: "BS",
      replies: 18,
      likes: 45,
      views: 289,
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      title: "First harvest results with smart monitoring",
      category: "Harvest Results",
      author: "Mas Dedi",
      avatar: "MD",
      replies: 31,
      likes: 89,
      views: 567,
      timeAgo: "1 day ago",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Oyster Mushrooms",
      price: "Rp 35.000",
      unit: "/kg",
      seller: "Farm Jamur Makmur",
      location: "Bandung",
      rating: 4.9,
      reviews: 127,
      badge: "Fresh Harvest",
    },
    {
      id: 2,
      name: "Shiitake Growing Kit",
      price: "Rp 150.000",
      unit: "/set",
      seller: "Jamur Tools ID",
      location: "Jakarta",
      rating: 4.8,
      reviews: 89,
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Premium Spawn Bags",
      price: "Rp 25.000",
      unit: "/bag",
      seller: "Bibit Unggul",
      location: "Surabaya",
      rating: 4.7,
      reviews: 234,
      badge: "Top Rated",
    },
  ];

  return (
    <section className="py-20 lg:py-32 nature-bg">
      <div className="section-container">
        {/* Forum Posts Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="trust-badge mb-3">
                Community Forum
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Trending Discussions
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 sm:mt-0 group">
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {forumPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
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
              </article>
            ))}
          </div>
        </div>

        {/* Marketplace Products Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="trust-badge mb-3">
                Marketplace
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Featured Products
              </h2>
            </div>
            <Button variant="ghost" className="mt-4 sm:mt-0 group">
              Browse Marketplace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift overflow-hidden cursor-pointer"
              >
                {/* Product Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                  <Package className="w-16 h-16 text-primary/30" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold shadow-sm">
                    {product.badge}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      {product.rating}
                    </span>
                    <span>({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-sm text-muted-foreground truncate">
                      {product.seller}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {product.location}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
