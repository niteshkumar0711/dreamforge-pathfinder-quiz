
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, MapPin, ExternalLink } from 'lucide-react';

interface College {
  id: number;
  name: string;
  location: string;
  category: string;
  courses: string[];
  fees: string;
  rating: number;
  website: string;
  image?: string;
}

const Colleges = () => {
  // List of colleges
  const allColleges: College[] = [
    {
      id: 1,
      name: "Indian Institute of Technology (IIT) Bombay",
      location: "Mumbai, Maharashtra",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹2.2 Lakhs/year",
      rating: 4.9,
      website: "https://www.iitb.ac.in/"
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences (AIIMS)",
      location: "New Delhi, Delhi",
      category: "Medical",
      courses: ["MBBS", "MD", "MS", "PhD"],
      fees: "₹1.5 Lakhs/year",
      rating: 4.9,
      website: "https://www.aiims.edu/"
    },
    {
      id: 3,
      name: "Indian Institute of Management (IIM) Ahmedabad",
      location: "Ahmedabad, Gujarat",
      category: "Business",
      courses: ["MBA", "PGDM", "PhD"],
      fees: "₹23 Lakhs (total)",
      rating: 4.8,
      website: "https://www.iima.ac.in/"
    },
    {
      id: 4,
      name: "St. Stephen's College",
      location: "Delhi, Delhi",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "MA"],
      fees: "₹30,000/year",
      rating: 4.7,
      website: "https://www.ststephens.edu/"
    },
    {
      id: 5,
      name: "National Institute of Design (NID)",
      location: "Ahmedabad, Gujarat",
      category: "Design",
      courses: ["BDes", "MDes"],
      fees: "₹3.8 Lakhs/year",
      rating: 4.7,
      website: "https://www.nid.edu/"
    },
    {
      id: 6,
      name: "National Law School of India University (NLSIU)",
      location: "Bangalore, Karnataka",
      category: "Law",
      courses: ["BA LLB", "LLM"],
      fees: "₹2.3 Lakhs/year",
      rating: 4.8,
      website: "https://www.nls.ac.in/"
    },
    {
      id: 7,
      name: "Indian Institute of Science (IISc)",
      location: "Bangalore, Karnataka",
      category: "Science",
      courses: ["BS", "MS", "PhD"],
      fees: "₹85,000/year",
      rating: 4.9,
      website: "https://www.iisc.ac.in/"
    },
    {
      id: 8,
      name: "Shri Ram College of Commerce (SRCC)",
      location: "Delhi, Delhi",
      category: "Commerce",
      courses: ["BCom", "MCom"],
      fees: "₹40,000/year",
      rating: 4.7,
      website: "https://www.srcc.edu/"
    },
    {
      id: 9,
      name: "Lady Shri Ram College for Women (LSR)",
      location: "Delhi, Delhi",
      category: "Arts & Humanities",
      courses: ["BA", "MA"],
      fees: "₹35,000/year",
      rating: 4.7,
      website: "https://www.lsr.edu.in/"
    },
    {
      id: 10,
      name: "Indian Institute of Technology (IIT) Delhi",
      location: "New Delhi, Delhi",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹2.2 Lakhs/year",
      rating: 4.8,
      website: "https://www.iitd.ac.in/"
    },
    {
      id: 11,
      name: "Christian Medical College (CMC)",
      location: "Vellore, Tamil Nadu",
      category: "Medical",
      courses: ["MBBS", "MD", "MS"],
      fees: "₹75,000/year",
      rating: 4.7,
      website: "https://www.cmch-vellore.edu/"
    },
    {
      id: 12,
      name: "Faculty of Fine Arts, MSU Baroda",
      location: "Vadodara, Gujarat",
      category: "Arts & Humanities",
      courses: ["BFA", "MFA"],
      fees: "₹25,000/year",
      rating: 4.6,
      website: "https://www.msubaroda.ac.in/"
    },
    {
      id: 13,
      name: "Xavier Labour Relations Institute (XLRI)",
      location: "Jamshedpur, Jharkhand",
      category: "Business",
      courses: ["MBA", "PGDM", "PhD"],
      fees: "₹25 Lakhs (total)",
      rating: 4.7,
      website: "https://www.xlri.ac.in/"
    },
    {
      id: 14,
      name: "National Institute of Fashion Technology (NIFT)",
      location: "Delhi, Delhi",
      category: "Design",
      courses: ["BDes", "MDes"],
      fees: "₹2.5 Lakhs/year",
      rating: 4.6,
      website: "https://www.nift.ac.in/"
    },
    {
      id: 15,
      name: "Film and Television Institute of India (FTII)",
      location: "Pune, Maharashtra",
      category: "Media & Communication",
      courses: ["Acting", "Direction", "Cinematography"],
      fees: "₹1.2 Lakhs/year",
      rating: 4.6,
      website: "https://www.ftiindia.gov.in/"
    },
    {
      id: 16,
      name: "Jawaharlal Nehru University (JNU)",
      location: "New Delhi, Delhi",
      category: "Arts & Humanities",
      courses: ["BA", "MA", "MPhil", "PhD"],
      fees: "₹45,000/year",
      rating: 4.7,
      website: "https://www.jnu.ac.in/"
    },
    {
      id: 17,
      name: "Indian Institute of Technology (IIT) Madras",
      location: "Chennai, Tamil Nadu",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹2.2 Lakhs/year",
      rating: 4.8,
      website: "https://www.iitm.ac.in/"
    },
    {
      id: 18,
      name: "National Institute of Mental Health and Neuro Sciences (NIMHANS)",
      location: "Bangalore, Karnataka",
      category: "Medical",
      courses: ["MD", "MSc", "PhD"],
      fees: "₹1.1 Lakhs/year",
      rating: 4.8,
      website: "https://www.nimhans.ac.in/"
    },
    {
      id: 19,
      name: "NALSAR University of Law",
      location: "Hyderabad, Telangana",
      category: "Law",
      courses: ["BA LLB", "LLM"],
      fees: "₹2.1 Lakhs/year",
      rating: 4.7,
      website: "https://www.nalsar.ac.in/"
    },
    {
      id: 20,
      name: "Indian Institute of Management (IIM) Bangalore",
      location: "Bangalore, Karnataka",
      category: "Business",
      courses: ["MBA", "PGDM", "PhD"],
      fees: "₹23 Lakhs (total)",
      rating: 4.8,
      website: "https://www.iimb.ac.in/"
    },
    {
      id: 21,
      name: "Hindu College",
      location: "Delhi, Delhi",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "MA", "MSc"],
      fees: "₹35,000/year",
      rating: 4.6,
      website: "https://www.hinducollege.ac.in/"
    },
    {
      id: 22,
      name: "Loyola College",
      location: "Chennai, Tamil Nadu",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "BCom", "MA", "MSc", "MCom"],
      fees: "₹40,000/year",
      rating: 4.5,
      website: "https://www.loyolacollege.edu/"
    },
    {
      id: 23,
      name: "Indian Institute of Technology (IIT) Kanpur",
      location: "Kanpur, Uttar Pradesh",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹2.2 Lakhs/year",
      rating: 4.8,
      website: "https://www.iitk.ac.in/"
    },
    {
      id: 24,
      name: "Faculty of Management Studies (FMS)",
      location: "Delhi, Delhi",
      category: "Business",
      courses: ["MBA", "PhD"],
      fees: "₹40,000/year",
      rating: 4.7,
      website: "https://www.fms.edu/"
    },
    {
      id: 25,
      name: "Birla Institute of Technology and Science (BITS) Pilani",
      location: "Pilani, Rajasthan",
      category: "Engineering",
      courses: ["BE", "ME", "PhD"],
      fees: "₹4.9 Lakhs/year",
      rating: 4.6,
      website: "https://www.bits-pilani.ac.in/"
    },
    {
      id: 26,
      name: "National Institute of Technology (NIT) Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹1.9 Lakhs/year",
      rating: 4.5,
      website: "https://www.nitt.edu/"
    },
    {
      id: 27,
      name: "Tata Institute of Social Sciences (TISS)",
      location: "Mumbai, Maharashtra",
      category: "Social Sciences",
      courses: ["BA", "MA", "PhD"],
      fees: "₹55,000/year",
      rating: 4.6,
      website: "https://www.tiss.edu/"
    },
    {
      id: 28,
      name: "Indian Statistical Institute (ISI)",
      location: "Kolkata, West Bengal",
      category: "Science",
      courses: ["BStat", "MStat", "PhD"],
      fees: "₹40,000/year",
      rating: 4.7,
      website: "https://www.isical.ac.in/"
    },
    {
      id: 29,
      name: "Presidency College",
      location: "Kolkata, West Bengal",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "MA", "MSc"],
      fees: "₹20,000/year",
      rating: 4.5,
      website: "https://www.presiuniv.ac.in/"
    },
    {
      id: 30,
      name: "Christ University",
      location: "Bangalore, Karnataka",
      category: "Multiple Disciplines",
      courses: ["BA", "BSc", "BCom", "BBA", "MA", "MSc", "MBA"],
      fees: "₹1.5 Lakhs/year",
      rating: 4.5,
      website: "https://www.christuniversity.in/"
    },
    {
      id: 31,
      name: "Indian Institute of Technology (IIT) Kharagpur",
      location: "Kharagpur, West Bengal",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹2.2 Lakhs/year",
      rating: 4.7,
      website: "https://www.iitkgp.ac.in/"
    },
    {
      id: 32,
      name: "Symbiosis Institute of Business Management (SIBM)",
      location: "Pune, Maharashtra",
      category: "Business",
      courses: ["MBA", "PGDM"],
      fees: "₹19 Lakhs (total)",
      rating: 4.5,
      website: "https://www.sibm.edu/"
    },
    {
      id: 33,
      name: "Jamia Millia Islamia",
      location: "Delhi, Delhi",
      category: "Multiple Disciplines",
      courses: ["BA", "BSc", "BCom", "MA", "MSc", "MCom"],
      fees: "₹30,000/year",
      rating: 4.4,
      website: "https://www.jmi.ac.in/"
    },
    {
      id: 34,
      name: "Maulana Azad Medical College",
      location: "Delhi, Delhi",
      category: "Medical",
      courses: ["MBBS", "MD", "MS"],
      fees: "₹75,000/year",
      rating: 4.6,
      website: "https://www.mamc.ac.in/"
    },
    {
      id: 35,
      name: "Delhi College of Engineering (DTU)",
      location: "Delhi, Delhi",
      category: "Engineering",
      courses: ["B.Tech", "M.Tech", "PhD"],
      fees: "₹1.6 Lakhs/year",
      rating: 4.5,
      website: "https://www.dtu.ac.in/"
    },
    {
      id: 36,
      name: "Miranda House",
      location: "Delhi, Delhi",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "MA", "MSc"],
      fees: "₹30,000/year",
      rating: 4.6,
      website: "https://www.mirandahouse.ac.in/"
    },
    {
      id: 37,
      name: "Indian Institute of Management (IIM) Calcutta",
      location: "Kolkata, West Bengal",
      category: "Business",
      courses: ["MBA", "PGDM", "PhD"],
      fees: "₹23 Lakhs (total)",
      rating: 4.7,
      website: "https://www.iimcal.ac.in/"
    },
    {
      id: 38,
      name: "Manipal Institute of Technology",
      location: "Manipal, Karnataka",
      category: "Engineering",
      courses: ["BTech", "MTech", "PhD"],
      fees: "₹4.5 Lakhs/year",
      rating: 4.4,
      website: "https://manipal.edu/mit.html"
    },
    {
      id: 39,
      name: "Indian Institute of Foreign Trade (IIFT)",
      location: "Delhi, Delhi",
      category: "Business",
      courses: ["MBA", "PGDM"],
      fees: "₹19 Lakhs (total)",
      rating: 4.5,
      website: "https://www.iift.edu/"
    },
    {
      id: 40,
      name: "SVKM's NMIMS",
      location: "Mumbai, Maharashtra",
      category: "Business",
      courses: ["BBA", "MBA", "PhD"],
      fees: "₹18 Lakhs (total)",
      rating: 4.5,
      website: "https://www.nmims.edu/"
    },
    {
      id: 41,
      name: "Banaras Hindu University (BHU)",
      location: "Varanasi, Uttar Pradesh",
      category: "Multiple Disciplines",
      courses: ["BA", "BSc", "BCom", "BFA", "MA", "MSc", "MCom"],
      fees: "₹40,000/year",
      rating: 4.5,
      website: "https://www.bhu.ac.in/"
    },
    {
      id: 42,
      name: "Indian Veterinary Research Institute (IVRI)",
      location: "Bareilly, Uttar Pradesh",
      category: "Veterinary Science",
      courses: ["BVSc", "MVSc", "PhD"],
      fees: "₹70,000/year",
      rating: 4.6,
      website: "https://www.ivri.nic.in/"
    },
    {
      id: 43,
      name: "Tata Institute of Fundamental Research (TIFR)",
      location: "Mumbai, Maharashtra",
      category: "Science",
      courses: ["MSc", "PhD"],
      fees: "₹50,000/year",
      rating: 4.8,
      website: "https://www.tifr.res.in/"
    },
    {
      id: 44,
      name: "Fergusson College",
      location: "Pune, Maharashtra",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "MA", "MSc"],
      fees: "₹30,000/year",
      rating: 4.4,
      website: "https://www.fergusson.edu/"
    },
    {
      id: 45,
      name: "National Institute of Fashion Technology (NIFT) Mumbai",
      location: "Mumbai, Maharashtra",
      category: "Design",
      courses: ["BDes", "MDes"],
      fees: "₹2.5 Lakhs/year",
      rating: 4.5,
      website: "https://www.nift.ac.in/mumbai/"
    },
    {
      id: 46,
      name: "College of Engineering, Pune (COEP)",
      location: "Pune, Maharashtra",
      category: "Engineering",
      courses: ["BE", "ME", "PhD"],
      fees: "₹1.2 Lakhs/year",
      rating: 4.5,
      website: "https://www.coep.org.in/"
    },
    {
      id: 47,
      name: "Indian Institute of Information Technology (IIIT) Hyderabad",
      location: "Hyderabad, Telangana",
      category: "Engineering",
      courses: ["BTech", "MTech", "PhD"],
      fees: "₹2 Lakhs/year",
      rating: 4.7,
      website: "https://www.iiit.ac.in/"
    },
    {
      id: 48,
      name: "Madras Medical College",
      location: "Chennai, Tamil Nadu",
      category: "Medical",
      courses: ["MBBS", "MD", "MS"],
      fees: "₹65,000/year",
      rating: 4.6,
      website: "https://www.mmc.tn.gov.in/"
    },
    {
      id: 49,
      name: "Indian School of Business (ISB)",
      location: "Hyderabad, Telangana",
      category: "Business",
      courses: ["MBA", "PGPM"],
      fees: "₹36 Lakhs (total)",
      rating: 4.8,
      website: "https://www.isb.edu/"
    },
    {
      id: 50,
      name: "Stella Maris College",
      location: "Chennai, Tamil Nadu",
      category: "Arts & Humanities",
      courses: ["BA", "BSc", "BCom", "MA", "MSc", "MCom"],
      fees: "₹35,000/year",
      rating: 4.4,
      website: "https://stellamariscollege.edu.in/"
    }
  ];
  
  const [colleges, setColleges] = useState<College[]>(allColleges);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 12;
  
  // Filter colleges based on search and category
  useEffect(() => {
    let filtered = allColleges;
    
    if (search) {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(search.toLowerCase()) ||
        college.location.toLowerCase().includes(search.toLowerCase()) ||
        college.courses.some(course => course.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(college => college.category === selectedCategory);
    }
    
    setColleges(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [search, selectedCategory]);
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allColleges.map(college => college.category)))];
  
  // Get current colleges
  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = colleges.slice(indexOfFirstCollege, indexOfLastCollege);
  
  // Calculate total pages
  const totalPages = Math.ceil(colleges.length / collegesPerPage);
  
  // Generate pagination items
  const getPaginationItems = () => {
    let items = [];
    
    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Show current page and neighbors
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  // Generate stars for rating
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {halfStar && (
          <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-dreamforge-blue/10 dark:bg-dreamforge-dark/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dreamforge-dark dark:text-white">
                Explore Top Colleges in India
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Discover the best institutions across various fields to find your perfect academic fit
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for colleges, courses, or locations..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Colleges List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-dreamforge-dark dark:text-white">
                {colleges.length} {colleges.length === 1 ? 'College' : 'Colleges'} Found
              </h2>
            </div>
            
            {colleges.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentColleges.map((college) => (
                    <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                        <img 
                          src={college.image || `https://source.unsplash.com/500x300/?university,college,campus&sig=${college.id}`}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-dreamforge-blue px-2 py-1 rounded text-xs font-medium">
                          {college.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-dreamforge-dark dark:text-white">
                          {college.name}
                        </h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{college.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            {renderRatingStars(college.rating)}
                          </div>
                          <div className="text-dreamforge-blue font-medium text-sm">
                            {college.fees}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            Popular Courses
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {college.courses.slice(0, 3).map((course, i) => (
                              <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                                {course}
                              </span>
                            ))}
                            {college.courses.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 px-1">
                                +{college.courses.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-dreamforge-blue hover:bg-dreamforge-dark"
                          variant="default"
                          size="sm"
                          asChild
                        >
                          <a href={college.website} target="_blank" rel="noopener noreferrer">
                            Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {getPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">
                  No Colleges Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any colleges matching your search criteria.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Colleges;
