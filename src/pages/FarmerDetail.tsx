import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Calendar,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Handshake,
  Heart,
  Share2,
  Clock,
  Sprout,
  TrendingUp,
  Image as ImageIcon,
  Play,
  Camera,
} from "lucide-react";
import { useFarmer, useFarmerReviews } from "@/hooks/use-farmers";

const FarmerDetail = () => {
  const { id } = useParams();
  const { data: farmerRes, isLoading, error } = useFarmer(id || "");
  const { data: reviewsRes } = useFarmerReviews(id || "");

  const farmer = farmerRes?.data;
  const reviews = reviewsRes?.data?.reviews ?? [];

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

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container">
            <Skeleton className="h-5 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Petani Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">
              Profil petani tidak ada atau telah dihapus.
            </p>
            <Link to="/farmers">
              <Button>Kembali ke Daftar Petani</Button>
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
            to="/farmers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              Kembali ke Daftar Petani
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header Card */}
              <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                {/* Cover */}
                <div className="h-32 sm:h-48 hero-gradient relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>

                {/* Profile Info */}
                <div className="p-6 sm:p-8 relative">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Avatar */}
                    <div className="w-28 h-28 rounded-2xl bg-primary/10 border-4 border-card flex items-center justify-center font-bold text-primary text-3xl flex-shrink-0 relative -mt-20 sm:-mt-24 shadow-lg z-10 overflow-hidden">
                      {farmer.avatar ? (
                        <img
                          src={farmer.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(farmer.fullName)
                      )}
                      {farmer.isVerified && (
                        <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-success fill-success-foreground stroke-success" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                            {farmer.fullName}
                          </h1>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{farmer.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {farmer.specialty}
                        </span>
                        {farmer.isMentor && (
                          <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            Mentor
                          </span>
                        )}
                        {farmer.isPartner && (
                          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1">
                            <Handshake className="w-4 h-4" />
                            Mitra Bisnis
                          </span>
                        )}
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-6 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="font-semibold text-foreground">
                            {farmer.rating}
                          </span>
                          <span className="text-muted-foreground">
                            ({farmer.reviewCount} ulasan)
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {farmer.experience} tahun
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {farmer.studentCount} murid
                        </span>
                        {farmer.lastActiveAt && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            Aktif {timeAgo(farmer.lastActiveAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Tentang Saya
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {(farmer.fullBio || farmer.bio || "")
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              {/* Services */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Layanan yang Ditawarkan
                </h2>
                {farmer.services.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Belum ada layanan yang ditawarkan.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {farmer.services
                      .filter((s) => s.isActive)
                      .map((service) => (
                        <div
                          key={service.id}
                          className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                            <Briefcase className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {service.description || ""}
                            {service.duration && (
                              <span className="block text-xs mt-1">
                                Durasi: {service.duration}
                              </span>
                            )}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(service.price)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Skills & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Skills */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Keahlian
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {farmer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Sertifikasi
                  </h2>
                  <div className="space-y-3">
                    {farmer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {cert.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Galeri Foto & Video
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {farmer.gallery.length} item
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {farmer.gallery.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                    >
                      <img
                        src={item.url}
                        alt={item.caption || ""}
                        className="w-full h-full object-cover"
                      />

                      {/* Caption overlay */}
                      {item.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                          <p className="text-white text-xs font-medium">
                            {item.caption}
                          </p>
                        </div>
                      )}

                      {/* Index badge */}
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Klik foto untuk melihat lebih besar
                </p>
              </div>

              {/* Reviews */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Ulasan ({farmer.reviewCount})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-bold text-foreground">
                      {farmer.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">
                      Belum ada ulasan.
                    </p>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="pb-6 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm flex-shrink-0 overflow-hidden">
                            {review.user.avatar ? (
                              <img
                                src={review.user.avatar}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              getInitials(review.user.fullName)
                            )}
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
                            <p className="text-sm text-muted-foreground">
                              {review.content}
                            </p>
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
                {/* Contact Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Hubungi Petani
                  </h3>

                  {/* Primary Actions */}
                  <div className="space-y-3 mb-6">
                    <Button className="w-full gap-2" size="lg">
                      <Phone className="w-5 h-5" />
                      Telepon Sekarang
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-500/10"
                      size="lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat WhatsApp
                    </Button>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h4 className="font-medium text-foreground text-sm">
                      Informasi Kontak
                    </h4>

                    <div className="space-y-3">
                      <a
                        href={`tel:${farmer.phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{farmer.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${farmer.whatsapp.replace(/[^0-9]/g, "")}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{farmer.whatsapp}</span>
                      </a>
                      <a
                        href={`mailto:${farmer.email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{farmer.email}</span>
                      </a>
                      <a
                        href={`https://${farmer.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{farmer.website}</span>
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 pt-4 border-t border-border/50 mt-4">
                    <h4 className="font-medium text-foreground text-sm">
                      Alamat
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {farmer.address}
                    </p>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Statistik
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-muted/30">
                      <Sprout className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="font-bold text-foreground">
                        {farmer.totalHarvest || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Panen
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/30">
                      <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="font-bold text-foreground">
                        {farmer.studentCount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Murid Dibimbing
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/30">
                      <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                      <p className="font-bold text-foreground">
                        {farmer.successStories}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sukses Stories
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/30">
                      <Briefcase className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="font-bold text-foreground">
                        {farmer.farmSize || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">Luas Farm</p>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Info Keanggotaan
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Bergabung
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {farmer.joinedDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Terakhir Aktif
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {farmer.lastActiveAt
                          ? timeAgo(farmer.lastActiveAt)
                          : "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        Status
                      </span>
                      <span
                        className={`text-sm font-medium ${farmer.isVerified ? "text-success" : "text-muted-foreground"}`}
                      >
                        {farmer.isVerified
                          ? "Terverifikasi"
                          : "Belum Terverifikasi"}
                      </span>
                    </div>
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

export default FarmerDetail;
