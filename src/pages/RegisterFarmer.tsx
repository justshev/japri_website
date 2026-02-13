import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
  Handshake,
  Upload,
  CheckCircle,
  Sprout,
  Award,
} from "lucide-react";

const RegisterFarmer = () => {
  const specialties = [
    "Jamur Tiram",
    "Shiitake",
    "Lion's Mane",
    "Jamur Kuping",
    "Jamur Merang",
    "Multi-variant",
    "Lainnya",
  ];

  const experienceOptions = [
    "Kurang dari 1 tahun",
    "1-3 tahun",
    "3-5 tahun",
    "5-10 tahun",
    "10-15 tahun",
    "Lebih dari 15 tahun",
  ];

  const regions = [
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "DKI Jakarta",
    "Yogyakarta",
    "Bali",
    "Sumatera Utara",
    "Sumatera Selatan",
    "Sulawesi Selatan",
    "Kalimantan Timur",
    "Lainnya",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-12 hero-gradient overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
          </div>

          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Sprout className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Gabung Menjadi Petani
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Daftarkan diri Anda sebagai petani untuk mendapatkan eksposur
                lebih luas, terhubung dengan calon mitra, dan berbagi pengalaman
                dengan petani lainnya.
              </p>
            </div>
          </div>
        </section>

        <div className="section-container py-12">
          {/* Back Navigation */}
          <Link
            to="/farmers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              Kembali ke Daftar Petani
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Informasi Pribadi
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Data diri Anda sebagai petani
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nama Lengkap *</Label>
                      <Input
                        id="fullName"
                        placeholder="Contoh: Pak Hendra Wijaya"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input id="phone" placeholder="+62 812-xxxx-xxxx" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">Nomor WhatsApp *</Label>
                      <Input id="whatsapp" placeholder="+62 812-xxxx-xxxx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Foto Profil</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Klik untuk upload atau drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG (Maks. 2MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Lokasi
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Lokasi farm atau tempat usaha Anda
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Provinsi *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem
                              key={region}
                              value={region.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota/Kabupaten *</Label>
                      <Input id="city" placeholder="Contoh: Bandung" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap farm Anda"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Opsional)</Label>
                    <Input id="website" placeholder="www.contoh.com" />
                  </div>
                </div>
              </div>

              {/* Experience & Specialty */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Pengalaman & Keahlian
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Informasi tentang keahlian Anda
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Spesialisasi *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis jamur" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem
                              key={specialty}
                              value={specialty
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                            >
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Lama Pengalaman *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih pengalaman" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((exp) => (
                            <SelectItem
                              key={exp}
                              value={exp.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {exp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmSize">
                      Luas Area Produksi (Opsional)
                    </Label>
                    <Input id="farmSize" placeholder="Contoh: 500 m²" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio / Tentang Anda *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Ceritakan tentang diri Anda, pengalaman, dan keahlian dalam budidaya jamur..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Keahlian (Pilih yang sesuai)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {[
                        "Budidaya Jamur Tiram",
                        "Budidaya Shiitake",
                        "Manajemen Farm",
                        "Pelatihan & Mentoring",
                        "Setup Kumbung",
                        "Kontrol Hama",
                        "Pasca Panen",
                        "Pengolahan Produk",
                      ].map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={skill.toLowerCase().replace(/\s+/g, "-")}
                          />
                          <Label
                            htmlFor={skill.toLowerCase().replace(/\s+/g, "-")}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Layanan yang Ditawarkan
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Pilih layanan yang Anda tawarkan
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Checkbox id="mentor" className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor="mentor"
                          className="font-medium cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-accent" />
                            Tersedia sebagai Mentor
                          </div>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Saya bersedia membimbing dan melatih petani pemula
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Checkbox id="partner" className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor="partner"
                          className="font-medium cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Handshake className="w-4 h-4 text-blue-500" />
                            Terbuka untuk Kerjasama Bisnis
                          </div>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Saya terbuka untuk kerjasama distribusi, supply chain,
                          atau partnership
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Checkbox id="consultation" className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor="consultation"
                          className="font-medium cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Layanan Konsultasi
                          </div>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Saya menyediakan layanan konsultasi setup farm dan
                          optimasi produksi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Sertifikasi (Opsional)
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Sertifikat yang Anda miliki
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="certName1">Nama Sertifikat</Label>
                        <Input id="certName1" placeholder="Nama sertifikat" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certIssuer1">Penerbit</Label>
                        <Input
                          id="certIssuer1"
                          placeholder="Lembaga penerbit"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certYear1">Tahun</Label>
                        <Input id="certYear1" placeholder="2024" />
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    + Tambah Sertifikat Lain
                  </Button>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" className="mt-1" />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal cursor-pointer leading-relaxed"
                    >
                      Saya menyetujui{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        Syarat dan Ketentuan
                      </Link>{" "}
                      serta{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:underline"
                      >
                        Kebijakan Privasi
                      </Link>{" "}
                      yang berlaku. Saya juga menyatakan bahwa semua informasi
                      yang saya berikan adalah benar dan dapat
                      dipertanggungjawabkan.
                    </Label>
                  </div>

                  <Button size="lg" className="w-full gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Daftar Sekarang
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Info Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Keuntungan Menjadi Petani
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Eksposur Lebih Luas
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Profil Anda akan tampil di platform dan dapat
                          ditemukan oleh calon mitra
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Handshake className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Peluang Kerjasama
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Terhubung dengan petani lain, pembeli, dan investor di
                          platform
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Program Mentoring
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Kesempatan menjadi mentor dan mendapatkan penghasilan
                          tambahan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Verifikasi Profil
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Dapatkan badge terverifikasi untuk meningkatkan
                          kepercayaan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Butuh Bantuan?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jika Anda memiliki pertanyaan seputar pendaftaran, silakan
                    hubungi tim kami.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:support@fungifarm.id"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      support@fungifarm.id
                    </a>
                    <a
                      href="https://wa.me/628123456789"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      +62 812-3456-789
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="rounded-2xl hero-gradient text-primary-foreground p-6">
                  <h3 className="font-display font-semibold mb-4">
                    Bergabunglah dengan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">2,847</p>
                      <p className="text-xs text-primary-foreground/80">
                        Petani Terdaftar
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">423</p>
                      <p className="text-xs text-primary-foreground/80">
                        Mentor Aktif
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-xs text-primary-foreground/80">
                        Kerjasama Sukses
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">34</p>
                      <p className="text-xs text-primary-foreground/80">
                        Provinsi
                      </p>
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

export default RegisterFarmer;
