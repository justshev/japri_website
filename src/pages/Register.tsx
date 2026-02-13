import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Loader2,
  Check,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthLevel = passwordStrength(formData.password);
  const strengthLabels = [
    "Sangat Lemah",
    "Lemah",
    "Cukup",
    "Kuat",
    "Sangat Kuat",
  ];
  const strengthColors = [
    "bg-destructive",
    "bg-destructive",
    "bg-warning",
    "bg-accent",
    "bg-primary",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast({
        title: "Oops!",
        description: "Silakan lengkapi semua field yang wajib diisi.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Pastikan konfirmasi password sama dengan password Anda.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password terlalu pendek",
        description: "Password harus minimal 8 karakter.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Syarat & Ketentuan",
        description:
          "Anda harus menyetujui syarat & ketentuan untuk mendaftar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const success = await registerUser({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    setIsLoading(false);

    if (success) {
      toast({
        title: "Pendaftaran berhasil! 🎉",
        description: "Selamat datang di komunitas FungiFarm.",
      });
      navigate("/", { replace: true });
    } else {
      toast({
        title: "Gagal mendaftar",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const passwordChecks = [
    { label: "Minimal 8 karakter", met: formData.password.length >= 8 },
    { label: "Huruf kapital", met: /[A-Z]/.test(formData.password) },
    { label: "Angka", met: /[0-9]/.test(formData.password) },
    { label: "Karakter spesial", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding / Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative hero-gradient overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div
          className="absolute top-32 left-[15%] w-4 h-4 bg-primary-foreground/20 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-48 right-[20%] w-6 h-6 bg-accent/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-[25%] w-3 h-3 bg-primary-foreground/15 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-60 right-[30%] w-5 h-5 bg-primary-foreground/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 xl:px-20">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-8 animate-pulse-glow">
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </div>

          <h1 className="font-display text-4xl xl:text-5xl font-bold text-primary-foreground text-center mb-6 leading-tight">
            Bergabunglah{" "}
            <span className="relative inline-block">
              Bersama Kami
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-accent"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg text-primary-foreground/80 text-center max-w-md leading-relaxed mb-12">
            Gabung dengan ribuan petani jamur di seluruh Indonesia. Berbagi
            ilmu, jual hasil panen, dan tumbuh bersama.
          </p>

          {/* Benefits */}
          <div className="w-full max-w-sm space-y-4">
            {[
              "Akses forum diskusi & berbagi pengalaman",
              "Jual beli di marketplace terpercaya",
              "Terhubung dengan petani se-Indonesia",
              "Gratis selamanya — tanpa biaya tersembunyi",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 text-primary-foreground/90"
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-background overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-6 sm:px-8 py-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              FungiFarm
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Buat Akun
            </h2>
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline underline-offset-4 transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl text-sm font-medium"
              type="button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Daftar dengan Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-medium">
                atau daftar dengan email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Nama Lengkap *
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Contoh: Hendra Wijaya"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Nomor Telepon
              </Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+62 812-xxxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          i < strengthLevel
                            ? strengthColors[strengthLevel]
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kekuatan password:{" "}
                    <span className="font-medium">
                      {strengthLabels[strengthLevel]}
                    </span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {passwordChecks.map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-1.5"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                            check.met ? "bg-primary" : "bg-border"
                          }`}
                        >
                          {check.met && (
                            <Check className="w-2 h-2 text-primary-foreground" />
                          )}
                        </div>
                        <span
                          className={`text-xs ${check.met ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Konfirmasi Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-destructive animate-fade-in">
                    Password tidak cocok
                  </p>
                )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword &&
                formData.confirmPassword.length > 0 && (
                  <p className="text-xs text-primary animate-fade-in flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Password cocok
                  </p>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
              >
                Saya menyetujui{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:underline underline-offset-2"
                >
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:underline underline-offset-2"
                >
                  Kebijakan Privasi
                </Link>{" "}
                FungiFarm.
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Buat Akun
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-xs text-center text-muted-foreground">
            Dengan mendaftar, Anda bergabung dengan komunitas petani jamur
            terbesar di Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
