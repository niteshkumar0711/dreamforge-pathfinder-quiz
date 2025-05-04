
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Career Quiz', path: '/quiz' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white dark:bg-dreamforge-dark shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-dreamforge-dark dark:text-white">
              Dream<span className="text-dreamforge-blue">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base transition-colors duration-300 hover:text-dreamforge-blue",
                  isActive(link.path)
                    ? "font-semibold text-dreamforge-blue"
                    : "text-dreamforge-dark dark:text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="text-dreamforge-blue border-dreamforge-blue hover:bg-dreamforge-blue hover:text-white transition-colors duration-300"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white transition-colors duration-300"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-lg transition-colors",
                      isActive(link.path)
                        ? "font-semibold text-dreamforge-blue"
                        : "text-dreamforge-dark dark:text-gray-300"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    variant="outline"
                    className="text-dreamforge-blue border-dreamforge-blue hover:bg-dreamforge-blue hover:text-white"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
