import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const FarmerDetail = () => {
  const { id } = useParams();

  // Sample farmer data (in real app, fetch based on id)
  const farmer = {
    id: 1,
    name: "Pak Hendra Wijaya",
    location: "Bandung, Jawa Barat",
    address: "Jl. Dago Pakar No. 45, Cimenyan, Bandung",
    avatar: "HW",
    specialty: "Jamur Tiram",
    experience: "15 tahun",
    rating: 4.9,
    reviews: 127,
    isVerified: true,
    isMentor: true,
    isPartner: true,
    bio: "Petani jamur profesional dengan pengalaman 15 tahun dalam industri budidaya jamur. Saya memulai perjalanan ini dari kebun kecil di belakang rumah, dan kini mengelola farm dengan kapasitas produksi 500kg jamur per minggu.",
    fullBio: `Saya adalah petani jamur profesional yang telah berkecimpung di industri ini selama 15 tahun. Perjalanan saya dimulai dari sebuah kebun kecil di belakang rumah dengan modal awal hanya Rp 5 juta.

Kini, saya mengelola FungiFarm Bandung dengan luas area produksi 2000m² dan kapasitas produksi mencapai 500kg jamur tiram per minggu. Kami juga memproduksi shiitake dan lion's mane dalam jumlah yang lebih kecil untuk pasar premium.

Saya percaya bahwa berbagi ilmu adalah kunci kemajuan bersama. Itulah mengapa saya aktif sebagai mentor dan telah membantu lebih dari 150 petani pemula untuk memulai usaha mereka sendiri. Banyak dari mereka kini telah sukses dan mandiri.

Saya terbuka untuk berbagai bentuk kerjasama, mulai dari:
• Mentoring dan pelatihan untuk petani pemula
• Kerjasama distribusi dan supply chain
• Konsultasi setup farm dan optimasi produksi
• Partnership investasi untuk ekspansi

Jangan ragu untuk menghubungi saya jika Anda tertarik untuk berdiskusi lebih lanjut.`,
    joinedDate: "Januari 2020",
    lastActive: "2 jam yang lalu",
    successStories: 45,
    students: 156,
    totalHarvest: "25,000+ kg",
    farmSize: "2000 m²",
    phone: "+62 812-3456-7890",
    whatsapp: "+62 812-3456-7890",
    email: "hendra.wijaya@fungifarm.id",
    website: "www.fungifarm-bandung.com",
    socialMedia: {
      instagram: "@fungifarm_bandung",
      youtube: "FungiFarm Bandung",
      facebook: "FungiFarm Bandung Official",
    },
    skills: [
      "Budidaya Jamur Tiram",
      "Budidaya Shiitake",
      "Manajemen Farm",
      "Pelatihan & Mentoring",
      "Setup Kumbung",
      "Kontrol Hama",
      "Pasca Panen",
    ],
    certifications: [
      {
        name: "Sertifikat Organik Indonesia",
        issuer: "Lembaga Sertifikasi Organik",
        year: "2023",
      },
      {
        name: "Good Agricultural Practices (GAP)",
        issuer: "Kementerian Pertanian",
        year: "2022",
      },
      {
        name: "Pelatih Budidaya Jamur Bersertifikat",
        issuer: "Dinas Pertanian Jawa Barat",
        year: "2021",
      },
    ],
    gallery: [
      { url: "/placeholder-farm-1.jpg", caption: "Area produksi utama" },
      { url: "/placeholder-farm-2.jpg", caption: "Proses panen jamur tiram" },
      {
        url: "/placeholder-farm-3.jpg",
        caption: "Sesi pelatihan dengan murid",
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      author: "Bu Siti Rahayu",
      avatar: "SR",
      rating: 5,
      date: "2 minggu lalu",
      content:
        "Pak Hendra adalah mentor yang sangat sabar dan berpengalaman. Berkat bimbingannya, saya berhasil memulai usaha jamur saya sendiri. Sangat direkomendasikan!",
    },
    {
      id: 2,
      author: "Mas Dodi Pratama",
      avatar: "DP",
      rating: 5,
      date: "1 bulan lalu",
      content:
        "Kerjasama bisnis dengan Pak Hendra sangat profesional. Supply jamur selalu tepat waktu dan kualitas konsisten. Partner bisnis yang bisa diandalkan.",
    },
    {
      id: 3,
      author: "Ibu Maya",
      avatar: "IM",
      rating: 4,
      date: "1 bulan lalu",
      content:
        "Pelatihannya sangat komprehensif. Dari teori sampai praktik langsung di farm. Worth every penny!",
    },
  ];

  const services = [
    {
      icon: GraduationCap,
      title: "Mentoring Pemula",
      description: "Program pendampingan 3 bulan untuk petani pemula",
      price: "Rp 5.000.000",
    },
    {
      icon: Briefcase,
      title: "Konsultasi Bisnis",
      description: "Konsultasi setup farm dan optimasi produksi",
      price: "Rp 500.000/sesi",
    },
    {
      icon: Handshake,
      title: "Kerjasama Distribusi",
      description: "Partnership supply jamur untuk reseller/restoran",
      price: "Nego",
    },
    {
      icon: Users,
      title: "Pelatihan Kelompok",
      description: "Workshop budidaya jamur untuk 10-20 orang",
      price: "Rp 2.000.000/orang",
    },
  ];

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
                    <div className="w-28 h-28 rounded-2xl bg-primary/10 border-4 border-card flex items-center justify-center font-bold text-primary text-3xl flex-shrink-0 relative -mt-20 sm:-mt-24 shadow-lg z-10">
                      {farmer.avatar}
                      {farmer.isVerified && (
                        <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-success fill-success-foreground stroke-success" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                            {farmer.name}
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
                            ({farmer.reviews} ulasan)
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {farmer.experience}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {farmer.students} murid
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Aktif {farmer.lastActive}
                        </span>
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
                  {farmer.fullBio.split("\n\n").map((paragraph, index) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {service.price}
                      </p>
                    </div>
                  ))}
                </div>
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

              {/* Reviews */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Ulasan ({farmer.reviews})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-bold text-foreground">
                      {farmer.rating}
                    </span>
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
                          <p className="text-sm text-muted-foreground">
                            {review.content}
                          </p>
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
                        {farmer.totalHarvest}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Panen
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/30">
                      <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="font-bold text-foreground">
                        {farmer.students}
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
                        {farmer.farmSize}
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
                        {farmer.lastActive}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        Status
                      </span>
                      <span className="text-sm font-medium text-success">
                        Terverifikasi
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
