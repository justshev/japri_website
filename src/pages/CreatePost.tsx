import { useState } from "react";
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
  Image as ImageIcon,
  X,
  Plus,
  Eye,
  Save,
  Send,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Heading2,
  Info,
  Lightbulb,
} from "lucide-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [agreeToRules, setAgreeToRules] = useState(false);

  const categories = [
    { value: "tips", label: "Tips & Tricks" },
    { value: "question", label: "Pertanyaan" },
    { value: "discussion", label: "Diskusi" },
    { value: "showcase", label: "Showcase" },
    { value: "problem", label: "Problem & Solusi" },
    { value: "news", label: "Berita & Info" },
  ];

  const suggestedTags = [
    "jamur tiram",
    "pemula",
    "budidaya",
    "panen",
    "hama",
    "media tanam",
    "kumbung",
    "baglog",
    "sterilisasi",
    "suhu",
    "kelembaban",
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddSuggestedTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  const handleImageUpload = () => {
    // In real app, this would open file picker and upload
    const newImage = `/placeholder-image-${images.length + 1}.jpg`;
    if (images.length < 5) {
      setImages([...images, newImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (isDraft: boolean) => {
    // In real app, this would submit to API
    console.log({
      title,
      content,
      category,
      tags,
      images,
      isDraft,
    });
  };

  const insertMarkdown = (syntax: string) => {
    // Simple markdown insertion - in real app would be more sophisticated
    setContent(content + syntax);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back Navigation */}
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Forum</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Buat Diskusi Baru
                </h1>
                <p className="text-muted-foreground">
                  Bagikan pengalaman, ajukan pertanyaan, atau diskusikan topik
                  menarik dengan komunitas.
                </p>
              </div>

              {/* Form Card */}
              <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-foreground font-medium"
                  >
                    Judul Diskusi <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tulis judul yang jelas dan menarik..."
                    className="text-lg"
                    maxLength={150}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {title.length}/150 karakter
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Kategori <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori diskusi" />
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

                {/* Content Editor */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Konten <span className="text-destructive">*</span>
                  </Label>

                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-2 rounded-t-xl border border-border/50 border-b-0 bg-muted/30">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("**teks tebal**")}
                      className="h-8 w-8 p-0"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("*teks miring*")}
                      className="h-8 w-8 p-0"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("\n## Heading\n")}
                      className="h-8 w-8 p-0"
                    >
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("\n- Item list\n")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("\n1. Item list\n")}
                      className="h-8 w-8 p-0"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("[teks link](url)")}
                      className="h-8 w-8 p-0"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("\n> Quote\n")}
                      className="h-8 w-8 p-0"
                    >
                      <Quote className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertMarkdown("`kode`")}
                      className="h-8 w-8 p-0"
                    >
                      <Code className="w-4 h-4" />
                    </Button>
                    <div className="flex-1" />
                    <Button
                      type="button"
                      variant={isPreview ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setIsPreview(!isPreview)}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                  </div>

                  {/* Content Area */}
                  {isPreview ? (
                    <div className="min-h-[300px] p-4 rounded-b-xl border border-border/50 bg-background prose prose-sm max-w-none">
                      {content || (
                        <p className="text-muted-foreground italic">
                          Belum ada konten untuk di-preview...
                        </p>
                      )}
                    </div>
                  ) : (
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Tulis konten diskusi Anda di sini...

Tips:
- Jelaskan konteks atau latar belakang masalah
- Sertakan detail seperti jenis jamur, kondisi kumbung, dll
- Lampirkan foto jika perlu
- Gunakan markdown untuk formatting"
                      className="min-h-[300px] rounded-t-none resize-y"
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    Mendukung format Markdown. Min. 50 karakter.
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Lampiran Gambar (Opsional)
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted border border-border/50 group"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-primary/30" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-xs">Upload</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Max 5 gambar. Format: JPG, PNG. Max size: 5MB per gambar.
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Tags (Opsional)
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Tambah tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      disabled={tags.length >= 5}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTag}
                      disabled={tags.length >= 5}
                    >
                      Tambah
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground mr-1">
                      Saran:
                    </span>
                    {suggestedTags
                      .filter((tag) => !tags.includes(tag))
                      .slice(0, 6)
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddSuggestedTag(tag)}
                          className="text-xs px-2 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                          disabled={tags.length >= 5}
                        >
                          + {tag}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Rules Agreement */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                  <Checkbox
                    id="agree"
                    checked={agreeToRules}
                    onCheckedChange={(checked) =>
                      setAgreeToRules(checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="agree"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Saya menyetujui{" "}
                      <Link
                        to="/community-guidelines"
                        className="text-primary hover:underline"
                      >
                        Pedoman Komunitas
                      </Link>{" "}
                      dan memastikan diskusi ini tidak melanggar aturan.
                    </Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleSubmit(true)}
                  >
                    <Save className="w-4 h-4" />
                    Simpan Draft
                  </Button>
                  <Button
                    className="gap-2 flex-1"
                    disabled={
                      !title ||
                      !content ||
                      !category ||
                      !agreeToRules ||
                      content.length < 50
                    }
                    onClick={() => handleSubmit(false)}
                  >
                    <Send className="w-4 h-4" />
                    Publikasikan Diskusi
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips Card */}
              <div className="rounded-2xl bg-card border border-border/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-foreground">
                    Tips Menulis Diskusi
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Gunakan judul yang jelas dan spesifik</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Jelaskan konteks dan detail masalah</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Sertakan foto jika relevan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Pilih kategori yang tepat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span>Tambahkan tags untuk visibilitas</span>
                  </li>
                </ul>
              </div>

              {/* Community Guidelines */}
              <div className="rounded-2xl bg-info/5 border border-info/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-info" />
                  <h3 className="font-semibold text-foreground">
                    Pedoman Komunitas
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bersikap sopan dan menghargai sesama</li>
                  <li>• Tidak spam atau promosi berlebihan</li>
                  <li>• Tidak menyebarkan informasi palsu</li>
                  <li>• Tidak posting konten yang tidak pantas</li>
                  <li>• Gunakan bahasa yang baik dan benar</li>
                </ul>
              </div>

              {/* Category Info */}
              <div className="rounded-2xl bg-card border border-border/50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Kategori Diskusi
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.value} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {cat.label}
                        </span>
                      </div>
                    </div>
                  ))}
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

export default CreatePost;
