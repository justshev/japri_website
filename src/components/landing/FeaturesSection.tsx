import { MessageSquare, Store, Cpu, Users, Shield, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Knowledge Forum",
      description: "Share cultivation tips, troubleshoot problems, and learn from experienced farmers. Our community has the answers.",
      color: "bg-primary",
    },
    {
      icon: Store,
      title: "Farmer's Marketplace",
      description: "Buy and sell fresh harvests, growing supplies, and proprietary tools. Direct farmer-to-buyer transactions.",
      color: "bg-accent",
    },
    {
      icon: Cpu,
      title: "Smart Device Integration",
      description: "Connect your smart farming devices to share real-time cultivation data and automate reporting.",
      color: "bg-info",
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with farmers in your region. Build relationships, share resources, and grow together.",
      color: "bg-warning",
    },
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "Trust badges for reliable sellers. Review system ensures quality and accountability.",
      color: "bg-success",
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your farming progress, harvest trends, and marketplace performance with detailed insights.",
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-20 lg:py-32 nature-bg">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="trust-badge mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete ecosystem designed by farmers, for farmers. From knowledge 
            sharing to selling your harvest — we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift card-gradient"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
