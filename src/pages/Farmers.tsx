import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useFarmers } from "@/hooks/use-farmers";
import { useCommunityStats, useRegions } from "@/hooks/use-community";
import { FarmerAvatar } from "@/components/ui/avatar-placeholder";

const Farmers = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [activeRegion, setActiveRegion] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const { data: farmersRes, isLoading } = useFarmers({
    search: search || undefined,
    category: activeCategory,
    region: activeRegion,
    page,
    limit: 10,
  });
  const { data: statsRes } = useCommunityStats();
  const { data: regionsRes } = useRegions();

  const farmers = farmersRes?.data?.farmers ?? [];
  const pagination = farmersRes?.data?.pagination;
  const stats = statsRes?.data;
  const regions = regionsRes?.data ?? [];

  const categories = [
    { name: "Semua Petani", value: undefined, icon: undefined },
    { name: "Mentor", value: "mentor", icon: GraduationCap },
    { name: "Mitra Bisnis", value: "partner", icon: Handshake },
    { name: "Terverifikasi", value: "verified", icon: CheckCircle },
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
                <form
                  className="relative flex-1 max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                  }}
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari petani berdasarkan nama atau lokasi..."
                    className="pl-12 h-12 bg-primary-foreground/95"
                  />
                </form>
                <Button variant="hero" size="lg" onClick={() => setPage(1)}>
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
                      onClick={() => {
                        setActiveCategory(category.value);
                        setPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                        activeCategory === category.value
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
                      onClick={() => {
                        setActiveRegion(
                          activeRegion === region.name
                            ? undefined
                            : region.name,
                        );
                        setPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        activeRegion === region.name
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{region.icon}</span>
                        <span className="text-sm text-foreground">
                          {region.name}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {region.farmerCount} petani
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
                    <span className="font-bold text-foreground">
                      {stats ? stats.totalMembers.toLocaleString() : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Penjual Terverifikasi
                    </span>
                    <span className="font-bold text-foreground">
                      {stats ? stats.verifiedSellers.toLocaleString() : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Wilayah
                    </span>
                    <span className="font-bold text-foreground">
                      {stats ? stats.regionsCovered.toLocaleString() : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Petani Baru
                    </span>
                    <span className="font-bold text-success">
                      +{stats ? stats.newThisMonth : "—"}
                    </span>
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
                    {pagination
                      ? `Menampilkan ${farmers.length} dari ${pagination.total} petani terdaftar`
                      : "Memuat..."}
                  </p>
                </div>
              </div>

              {/* Farmers Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-card border border-border/50"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <Skeleton className="w-14 h-14 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-36" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : farmers.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-semibold mb-2">
                    Tidak ada petani ditemukan
                  </h3>
                  <p className="text-muted-foreground">
                    Coba ubah filter atau kata kunci pencarian.
                  </p>
                </div>
              ) : (
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
                          <div className="relative flex-shrink-0">
                            <FarmerAvatar
                              name={farmer.fullName}
                              src={farmer.avatar}
                              size="xl"
                            />
                            {farmer.isVerified && (
                              <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-success fill-success-foreground stroke-success" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-semibold text-foreground mb-1">
                              {farmer.fullName}
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
                            <span className="text-xs">
                              ({farmer.reviewCount})
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Briefcase className="w-4 h-4" />
                            {farmer.experience} tahun
                          </span>
                          {farmer.studentCount > 0 && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              {farmer.studentCount} murid
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
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Sebelumnya
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">
                    Halaman {page} dari {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Selanjutnya
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

export default Farmers;
