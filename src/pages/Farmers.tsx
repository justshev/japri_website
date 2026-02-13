import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Users,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Briefcase,
  GraduationCap,
  Handshake,
  Phone,
  MessageCircle,
} from "lucide-react";

const Farmers = () => {
  const farmers = [
    {
      id: 1,
      name: "Pak Hendra Wijaya",
      location: "Bandung, Jawa Barat",
      avatar: "HW",
      specialty: "Jamur Tiram",
      experience: "15 tahun",
      rating: 4.9,
      reviews: 127,
      isVerified: true,
      isMentor: true,
      isPartner: true,
      bio: "Petani jamur profesional dengan pengalaman 15 tahun. Spesialis budidaya jamur tiram dan shiitake. Terbuka untuk kerjasama dan mentoring.",
      successStories: 45,
      students: 156,
    },
    {
      id: 2,
      name: "Bu Ratna Sari",
      location: "Malang, Jawa Timur",
      avatar: "RS",
      specialty: "Shiitake",
      experience: "10 tahun",
      rating: 4.8,
      reviews: 98,
      isVerified: true,
      isMentor: true,
      isPartner: false,
      bio: "Praktisi jamur organik. Passionate tentang pertanian berkelanjutan dan senang berbagi ilmu dengan petani pemula.",
      successStories: 32,
      students: 89,
    },
    {
      id: 3,
      name: "Mas Agus Santoso",
      location: "Semarang, Jawa Tengah",
      avatar: "AS",
      specialty: "Lion's Mane",
      experience: "8 tahun",
      rating: 4.9,
      reviews: 156,
      isVerified: true,
      isMentor: true,
      isPartner: true,
      bio: "Commercial grower dengan fasilitas modern. Ahli dalam budidaya jamur obat. Menerima kerjasama B2B.",
      successStories: 28,
      students: 67,
    },
    {
      id: 4,
      name: "Ibu Maya Dewi",
      location: "Yogyakarta",
      avatar: "MD",
      specialty: "Jamur Kuping",
      experience: "12 tahun",
      rating: 4.7,
      reviews: 84,
      isVerified: true,
      isMentor: true,
      isPartner: false,
      bio: "Fokus pada budidaya jamur kuping skala menengah. Menyediakan program mentoring intensif untuk pemula.",
      successStories: 38,
      students: 112,
    },
    {
      id: 5,
      name: "Pak Bambang Sutrisno",
      location: "Surabaya, Jawa Timur",
      avatar: "BS",
      specialty: "Multi-variant",
      experience: "20 tahun",
      rating: 5.0,
      reviews: 203,
      isVerified: true,
      isMentor: true,
      isPartner: true,
      bio: "Legenda di industri jamur Indonesia. Mengelola farm dengan 5000m² area produksi. Terbuka untuk investor dan mitra bisnis.",
      successStories: 67,
      students: 234,
    },
    {
      id: 6,
      name: "Bu Lestari Wulandari",
      location: "Batu, Jawa Timur",
      avatar: "LW",
      specialty: "Jamur Tiram",
      experience: "6 tahun",
      rating: 4.8,
      reviews: 56,
      isVerified: true,
      isMentor: false,
      isPartner: true,
      bio: "Petani muda yang sukses mengembangkan bisnis jamur dari nol. Mencari partner untuk ekspansi ke kota lain.",
      successStories: 15,
      students: 0,
    },
  ];

  const categories = [
    { name: "Semua Petani", count: 2847, active: true },
    { name: "Mentor", count: 423, icon: GraduationCap },
    { name: "Mitra Bisnis", count: 567, icon: Handshake },
    { name: "Terverifikasi", count: 1234, icon: CheckCircle },
  ];

  const regions = [
    { name: "Jawa Barat", farmers: 842, icon: "🏔️" },
    { name: "Jawa Timur", farmers: 756, icon: "🌾" },
    { name: "Jawa Tengah", farmers: 634, icon: "🌿" },
    { name: "Yogyakarta", farmers: 321, icon: "🏛️" },
    { name: "Bali", farmers: 187, icon: "🌴" },
    { name: "Sulawesi Selatan", farmers: 156, icon: "🌊" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 hero-gradient overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
          </div>

          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Temukan Petani Jamur Terbaik
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Cari mentor berpengalaman atau mitra bisnis untuk mengembangkan
                usaha jamur Anda. Terhubung dengan 2,800+ petani di seluruh
                Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari petani berdasarkan nama atau lokasi..."
                    className="pl-12 h-12 bg-primary-foreground/95"
                  />
                </div>
                <Button variant="hero" size="lg">
                  Cari Petani
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Join Banner */}
        <section className="section-container py-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 border border-accent/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Gabung Menjadi Petani
                  </h2>
                  <p className="text-muted-foreground">
                    Daftarkan diri Anda sebagai petani untuk mendapatkan
                    eksposur lebih luas, terhubung dengan calon mitra, dan
                    berbagi pengalaman dengan petani lainnya.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 lg:flex-shrink-0">
                <Link to="/farmers/register">
                  <Button size="lg" className="gap-2">
                    <Award className="w-5 h-5" />
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Categories Filter */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Kategori Petani
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                        category.active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {category.icon && <category.icon className="w-4 h-4" />}
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </span>
                      <span
                        className={`text-xs ${
                          category.active
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {category.count.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Regions */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Berdasarkan Wilayah
                </h3>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <button
                      key={region.name}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-muted transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{region.icon}</span>
                        <span className="text-sm text-foreground">
                          {region.name}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {region.farmers} petani
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Statistik Platform
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Total Petani
                    </span>
                    <span className="font-bold text-foreground">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Mentor Aktif
                    </span>
                    <span className="font-bold text-foreground">423</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Kerjasama Sukses
                    </span>
                    <span className="font-bold text-foreground">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Petani Baru
                    </span>
                    <span className="font-bold text-success">+156</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content - Farmers List */}
            <div className="lg:col-span-3">
              {/* Filter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Daftar Petani
                  </h2>
                  <p className="text-muted-foreground">
                    Menampilkan 6 dari 2,847 petani terdaftar
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Farmers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farmers.map((farmer) => (
                  <Link
                    to={`/farmers/${farmer.id}`}
                    key={farmer.id}
                    className="block"
                  >
                    <article className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer h-full">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-lg flex-shrink-0 relative">
                          {farmer.avatar}
                          {farmer.isVerified && (
                            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-success fill-success-foreground stroke-success" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground mb-1">
                            {farmer.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {farmer.location}
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {farmer.specialty}
                        </span>
                        {farmer.isMentor && (
                          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            Mentor
                          </span>
                        )}
                        {farmer.isPartner && (
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center gap-1">
                            <Handshake className="w-3 h-3" />
                            Mitra
                          </span>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {farmer.bio}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="font-medium text-foreground">
                            {farmer.rating}
                          </span>
                          <span className="text-xs">({farmer.reviews})</span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {farmer.experience}
                        </span>
                        {farmer.students > 0 && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {farmer.students} murid
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 gap-1">
                          <Phone className="w-4 h-4" />
                          Hubungi
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </Button>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Muat Lebih Banyak
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

export default Farmers;
