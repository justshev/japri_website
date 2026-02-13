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
  Star,
  MapPin,
  Package,
  Leaf,
  Wrench,
  ShoppingBag,
  Heart,
  Loader2,
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );
  const [activeSort, setActiveSort] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useProducts({
    search: search || undefined,
    category: activeCategory,
    sort: activeSort,
    page,
    limit: 12,
  });

  const products = response?.data?.products ?? [];
  const pagination = response?.data?.pagination;

  const categories = [
    { name: "All Products", value: undefined, icon: ShoppingBag },
    { name: "Fresh Harvest", value: "fresh_harvest", icon: Leaf },
    { name: "Growing Supplies", value: "growing_supplies", icon: Package },
    { name: "Tools & Equipment", value: "tools", icon: Wrench },
  ];

  const priceRanges = [
    { label: "Under Rp 50k", value: "0-50000" },
    { label: "Rp 50k - 100k", value: "50000-100000" },
    { label: "Rp 100k - 500k", value: "100000-500000" },
    { label: "Over Rp 500k", value: "500000+" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeClasses = (color: string) => {
    const colors: Record<string, string> = {
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      primary: "bg-primary text-primary-foreground",
      info: "bg-info text-info-foreground",
    };
    return colors[color] || colors.primary;
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
                Marketplace
              </h1>
              <p className="text-muted-foreground">
                Buy and sell mushrooms, supplies, and equipment
              </p>
            </div>
            <Link to="/marketplace/create">
              <Button size="lg" className="group">
                <Plus className="w-5 h-5 mr-2" />
                Sell Product
              </Button>
            </Link>
          </div>

          {/* Search and Filter Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
            <aside className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
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

              {/* Price Range */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Location
                </h3>
                <Input placeholder="Enter city or region" />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-card border border-border/50 overflow-hidden"
                    >
                      <Skeleton className="h-48 w-full" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      to={`/marketplace/${product.id}`}
                      key={product.id}
                      className="block"
                    >
                      <article className="rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift overflow-hidden cursor-pointer group">
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
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm bg-primary text-primary-foreground">
                              {product.badge}
                            </span>
                          )}
                          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                            <Heart
                              className={`w-4 h-4 ${product.isWishlisted ? "fill-destructive text-destructive" : ""}`}
                            />
                          </button>
                        </div>

                        <div className="p-5">
                          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          <div className="flex items-baseline gap-1 mb-3">
                            <span className="text-xl font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              /{product.unit}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                              {product.rating.toFixed(1)}
                            </span>
                            <span>({product.reviewCount})</span>
                            <span className="text-xs">•</span>
                            <span>{product.soldCount} sold</span>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <span className="text-sm text-muted-foreground truncate max-w-[60%]">
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
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-10">
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

export default Marketplace;
