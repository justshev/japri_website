import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Check } from "lucide-react";

const CTASection = () => {
  const benefits = [
    "Free to join — no hidden fees",
    "Connect with 12,000+ farmers",
    "Verified seller program",
    "24/7 community support",
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 mb-8">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Grow Your{" "}
            <span className="relative inline-block">
              Farming Journey?
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent"/>
              </svg>
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join Indonesia's fastest-growing mushroom farming community today. 
            Share knowledge, grow your business, and be part of something bigger.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            {benefits.map((benefit) => (
              <div 
                key={benefit}
                className="flex items-center gap-3 text-primary-foreground/90"
              >
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="group">
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Learn More
            </Button>
          </div>

          {/* Trust Note */}
          <p className="mt-8 text-sm text-primary-foreground/60">
            Trusted by farmers across 34 provinces in Indonesia
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
