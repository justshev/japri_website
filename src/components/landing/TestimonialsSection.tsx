import { Star, Quote } from "lucide-react";
import { UserAvatar } from "@/components/ui/avatar-placeholder";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "FungiFarm changed everything for me. I went from struggling to find buyers to having consistent orders every week. The community taught me techniques that doubled my yield.",
      author: "Pak Hendra Wijaya",
      role: "Oyster Mushroom Farmer",
      location: "Bandung, West Java",
      avatar: "HW",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "As a new farmer, I was overwhelmed. The forum community answered all my questions, and within 3 months, I had my first successful harvest. Now I'm helping others too!",
      author: "Bu Ratna Sari",
      role: "Shiitake Cultivator",
      location: "Malang, East Java",
      avatar: "RS",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "The marketplace feature is incredible. I can source quality spawn from verified sellers across Indonesia. No more guessing about product quality — the reviews tell you everything.",
      author: "Mas Agus Santoso",
      role: "Commercial Farmer",
      location: "Semarang, Central Java",
      avatar: "AS",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="trust-badge mb-4">Success Stories</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Farmers <span className="text-gradient">Nationwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real farmers who transformed their businesses
            through our community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative p-8 rounded-2xl bg-background border border-border/50 hover-lift"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <UserAvatar name={testimonial.author} size="lg" />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
