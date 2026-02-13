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
  Image as ImageIcon,
  X,
  Plus,
  Save,
  Send,
  Info,
  Package,
  Tag,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle,
  GripVertical,
  Loader2,
} from "lucide-react";
import { useCreateProduct } from "@/hooks/use-products";
import { useUploadFile } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createProduct = useCreateProduct();
  const uploadFile = useUploadFile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [minOrder, setMinOrder] = useState("1");
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<
    { label: string; value: string }[]
  >([{ label: "", value: "" }]);
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const categories = [
    { value: "fresh", label: "Fresh Harvest (Panen Segar)" },
    { value: "spawn", label: "Spawn & Bibit" },
    { value: "substrate", label: "Media Tanam & Substrat" },
    { value: "equipment", label: "Peralatan & Perlengkapan" },
    { value: "processed", label: "Produk Olahan" },
    { value: "other", label: "Lainnya" },
  ];

  const conditions = [
    { value: "fresh", label: "Segar" },
    { value: "dried", label: "Kering" },
    { value: "frozen", label: "Beku" },
    { value: "processed", label: "Olahan" },
    { value: "new", label: "Baru (untuk peralatan)" },
    { value: "used", label: "Bekas (untuk peralatan)" },
  ];

  const units = [
    { value: "/kg", label: "per Kilogram (/kg)" },
    { value: "/gram", label: "per Gram (/gram)" },
    { value: "/pack", label: "per Pack (/pack)" },
    { value: "/bag", label: "per Bag (/bag)" },
    { value: "/pcs", label: "per Piece (/pcs)" },
    { value: "/set", label: "per Set (/set)" },
    { value: "/unit", label: "per Unit (/unit)" },
  ];

  const handleImageUpload = async () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || images.length >= 8) return;
    try {
      const result = await uploadFile.mutateAsync({ file, bucket: "products" });
      setImages((prev) => [...prev, result.data.url]);
    } catch {
      toast({ title: "Gagal upload foto", variant: "destructive" });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { label: "", value: "" }]);
  };

  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleSubmit = async (isDraft: boolean) => {
    const parsedPrice = parseInt(price.replace(/\D/g, ""), 10);
    const parsedOriginal = originalPrice
      ? parseInt(originalPrice.replace(/\D/g, ""), 10)
      : undefined;

    try {
      const result = await createProduct.mutateAsync({
        name: productName,
        description,
        category,
        condition,
        price: parsedPrice,
        originalPrice: parsedOriginal,
        unit,
        stock: parseInt(stock, 10),
        minOrder: minOrder ? parseInt(minOrder, 10) : undefined,
        weight: weight ? parseInt(weight, 10) : undefined,
        images,
        specifications: specifications.filter((s) => s.label && s.value),
        location,
        whatsapp,
        isDraft,
      });
      toast({
        title: isDraft ? "Draft disimpan" : "Produk berhasil dipublikasikan!",
      });
      navigate(`/marketplace/${result.data.id}`);
    } catch {
      toast({ title: "Gagal menyimpan produk", variant: "destructive" });
    }
  };

  const formatPrice = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const isFormValid =
    productName &&
    description &&
    category &&
    price &&
    unit &&
    stock &&
    whatsapp &&
    agreeToTerms &&
    images.length > 0;

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Jual Produk Baru
                </h1>
                <p className="text-muted-foreground">
                  Lengkapi informasi produk dengan detail untuk menarik lebih
                  banyak pembeli.
                </p>
              </div>

              {/* Product Images */}
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Foto Produk</h2>
                  <span className="text-destructive">*</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`relative rounded-xl overflow-hidden bg-muted border-2 group cursor-move ${
                        index === 0
                          ? "w-32 h-32 border-primary"
                          : "w-24 h-24 border-border/50"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                          Foto Utama
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="text-white">
                          <GripVertical className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-white hover:text-destructive"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {images.length < 8 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={uploadFile.isPending}
                      className="w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    >
                      {uploadFile.isPending ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-6 h-6" />
                          <span className="text-xs">Tambah</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Upload min. 1 foto, max. 8 foto. Foto pertama akan jadi foto
                  utama. Format: JPG, PNG. Max 5MB per foto.
                </p>
              </div>

              {/* Product Info */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">
                    Informasi Produk
                  </h2>
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="productName"
                    className="text-foreground font-medium"
                  >
                    Nama Produk <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Contoh: Jamur Tiram Segar Premium Grade A"
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {productName.length}/100 karakter
                  </p>
                </div>

                {/* Category & Condition */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Kategori <span className="text-destructive">*</span>
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Kondisi
                    </Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kondisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond.value} value={cond.value}>
                            {cond.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-foreground font-medium"
                  >
                    Deskripsi Produk <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan detail produk Anda:
- Keunggulan produk
- Cara penyimpanan
- Manfaat atau kegunaan
- Catatan penting untuk pembeli"
                    className="min-h-[150px] resize-y"
                  />
                  <p className="text-xs text-muted-foreground">
                    Min. 30 karakter. Deskripsi yang lengkap membantu pembeli
                    memahami produk Anda.
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">
                    Harga & Stok
                  </h2>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-foreground font-medium"
                    >
                      Harga Jual <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(formatPrice(e.target.value))}
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="originalPrice"
                      className="text-foreground font-medium"
                    >
                      Harga Coret (Opsional)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        id="originalPrice"
                        value={originalPrice}
                        onChange={(e) =>
                          setOriginalPrice(formatPrice(e.target.value))
                        }
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Harga sebelum diskon (jika ada)
                    </p>
                  </div>
                </div>

                {/* Unit & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Satuan <span className="text-destructive">*</span>
                    </Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih satuan" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((u) => (
                          <SelectItem key={u.value} value={u.value}>
                            {u.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="stock"
                      className="text-foreground font-medium"
                    >
                      Stok <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="minOrder"
                      className="text-foreground font-medium"
                    >
                      Min. Pembelian
                    </Label>
                    <Input
                      id="minOrder"
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label
                    htmlFor="weight"
                    className="text-foreground font-medium"
                  >
                    Berat per Unit (gram)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Contoh: 1000 (untuk 1kg)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Berguna untuk estimasi ongkir pembeli
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-foreground">
                      Spesifikasi (Opsional)
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSpecification}
                    className="gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah
                  </Button>
                </div>

                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        value={spec.label}
                        onChange={(e) =>
                          handleSpecificationChange(
                            index,
                            "label",
                            e.target.value,
                          )
                        }
                        placeholder="Label (contoh: Jenis)"
                        className="flex-1"
                      />
                      <Input
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecificationChange(
                            index,
                            "value",
                            e.target.value,
                          )
                        }
                        placeholder="Nilai (contoh: Jamur Tiram)"
                        className="flex-1"
                      />
                      {specifications.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSpecification(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tambahkan detail seperti: Jenis, Metode Budidaya, Masa Simpan,
                  dll.
                </p>
              </div>

              {/* Contact Info */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">
                    Informasi Kontak
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="whatsapp"
                      className="text-foreground font-medium"
                    >
                      Nomor WhatsApp <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                    />
                    <p className="text-xs text-muted-foreground">
                      Pembeli akan menghubungi via WhatsApp
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-foreground font-medium"
                    >
                      Lokasi <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Kota, Provinsi"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="agreeTerms"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Saya menyetujui{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        Syarat dan Ketentuan
                      </Link>{" "}
                      marketplace dan menjamin bahwa produk yang dijual adalah
                      asli dan sesuai deskripsi.
                    </Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled={createProduct.isPending}
                  onClick={() => handleSubmit(true)}
                >
                  {createProduct.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Simpan Draft
                </Button>
                <Button
                  className="gap-2 flex-1"
                  disabled={!isFormValid || createProduct.isPending}
                  onClick={() => handleSubmit(false)}
                >
                  {createProduct.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Publikasikan Produk
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Preview Card */}
                <div className="rounded-2xl bg-card border border-border/50 p-5">
                  <h3 className="font-semibold text-foreground mb-4">
                    Preview Produk
                  </h3>
                  <div className="rounded-xl border border-border/50 overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center overflow-hidden">
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <p className="text-xs">Belum ada foto</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-foreground line-clamp-2 mb-2">
                        {productName || "Nama Produk"}
                      </h4>
                      <p className="text-lg font-bold text-primary">
                        {price ? `Rp ${price}` : "Rp 0"}
                        <span className="text-sm font-normal text-muted-foreground">
                          {unit || "/unit"}
                        </span>
                      </p>
                      {location && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="rounded-2xl bg-success/5 border border-success/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <h3 className="font-semibold text-foreground">
                      Tips Agar Cepat Laku
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      Upload foto produk yang jelas & menarik
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      Tulis deskripsi lengkap dan jujur
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      Berikan harga kompetitif
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      Respon cepat pesan pembeli
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      Update stok secara berkala
                    </li>
                  </ul>
                </div>

                {/* Warning Card */}
                <div className="rounded-2xl bg-warning/5 border border-warning/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <h3 className="font-semibold text-foreground">Perhatian</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Produk yang melanggar akan dihapus</li>
                    <li>• Dilarang menjual produk ilegal</li>
                    <li>• Foto harus asli, bukan dari internet</li>
                    <li>• Harga harus sesuai dengan produk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateProduct;
