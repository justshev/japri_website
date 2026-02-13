import { UserPlus, MessageSquare, ShoppingBag, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up in seconds. Tell us about your farm, location, and what mushrooms you grow.",
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Join the Community",
      description: "Start learning from experienced farmers. Ask questions, share tips, and grow your knowledge.",
    },
    {
      number: "03",
      icon: ShoppingBag,
      title: "Trade & Sell",
      description: "List your harvests or find quality products. Connect directly with buyers and sellers.",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Grow & Scale",
      description: "Track your progress, build your reputation, and expand your farming business.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="trust-badge mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Started in{" "}
            <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a seasoned farmer or just starting out, our platform 
            makes it easy to connect, learn, and grow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center group"
              >
                {/* Step Number & Icon */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-muted border-2 border-border flex items-center justify-center mb-2 group-hover:border-primary group-hover:shadow-glow transition-all duration-300 relative z-10 bg-card">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (Mobile/Tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <svg className="w-6 h-6 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
