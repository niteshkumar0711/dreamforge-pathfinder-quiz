
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';

const About = () => {
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Rajat Sharma",
      role: "Founder & Chief Career Counselor",
      bio: "Dr. Rajat holds a PhD in Career Psychology with over 15 years of experience guiding students. He founded DreamForge with the vision of making career guidance accessible to every student in India.",
      image: "/path/to/rajat.jpg"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Educational Counselor",
      bio: "Priya specializes in educational pathways for arts and humanities students. With her Master's in Education and experience at top universities, she helps students find their perfect academic journey.",
      image: "/path/to/priya.jpg"
    },
    {
      id: 3,
      name: "Aryan Kapoor",
      role: "Technology & STEM Advisor",
      bio: "Aryan has worked in the tech industry for 10 years before joining DreamForge. His expertise in STEM fields helps students navigate the rapidly evolving landscape of technology careers.",
      image: "/path/to/aryan.jpg"
    },
    {
      id: 4,
      name: "Dr. Meera Iyer",
      role: "Commerce & Business Specialist",
      bio: "Dr. Meera brings her experience as a former professor of Business Administration and industry consultant to help commerce students find their niche in the business world.",
      image: "/path/to/meera.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-dreamforge-blue/10 dark:bg-dreamforge-dark/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dreamforge-dark dark:text-white">
                About <span className="text-dreamforge-blue">DreamForge</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Guiding high school graduates towards their ideal career path with personalized assessments and expert counseling.
              </p>
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-dreamforge-blue rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dreamforge-dark dark:text-white text-center">
                Our Story
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    DreamForge was born out of a shared frustration: too many talented students were making career decisions based on limited information, peer pressure, or societal expectations rather than their own interests and aptitudes.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Founded in 2020 by Dr. Rajat Sharma, DreamForge began as a small counseling center in Delhi. As demand grew, we expanded our team and developed our innovative assessment methodology that combines psychometric analysis with academic background and industry trends.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Today, we've helped over 50,000 students across India find their ideal career paths. Our mission remains constant: to equip every high school graduate with the insights and information they need to make confident career decisions.
                  </p>
                </div>
                <div className="order-first md:order-last">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-40 h-40 bg-dreamforge-blue/20 rounded-full -z-10"></div>
                    <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-dreamforge-cyan/20 rounded-full -z-10"></div>
                    <img 
                      src="/path/to/team-photo.jpg" 
                      alt="DreamForge Team" 
                      className="rounded-lg shadow-xl w-full h-auto object-cover"
                      style={{ minHeight: '300px', backgroundColor: '#e2e8f0' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-dreamforge-dark dark:text-white text-center">
                Our Mission & Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 border-t-4 border-dreamforge-blue">
                  <h3 className="font-bold text-xl mb-3 text-dreamforge-dark dark:text-white">Student-First Approach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We believe every student has unique talents and interests. Our recommendations are always personalized to the individual, never generic.
                  </p>
                </Card>
                
                <Card className="p-6 border-t-4 border-dreamforge-cyan">
                  <h3 className="font-bold text-xl mb-3 text-dreamforge-dark dark:text-white">Evidence-Based Guidance</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our career recommendations are based on scientifically validated assessments, academic research, and current industry trends.
                  </p>
                </Card>
                
                <Card className="p-6 border-t-4 border-dreamforge-dark">
                  <h3 className="font-bold text-xl mb-3 text-dreamforge-dark dark:text-white">Accessibility</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're committed to making quality career guidance accessible to students from all backgrounds across India.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-dreamforge-dark dark:text-white text-center">
                Meet Our Expert Team
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=7FC7D9&color=fff&size=200`;
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 text-dreamforge-dark dark:text-white">{member.name}</h3>
                      <p className="text-sm text-dreamforge-blue mb-3">{member.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">{member.bio}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-dreamforge-blue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-white/80 mb-8">
                Have questions about our services or want to schedule a personal counseling session? Contact our team today.
              </p>
              <Button className="bg-white hover:bg-gray-100 text-dreamforge-blue">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
