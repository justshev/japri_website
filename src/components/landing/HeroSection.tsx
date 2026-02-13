import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ShoppingBag, MessageCircle } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { value: "12,000+", label: "Active Farmers", icon: Users },
    { value: "45,000+", label: "Transactions", icon: ShoppingBag },
    { value: "89,000+", label: "Forum Posts", icon: MessageCircle },
  ];

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-foreground/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-[15%] w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-48 right-[20%] w-6 h-6 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-[25%] w-3 h-3 bg-primary-foreground/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-60 right-[30%] w-5 h-5 bg-primary-foreground/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Indonesia's #1 Mushroom Farming Community
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
            Grow Together,{" "}
            <span className="relative">
              Harvest More
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 4 150 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent"/>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            Join thousands of mushroom farmers sharing knowledge, selling harvests, 
            and building a sustainable future. From tips to marketplace — everything 
            you need to succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button variant="hero" size="xl" className="group">
              Join the Community
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Explore Marketplace
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
              >
                <stat.icon className="w-6 h-6 text-accent mb-2" />
                <span className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-primary-foreground/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
