
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-dreamforge-light to-white dark:from-dreamforge-dark dark:to-dreamforge-blue/20">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/path/to/pattern.svg')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-dreamforge-dark dark:text-white">
                Shape Your Future with <span className="text-dreamforge-blue">DreamForge</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                Discover the perfect career path after high school with our personalized guidance and expert counseling.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white px-6 py-6 text-lg"
                  onClick={() => navigate('/quiz')}
                >
                  Take Career Quiz <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-dreamforge-blue text-dreamforge-blue hover:bg-dreamforge-blue hover:text-white px-6 py-6 text-lg"
                  onClick={() => navigate('/colleges')}
                >
                  Explore Colleges
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/path/to/hero-image.svg" 
                alt="Career Guidance" 
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dreamforge-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dreamforge-dark dark:text-white">
            How DreamForge Helps You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dreamforge-card border-t-4 border-dreamforge-blue">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-dreamforge-light dark:bg-dreamforge-blue/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">Personalized Career Quiz</h3>
                <p className="text-gray-600 dark:text-gray-300">Take our comprehensive quiz to discover careers that match your interests, skills, and academic background.</p>
              </div>
            </Card>
            
            <Card className="dreamforge-card border-t-4 border-dreamforge-cyan">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-dreamforge-light dark:bg-dreamforge-blue/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">AI Counselor Chat</h3>
                <p className="text-gray-600 dark:text-gray-300">Get instant answers to your career questions from our intelligent AI counselor available 24/7.</p>
              </div>
            </Card>
            
            <Card className="dreamforge-card border-t-4 border-dreamforge-dark">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-dreamforge-light dark:bg-dreamforge-blue/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-dark dark:text-dreamforge-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">College Directory</h3>
                <p className="text-gray-600 dark:text-gray-300">Explore our comprehensive database of top colleges across India filtered by courses and locations.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dreamforge-blue/10 dark:bg-dreamforge-dark/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dreamforge-dark dark:text-white">Ready to Find Your Dream Career?</h2>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">Take our specially designed career assessment quiz and get personalized recommendations tailored to your interests and academic background.</p>
            <Button 
              className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white px-6 py-6 text-lg"
              onClick={() => navigate('/quiz')}
            >
              Start Your Career Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-dreamforge-blue text-white shadow-lg hover:bg-dreamforge-dark transition-colors duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Index;
