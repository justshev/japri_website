import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sprout,
  MessageSquare,
  Store,
  Tractor,
  LogIn,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Forum", href: "/forum", icon: MessageSquare },
    { name: "Marketplace", href: "/marketplace", icon: Store },
    { name: "Petani", href: "/farmers", icon: Tractor },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              FungiFarm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 font-medium"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Link to="/farmers/register">
              <Button size="sm">Gabung Petani</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 font-medium"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 px-4">
              <Button variant="outline" className="w-full justify-center">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Link to="/farmers/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center">Gabung Petani</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
