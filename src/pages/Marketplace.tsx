import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Heart
} from "lucide-react";

const Marketplace = () => {
  const categories = [
    { name: "All Products", icon: ShoppingBag, count: 1243, active: true },
    { name: "Fresh Harvest", icon: Leaf, count: 567 },
    { name: "Growing Supplies", icon: Package, count: 389 },
    { name: "Tools & Equipment", icon: Wrench, count: 287 },
  ];

  const priceRanges = [
    { label: "Under Rp 50k", value: "0-50000" },
    { label: "Rp 50k - 100k", value: "50000-100000" },
    { label: "Rp 100k - 500k", value: "100000-500000" },
    { label: "Over Rp 500k", value: "500000+" },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Oyster Mushrooms - Premium Grade",
      price: 35000,
      unit: "/kg",
      seller: "Farm Jamur Makmur",
      location: "Bandung",
      rating: 4.9,
      reviews: 127,
      badge: "Fresh Harvest",
      badgeColor: "success",
      sold: 523,
    },
    {
      id: 2,
      name: "Shiitake Growing Kit - Complete Set",
      price: 150000,
      unit: "/set",
      seller: "Jamur Tools ID",
      location: "Jakarta",
      rating: 4.8,
      reviews: 89,
      badge: "Best Seller",
      badgeColor: "warning",
      sold: 312,
    },
    {
      id: 3,
      name: "Premium Spawn Bags - Oyster Variety",
      price: 25000,
      unit: "/bag",
      seller: "Bibit Unggul",
      location: "Surabaya",
      rating: 4.7,
      reviews: 234,
      badge: "Top Rated",
      badgeColor: "primary",
      sold: 1024,
    },
    {
      id: 4,
      name: "Humidity Controller - Smart Edition",
      price: 450000,
      unit: "/unit",
      seller: "AgriTech Solutions",
      location: "Yogyakarta",
      rating: 4.9,
      reviews: 67,
      badge: "New Arrival",
      badgeColor: "info",
      sold: 89,
    },
    {
      id: 5,
      name: "Fresh Lion's Mane Mushrooms",
      price: 85000,
      unit: "/kg",
      seller: "Organic Farms Co",
      location: "Malang",
      rating: 4.8,
      reviews: 156,
      badge: "Organic",
      badgeColor: "success",
      sold: 234,
    },
    {
      id: 6,
      name: "Sterilized Substrate Mix - 5kg Pack",
      price: 45000,
      unit: "/pack",
      seller: "Substrate Pro",
      location: "Semarang",
      rating: 4.6,
      reviews: 312,
      badge: "Popular",
      badgeColor: "primary",
      sold: 789,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
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
            <Button size="lg" className="group">
              <Plus className="w-5 h-5 mr-2" />
              Sell Product
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
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
            <aside className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                        category.active 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </span>
                      <span className={`text-xs ${category.active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
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
                      <span className="text-sm text-muted-foreground">{range.label}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift overflow-hidden cursor-pointer group"
                  >
                    {/* Product Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                      <Package className="w-16 h-16 text-primary/30" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${getBadgeClasses(product.badgeColor)}`}>
                        {product.badge}
                      </span>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                        <Heart className="w-4 h-4" />
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
                          {product.unit}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          {product.rating}
                        </span>
                        <span>({product.reviews})</span>
                        <span className="text-xs">•</span>
                        <span>{product.sold} sold</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-sm text-muted-foreground truncate max-w-[60%]">
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

              {/* Load More */}
              <div className="text-center pt-10">
                <Button variant="outline" size="lg">
                  Load More Products
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

export default Marketplace;
