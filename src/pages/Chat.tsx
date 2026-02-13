import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Phone,
  MoreVertical,
  AlertTriangle,
  Shield,
  Info,
  CheckCircle,
  XCircle,
  Package,
  ArrowLeft,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get("seller");
  const productId = searchParams.get("product");
  const [message, setMessage] = useState("");
  const [showSafetyTips, setShowSafetyTips] = useState(true);

  // Sample data (in real app, fetch based on params)
  const seller = {
    id: 1,
    name: "Farm Jamur Makmur",
    avatar: "FJ",
    isVerified: true,
    isOnline: true,
    lastSeen: "Online",
    phone: "+62 812-3456-7890",
  };

  const product = {
    id: 1,
    name: "Fresh Oyster Mushrooms - Premium Grade",
    price: 35000,
    image: "/placeholder-product.jpg",
  };

  const conversations = [
    {
      id: 1,
      name: "Farm Jamur Makmur",
      avatar: "FJ",
      lastMessage: "Baik pak, stok masih tersedia. Mau pesan berapa kg?",
      time: "10:30",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Bibit Unggul",
      avatar: "BU",
      lastMessage: "Terima kasih sudah order",
      time: "Kemarin",
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "AgriTech Solutions",
      avatar: "AS",
      lastMessage: "Untuk humidity controller bisa kirim ke Bandung",
      time: "2 hari lalu",
      unread: 0,
      isOnline: true,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: "user",
      text: "Halo, saya tertarik dengan jamur tiram premium. Apakah stok masih tersedia?",
      time: "10:25",
    },
    {
      id: 2,
      senderId: "seller",
      text: "Halo pak, selamat pagi! Stok masih banyak pak. Hari ini baru panen, fresh dari farm.",
      time: "10:28",
    },
    {
      id: 3,
      senderId: "user",
      text: "Bagus, saya mau pesan 5kg. Bisa dikirim ke Bandung?",
      time: "10:29",
    },
    {
      id: 4,
      senderId: "seller",
      text: "Baik pak, stok masih tersedia. Untuk 5kg totalnya Rp 175.000. Ongkir ke Bandung sekitar Rp 20.000 pakai JNE Reguler. Atau bisa COD kalau lokasi dekat.",
      time: "10:30",
    },
  ];

  const safetyTips = [
    {
      icon: Shield,
      title: "Verifikasi Penjual",
      description:
        "Pastikan penjual memiliki badge terverifikasi dan ulasan positif dari pembeli lain",
      color: "text-success",
    },
    {
      icon: XCircle,
      title: "Jangan Transfer Duluan",
      description:
        "Hindari transfer uang sebelum menerima barang, gunakan COD jika memungkinkan",
      color: "text-destructive",
    },
    {
      icon: CheckCircle,
      title: "Gunakan COD",
      description:
        "Bayar di tempat (Cash on Delivery) adalah metode paling aman untuk transaksi",
      color: "text-primary",
    },
    {
      icon: Info,
      title: "Simpan Bukti",
      description:
        "Screenshot percakapan dan simpan bukti transfer sebagai dokumentasi",
      color: "text-info",
    },
  ];

  const scamIndicators = [
    "Harga terlalu murah dari pasaran",
    "Memaksa untuk transfer cepat",
    "Tidak mau COD dengan berbagai alasan",
    "Akun baru tanpa ulasan",
    "Meminta transfer ke rekening pribadi berbeda nama",
    "Tidak mau video call untuk verifikasi",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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

          {/* Safety Warning Banner */}
          {showSafetyTips && (
            <div className="mb-6 p-4 rounded-2xl bg-warning/10 border border-warning/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Tips Keamanan Bertransaksi
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Platform ini hanya memfasilitasi komunikasi antara penjual
                      dan pembeli. Segala transaksi adalah tanggung jawab
                      masing-masing pihak.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {safetyTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <tip.icon
                            className={`w-4 h-4 ${tip.color} flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-muted-foreground">
                            {tip.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSafetyTips(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
            {/* Conversation List */}
            <div className="lg:col-span-1 rounded-2xl bg-card border border-border/50 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border/50">
                <h2 className="font-display font-semibold text-foreground">
                  Pesan
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                      conv.id === 1 ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {conv.avatar}
                      </div>
                      {conv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground text-sm truncate">
                          {conv.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 rounded-2xl bg-card border border-border/50 overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {seller.avatar}
                    </div>
                    {seller.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {seller.name}
                      </span>
                      {seller.isVerified && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <span className="text-xs text-success">
                      {seller.lastSeen}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${seller.phone}`}>
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Product Reference */}
              {product && (
                <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
                  <Link
                    to={`/marketplace/${product.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-primary font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl ${
                        msg.senderId === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1"
                  />
                  <Button size="icon" disabled={!message.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Safety Tips Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Seller Info */}
              <div className="rounded-2xl bg-card border border-border/50 p-4">
                <h3 className="font-semibold text-foreground mb-3">
                  Info Penjual
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {seller.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground">
                        {seller.name}
                      </span>
                      {seller.isVerified && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <span className="text-xs text-success">Terverifikasi</span>
                  </div>
                </div>
                <a href={`tel:${seller.phone}`}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    {seller.phone}
                  </Button>
                </a>
              </div>

              {/* Scam Indicators */}
              <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-foreground">
                    Tanda-tanda Penipuan
                  </h3>
                </div>
                <ul className="space-y-2">
                  {scamIndicators.map((indicator, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Transaction Tips */}
              <div className="rounded-2xl bg-success/5 border border-success/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-foreground">
                    Transaksi Aman
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Utamakan COD (bayar di tempat)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Cek produk sebelum bayar
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Minta bukti foto/video produk
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Simpan screenshot percakapan
                  </li>
                </ul>
              </div>

              {/* Report */}
              <div className="rounded-2xl bg-card border border-border/50 p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Ada Masalah?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Laporkan jika menemukan indikasi penipuan atau perilaku
                  mencurigakan
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Laporkan Penjual
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

export default Chat;
