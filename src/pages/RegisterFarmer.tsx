import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Image as ImageIcon,
  X,
  Camera,
  Plus,
  Info,
  Shield,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useCreateFarmer } from "@/hooks/use-farmers";
import { useCommunityStats } from "@/hooks/use-community";
import { useUploadFile } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";

const RegisterFarmer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createFarmer = useCreateFarmer();
  const uploadFile = useUploadFile();
  const { data: statsData } = useCommunityStats();
  const stats = statsData?.data;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [whatsapp, setWhatsapp] = useState(user?.phone || "");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isMentor, setIsMentor] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [isConsultant, setIsConsultant] = useState(false);
  const [certifications, setCertifications] = useState<
    Array<{ name: string; issuer: string; year: string }>
  >([{ name: "", issuer: "", year: "" }]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadFile.mutateAsync({ file, bucket: "avatars" });
      setAvatarUrl(res.data.url);
    } catch {
      toast({ title: "Gagal upload foto", variant: "destructive" });
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      try {
        const res = await uploadFile.mutateAsync({ file, bucket: "gallery" });
        setGalleryUrls((prev) => [...prev, res.data.url]);
      } catch {
        toast({
          title: `Gagal upload ${file.name}`,
          variant: "destructive",
        });
      }
    }
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const addCertification = () =>
    setCertifications((prev) => [...prev, { name: "", issuer: "", year: "" }]);

  const updateCertification = (
    index: number,
    field: "name" | "issuer" | "year",
    value: string,
  ) => {
    setCertifications((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert)),
    );
  };

  const removeCertification = (index: number) =>
    setCertifications((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !whatsapp ||
      !region ||
      !city ||
      !specialty ||
      !experience ||
      !bio
    ) {
      toast({
        title: "Mohon lengkapi semua field yang wajib (*)",
        variant: "destructive",
      });
      return;
    }
    if (!termsAccepted) {
      toast({
        title: "Anda harus menyetujui syarat dan ketentuan",
        variant: "destructive",
      });
      return;
    }
    try {
      const validCerts = certifications.filter(
        (c) => c.name && c.issuer && c.year,
      );
      const res = await createFarmer.mutateAsync({
        fullName,
        email,
        phone,
        whatsapp,
        region,
        city,
        address: address || undefined,
        specialty,
        experience,
        bio,
        website: website || undefined,
        farmSize: farmSize || undefined,
        isMentor,
        isPartner,
        isConsultant,
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        certifications: validCerts.length > 0 ? validCerts : undefined,
        instagram: instagram || undefined,
        youtube: youtube || undefined,
        facebook: facebook || undefined,
      });
      toast({ title: "Pendaftaran berhasil!" });
      navigate(`/farmers/${res.data.id}`);
    } catch {
      toast({ title: "Gagal mendaftar, coba lagi", variant: "destructive" });
    }
  };

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

          {/* Logged in user info banner */}
          {user && (
            <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Mendaftar sebagai: {user.fullName}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Data pribadi Anda dari akun ({user.email}) telah diisi
                  otomatis. Anda bisa mengubahnya jika diperlukan.
                </p>
              </div>
            </div>
          )}

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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={user?.fullName ? "bg-muted/50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={user?.email ? "bg-muted/50" : ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        placeholder="+62 812-xxxx-xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={user?.phone ? "bg-muted/50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">Nomor WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        placeholder="+62 812-xxxx-xxxx"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Foto Profil</Label>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      {avatarUrl ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <p className="text-sm text-muted-foreground">
                            Klik untuk ganti foto
                          </p>
                        </div>
                      ) : uploadFile.isPending ? (
                        <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground mb-1">
                            Klik untuk upload atau drag & drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG (Maks. 2MB)
                          </p>
                        </>
                      )}
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
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota/Kabupaten *</Label>
                      <Input
                        id="city"
                        placeholder="Contoh: Bandung"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap farm Anda"
                      className="min-h-[100px]"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Opsional)</Label>
                    <Input
                      id="website"
                      placeholder="www.contoh.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
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
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis jamur" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Lama Pengalaman *</Label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih pengalaman" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((exp) => (
                            <SelectItem key={exp} value={exp}>
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
                    <Input
                      id="farmSize"
                      placeholder="Contoh: 500 m²"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio / Tentang Anda *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Ceritakan tentang diri Anda, pengalaman, dan keahlian dalam budidaya jamur..."
                      className="min-h-[150px]"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
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
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
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
                      <Checkbox
                        id="mentor"
                        className="mt-1"
                        checked={isMentor}
                        onCheckedChange={(v) => setIsMentor(!!v)}
                      />
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
                      <Checkbox
                        id="partner"
                        className="mt-1"
                        checked={isPartner}
                        onCheckedChange={(v) => setIsPartner(!!v)}
                      />
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
                      <Checkbox
                        id="consultation"
                        className="mt-1"
                        checked={isConsultant}
                        onCheckedChange={(v) => setIsConsultant(!!v)}
                      />
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
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/30 border border-border/50 relative"
                    >
                      {certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Nama Sertifikat</Label>
                          <Input
                            placeholder="Nama sertifikat"
                            value={cert.name}
                            onChange={(e) =>
                              updateCertification(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Penerbit</Label>
                          <Input
                            placeholder="Lembaga penerbit"
                            value={cert.issuer}
                            onChange={(e) =>
                              updateCertification(
                                index,
                                "issuer",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tahun</Label>
                          <Input
                            placeholder="2024"
                            value={cert.year}
                            onChange={(e) =>
                              updateCertification(index, "year", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={addCertification}
                  >
                    + Tambah Sertifikat Lain
                  </Button>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Galeri Foto
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Upload foto farm untuk meningkatkan kepercayaan
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Tambahkan foto-foto farm, proses budidaya, hasil panen, atau
                    kegiatan lainnya. Galeri foto membantu calon mitra lebih
                    percaya dengan profil Anda.
                  </p>

                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {galleryUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border/50 group"
                      >
                        <img
                          src={url}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryUrls((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs">
                          Foto {index + 1}
                        </div>
                      </div>
                    ))}

                    {/* Upload button */}
                    <div
                      onClick={() => galleryInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {uploadFile.isPending ? (
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-8 h-8 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Tambah Foto
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <h4 className="font-medium text-foreground text-sm mb-2">
                      Tips Foto yang Baik:
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Foto area produksi/kumbung dari berbagai sudut</li>
                      <li>• Foto proses budidaya dan panen</li>
                      <li>• Foto hasil panen berkualitas</li>
                      <li>• Foto sesi pelatihan (jika menjadi mentor)</li>
                      <li>• Format JPG/PNG, maksimal 5MB per foto</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      className="mt-1"
                      checked={termsAccepted}
                      onCheckedChange={(v) => setTermsAccepted(!!v)}
                    />
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

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleSubmit}
                    disabled={createFarmer.isPending || !termsAccepted}
                  >
                    {createFarmer.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    {createFarmer.isPending
                      ? "Mendaftar..."
                      : "Daftar Sekarang"}
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
                      <p className="text-2xl font-bold">
                        {stats?.totalMembers?.toLocaleString() ?? "—"}
                      </p>
                      <p className="text-xs text-primary-foreground/80">
                        Petani Terdaftar
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {stats?.verifiedSellers?.toLocaleString() ?? "—"}
                      </p>
                      <p className="text-xs text-primary-foreground/80">
                        Mentor Aktif
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {stats?.regionsCovered ?? "—"}
                      </p>
                      <p className="text-xs text-primary-foreground/80">
                        Provinsi
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {stats?.newThisMonth ?? "—"}
                      </p>
                      <p className="text-xs text-primary-foreground/80">
                        Baru Bulan Ini
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
