import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  MapPin,
  Package,
  Heart,
  Share2,
  Shield,
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

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data (in real app, fetch based on id)
  const product = {
    id: 1,
    name: "Fresh Oyster Mushrooms - Premium Grade",
    description: `Jamur tiram segar berkualitas premium langsung dari farm kami. Dipanen setiap hari untuk memastikan kesegaran maksimal.

Keunggulan produk:
• Ditanam dengan metode organik tanpa pestisida
• Dipanen pagi hari dan langsung dikemas
• Kualitas premium dengan ukuran seragam
• Cocok untuk berbagai masakan

Cara penyimpanan:
Simpan di kulkas (suhu 2-5°C) dalam kemasan terbuka atau kantong kertas. Dapat bertahan 5-7 hari jika disimpan dengan benar.

Catatan: Berat dapat berkurang 5-10% selama pengiriman karena penguapan air alami.`,
    price: 35000,
    originalPrice: 45000,
    unit: "/kg",
    minOrder: 1,
    stock: 150,
    category: "Fresh Harvest",
    badge: "Fresh Harvest",
    badgeColor: "success",
    images: [
      "/placeholder-product-1.jpg",
      "/placeholder-product-2.jpg",
      "/placeholder-product-3.jpg",
      "/placeholder-product-4.jpg",
    ],
    seller: {
      id: 1,
      name: "Farm Jamur Makmur",
      avatar: "FJ",
      location: "Bandung, Jawa Barat",
      rating: 4.9,
      reviews: 523,
      products: 24,
      joinedDate: "2022",
      responseRate: "98%",
      responseTime: "< 1 jam",
      isVerified: true,
      phone: "+62 812-3456-7890",
      whatsapp: "+62 812-3456-7890",
    },
    rating: 4.9,
    reviews: 127,
    sold: 523,
    shipping: {
      methods: [
        { name: "Reguler (2-3 hari)", price: 15000 },
        { name: "Express (1 hari)", price: 25000 },
        { name: "Same Day", price: 35000 },
      ],
      freeShippingMin: 100000,
    },
    specifications: [
      { label: "Jenis", value: "Jamur Tiram Putih" },
      { label: "Kondisi", value: "Segar" },
      { label: "Berat per Pack", value: "1 kg" },
      { label: "Metode Budidaya", value: "Organik" },
      { label: "Masa Simpan", value: "5-7 hari (di kulkas)" },
      { label: "Asal", value: "Bandung, Jawa Barat" },
    ],
  };

  const reviews = [
    {
      id: 1,
      author: "Bu Siti",
      avatar: "BS",
      rating: 5,
      date: "2 hari lalu",
      content:
        "Jamurnya segar banget! Ukurannya besar-besar dan seragam. Pengiriman juga cepat. Pasti repeat order!",
      helpful: 12,
      images: [],
    },
    {
      id: 2,
      author: "Pak Darmawan",
      avatar: "PD",
      rating: 5,
      date: "1 minggu lalu",
      content:
        "Kualitas jamur sangat bagus, tidak ada yang busuk. Packagingnya juga rapi. Recommended seller!",
      helpful: 8,
      images: [],
    },
    {
      id: 3,
      author: "Ibu Maya",
      avatar: "IM",
      rating: 4,
      date: "2 minggu lalu",
      content:
        "Jamurnya bagus, cuma pengiriman agak lama karena di luar kota. Tapi overall puas.",
      helpful: 5,
      images: [],
    },
  ];

  const relatedProducts = [
    {
      id: 5,
      name: "Fresh Lion's Mane Mushrooms",
      price: 85000,
      unit: "/kg",
      rating: 4.8,
      sold: 234,
    },
    {
      id: 3,
      name: "Premium Spawn Bags - Oyster",
      price: 25000,
      unit: "/bag",
      rating: 4.7,
      sold: 1024,
    },
    {
      id: 6,
      name: "Sterilized Substrate Mix",
      price: 45000,
      unit: "/pack",
      rating: 4.6,
      sold: 789,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

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
                <Package className="w-32 h-32 text-primary/30" />

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev > 0 ? prev - 1 : product.images.length - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev < product.images.length - 1 ? prev + 1 : 0,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-success text-success-foreground text-sm font-semibold">
                  {product.badge}
                </span>

                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl bg-gradient-to-br from-primary/5 to-accent/10 border-2 flex items-center justify-center transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <Package className="w-8 h-8 text-primary/30" />
                  </button>
                ))}
              </div>
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
                      ({product.reviews} ulasan)
                    </span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {product.sold} terjual
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-semibold">
                    -{discount}%
                  </span>
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
                  href={`https://wa.me/${product.seller.whatsapp?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
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
                >
                  <Heart className="w-4 h-4" />
                  Simpan
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
                    Ulasan ({product.reviews})
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
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm flex-shrink-0">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">
                              {review.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
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
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg relative">
                      {product.seller.avatar}
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
                        {product.seller.reviews} ulasan
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="font-semibold text-foreground">
                        {product.seller.products}
                      </p>
                      <p className="text-xs text-muted-foreground">Produk</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Response Rate
                      </span>
                      <span className="font-medium text-foreground">
                        {product.seller.responseRate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Response Time
                      </span>
                      <span className="font-medium text-foreground">
                        {product.seller.responseTime}
                      </span>
                    </div>
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
                    {relatedProducts.map((item) => (
                      <Link
                        key={item.id}
                        to={`/marketplace/${item.id}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-primary/30" />
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
                            <span>{item.sold} terjual</span>
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
