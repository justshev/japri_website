import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Star,
  MapPin,
  Package,
  Heart,
  Share2,
  MessageCircle,
  Store,
  CheckCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useState } from "react";
import {
  useProduct,
  useProductReviews,
  useToggleWishlist,
  useMarkReviewHelpful,
} from "@/hooks/use-products";
import { useAuth } from "@/hooks/use-auth";
import {
  UserAvatar,
  FarmerAvatar,
  ImagePlaceholder,
} from "@/components/ui/avatar-placeholder";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useAuth();

  const { data: productRes, isLoading, error } = useProduct(id || "");
  const { data: reviewsRes } = useProductReviews(id || "");
  const toggleWishlist = useToggleWishlist(id || "");
  const markHelpful = useMarkReviewHelpful(id || "");

  const product = productRes?.data;
  const reviews = reviewsRes?.data?.reviews ?? [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} minggu lalu`;
    return date.toLocaleDateString("id-ID");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container">
            <Skeleton className="h-5 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Produk Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">
              Produk yang Anda cari tidak ada atau telah dihapus.
            </p>
            <Link to="/marketplace">
              <Button>Kembali ke Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const images = product.images?.length
    ? product.images.sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back Navigation */}
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Marketplace</span>
          </Link>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 border border-border/50 overflow-hidden flex items-center justify-center">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder type="product" />
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev > 0 ? prev - 1 : images.length - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev < images.length - 1 ? prev + 1 : 0,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-success text-success-foreground text-sm font-semibold">
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => user && toggleWishlist.mutate()}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors ${product.isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}
                >
                  <Heart
                    className={`w-5 h-5 ${product.isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex items-center justify-center transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-semibold text-foreground">
                      {product.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({product.reviewCount} ulasan)
                    </span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {product.soldCount} terjual
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-semibold">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Harga per {product.unit.replace("/", "")} • Stok:{" "}
                  {product.stock} tersedia
                </p>
              </div>

              {/* Location Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    Lokasi Penjual: {product.seller.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pengiriman dan ongkir diatur langsung dengan penjual
                  </p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Hubungi Penjual</h3>
                <a
                  href={`https://wa.me/${product.whatsapp?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-green-600 hover:bg-green-700 mt-4"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat WhatsApp
                  </Button>
                </a>
              </div>

              {/* Share */}
              <div className="flex gap-3 pt-3 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                  onClick={() => user && toggleWishlist.mutate()}
                >
                  <Heart
                    className={`w-4 h-4 ${product.isWishlisted ? "fill-destructive text-destructive" : ""}`}
                  />
                  {product.isWishlisted ? "Tersimpan" : "Simpan"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </Button>
              </div>

              {/* Safety Warning */}
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Hati-hati Penipuan!
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>
                        • Jangan transfer sebelum memastikan produk dan penjual
                      </li>
                      <li>• Gunakan COD (bayar di tempat) jika memungkinkan</li>
                      <li>
                        • Verifikasi keaslian penjual melalui rating dan ulasan
                      </li>
                      <li>• Simpan bukti percakapan dan transaksi</li>
                    </ul>
                    <Link
                      to="/safety-tips"
                      className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <Info className="w-3 h-3" />
                      Pelajari tips keamanan selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Deskripsi Produk
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {product.description.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Spesifikasi
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <span className="text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Ulasan ({product.reviewCount})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-bold text-foreground">
                      {product.rating}
                    </span>
                    <span className="text-muted-foreground">/ 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Belum ada ulasan untuk produk ini.
                    </p>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="pb-6 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 flex-shrink-0">
                            <UserAvatar
                              name={review.user.fullName}
                              src={review.user.avatar}
                              size="md"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-foreground">
                                {review.user.fullName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {timeAgo(review.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-warning fill-warning"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {review.content}
                            </p>
                            <button
                              onClick={() => markHelpful.mutate(review.id)}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Lihat Semua Ulasan
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Seller Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <FarmerAvatar
                        name={product.seller.name}
                        src={product.seller.avatar}
                        size="xl"
                      />
                      {product.seller.isVerified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-success fill-success-foreground stroke-success" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {product.seller.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {product.seller.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-semibold text-foreground">
                          {product.seller.rating}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {product.seller.reviewCount} ulasan
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="font-semibold text-foreground">
                        {product.seller.productCount}
                      </p>
                      <p className="text-xs text-muted-foreground">Produk</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Bergabung</span>
                      <span className="font-medium text-foreground">
                        {product.seller.joinedDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                    <Link
                      to={`/farmers/${product.seller.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <Store className="w-4 h-4" />
                        Kunjungi
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Related Products */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Produk Lainnya
                  </h3>
                  <div className="space-y-4">
                    {(product.relatedProducts || []).map((item) => (
                      <Link
                        key={item.id}
                        to={`/marketplace/${item.id}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.mainImage ? (
                            <img
                              src={item.mainImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-primary/30" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-primary font-semibold text-sm">
                            {formatPrice(item.price)}
                            <span className="text-muted-foreground font-normal">
                              {item.unit}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-warning fill-warning" />
                              {item.rating}
                            </span>
                            <span>•</span>
                            <span>{item.soldCount} terjual</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
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

export default ProductDetail;
