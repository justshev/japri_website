import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  MapPin,
  Users,
  Star,
  MessageCircle,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  useCommunityStats,
  useTopFarmers,
  useRegions,
  useRecentMembers,
} from "@/hooks/use-community";
import { FarmerAvatar, UserAvatar } from "@/components/ui/avatar-placeholder";

const Community = () => {
  const [search, setSearch] = useState("");

  const { data: statsData } = useCommunityStats();
  const { data: topFarmersData, isLoading: loadingFarmers } = useTopFarmers(5);
  const { data: regionsData, isLoading: loadingRegions } = useRegions();
  const { data: recentData, isLoading: loadingRecent } = useRecentMembers(5);

  const stats = statsData?.data;
  const topFarmers = topFarmersData?.data ?? [];
  const regions = regionsData?.data ?? [];
  const recentMembers = recentData?.data ?? [];

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 hero-gradient overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
          </div>

          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Join Our Growing Community
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Connect with 12,000+ mushroom farmers across Indonesia. Share
                knowledge, find mentors, and grow together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search farmers by name or location..."
                    className="pl-12 h-12 bg-primary-foreground/95"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Link
                  to={`/farmers${search ? `?search=${encodeURIComponent(search)}` : ""}`}
                >
                  <Button variant="hero" size="lg">
                    Find Farmers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Top Farmers */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Top Community Members
                    </h2>
                    <p className="text-muted-foreground">
                      Most active and helpful farmers this month
                    </p>
                  </div>
                  <Button variant="ghost" className="group">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {loadingFarmers ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl bg-card border border-border/50"
                      >
                        <div className="flex gap-4">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-14 h-14 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : topFarmers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Belum ada data petani
                    </div>
                  ) : (
                    topFarmers.map((farmer, index) => (
                      <Link
                        to={`/farmers/${farmer.id}`}
                        key={farmer.id}
                        className="block"
                      >
                        <article className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift cursor-pointer">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            {/* Rank Badge */}
                            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                              #{index + 1}
                            </div>

                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                              <FarmerAvatar
                                name={farmer.fullName}
                                src={farmer.avatar}
                                size="xl"
                              />
                              {farmer.isVerified && (
                                <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-success fill-success-foreground stroke-success" />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="font-display font-semibold text-foreground">
                                  {farmer.fullName}
                                </h3>
                                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                                  {farmer.specialty}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                {farmer.location}
                              </div>

                              {farmer.bio && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                  {farmer.bio}
                                </p>
                              )}

                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Star className="w-4 h-4 text-warning fill-warning" />
                                  <span className="font-medium text-foreground">
                                    {farmer.rating}
                                  </span>
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <MessageCircle className="w-4 h-4" />
                                  {farmer.postCount} posts
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <ShoppingBag className="w-4 h-4" />
                                  {farmer.salesCount} sales
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col gap-2">
                              <Button size="sm" className="flex-1">
                                Follow
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                Message
                              </Button>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))
                  )}
                </div>
              </section>

              {/* Regions */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Browse by Region
                    </h2>
                    <p className="text-muted-foreground">
                      Find farmers near you
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {loadingRegions
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-card border border-border/50"
                        >
                          <Skeleton className="h-8 w-8 mb-3" />
                          <Skeleton className="h-5 w-24 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))
                    : regions.map((region) => (
                        <Link
                          key={region.name}
                          to={`/farmers?region=${encodeURIComponent(region.name)}`}
                          className="block"
                        >
                          <div className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover-lift text-left">
                            <span className="text-3xl mb-3 block">
                              {region.icon}
                            </span>
                            <h3 className="font-semibold text-foreground mb-1">
                              {region.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {region.farmerCount.toLocaleString()} farmers
                            </p>
                          </div>
                        </Link>
                      ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Stats */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Community Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="font-bold text-foreground">
                      {stats?.totalMembers?.toLocaleString() ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Verified Sellers
                    </span>
                    <span className="font-bold text-foreground">
                      {stats?.verifiedSellers?.toLocaleString() ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Regions Covered
                    </span>
                    <span className="font-bold text-foreground">
                      {stats?.regionsCovered ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      New This Month
                    </span>
                    <span className="font-bold text-success">
                      {stats ? `+${stats.newThisMonth}` : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Members */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  New Members
                </h3>
                <div className="space-y-3">
                  {loadingRecent
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      ))
                    : recentMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3"
                        >
                          <UserAvatar
                            name={member.fullName}
                            src={member.avatar}
                            size="md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {member.fullName}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(member.createdAt)}
                          </span>
                        </div>
                      ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All New Members
                </Button>
              </div>

              {/* Join CTA */}
              <div className="p-6 rounded-2xl hero-gradient text-primary-foreground">
                <h3 className="font-display font-semibold mb-2">
                  Become a Verified Seller
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Get verified to unlock exclusive features and build trust with
                  buyers.
                </p>
                <Link to="/register-farmer">
                  <Button variant="hero" size="sm" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
