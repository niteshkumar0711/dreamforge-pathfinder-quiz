
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, BookOpen, Share2, Download, ArrowRight, ExternalLink } from 'lucide-react';

interface QuizResult {
  stream: string;
  scienceType?: string;
  recommendations: string[];
  answers: string[];
  questions: { id: number; text: string; options: string[] }[];
}

const careerDescriptions: Record<string, { description: string; skills: string[]; colleges: string[] }> = {
  "MBBS": {
    description: "A medical degree that prepares you to become a doctor with comprehensive knowledge of diagnosis, treatment and prevention of diseases.",
    skills: ["Clinical reasoning", "Patient care", "Medical knowledge", "Communication", "Ethics"],
    colleges: ["AIIMS Delhi", "Christian Medical College, Vellore", "JIPMER", "Maulana Azad Medical College", "Seth GS Medical College"]
  },
  "BDS": {
    description: "A dental degree that focuses on oral health, diagnosis and treatment of dental and oral diseases.",
    skills: ["Manual dexterity", "Clinical skills", "Patient management", "Diagnosis", "Treatment planning"],
    colleges: ["Maulana Azad Institute of Dental Sciences", "Manipal College of Dental Sciences", "Government Dental College, Mumbai", "SRM Dental College"]
  },
  "Pharmacy": {
    description: "Study of medicines and drugs, their properties, development, and safe and effective use.",
    skills: ["Chemical analysis", "Formulation development", "Patient counseling", "Drug knowledge", "Quality control"],
    colleges: ["NIPER Mohali", "Jamia Hamdard", "Bombay College of Pharmacy", "Manipal College of Pharmaceutical Sciences"]
  },
  "Veterinary Science": {
    description: "Study of health and diseases of animals, including diagnosis, treatment and prevention of animal diseases.",
    skills: ["Animal handling", "Diagnostic skills", "Surgical skills", "Communication", "Preventive care"],
    colleges: ["IVRI Bareilly", "Bombay Veterinary College", "Madras Veterinary College", "College of Veterinary Science, Punjab"]
  },
  "Biomedical Engineering": {
    description: "Application of engineering principles to medicine and biology for healthcare purposes such as diagnostic or therapeutic.",
    skills: ["Technical design", "Programming", "Problem-solving", "Medical knowledge", "Data analysis"],
    colleges: ["IIT Bombay", "IIT Delhi", "VIT Vellore", "Manipal Institute of Technology"]
  },
  "Computer Science": {
    description: "Study of computers and computational systems, including software development, algorithms, and data structures.",
    skills: ["Programming", "Problem-solving", "Analytical thinking", "Technical design", "Mathematics"],
    colleges: ["IIT Bombay", "IIT Delhi", "BITS Pilani", "NIT Trichy", "IIIT Hyderabad"]
  },
  "Data Science": {
    description: "Interdisciplinary field that uses scientific methods to extract knowledge from data and apply insights from data analysis.",
    skills: ["Programming", "Statistics", "Machine learning", "Data visualization", "Problem-solving"],
    colleges: ["IIT Madras", "IIT Hyderabad", "IISc Bangalore", "ISI Kolkata", "BITS Pilani"]
  },
  "AI/ML": {
    description: "Development of algorithms and systems enabling computers to perform tasks that normally require human intelligence.",
    skills: ["Programming", "Mathematics", "Statistics", "Algorithmic thinking", "Problem-solving"],
    colleges: ["IIT Bombay", "IIT Delhi", "IIIT Hyderabad", "IISc Bangalore", "BITS Pilani"]
  },
  "Electrical Engineering": {
    description: "Study of electricity, electronics, and electromagnetism, including power systems, control systems, and telecommunications.",
    skills: ["Circuit design", "Technical problem-solving", "Mathematics", "Programming", "Analytical thinking"],
    colleges: ["IIT Bombay", "IIT Delhi", "IIT Kanpur", "NIT Trichy", "BITS Pilani"]
  },
  "Mechanical Engineering": {
    description: "Study of physical machines, forces, and thermal systems, involving design, manufacturing, and maintenance.",
    skills: ["Technical design", "Problem-solving", "CAD/CAM", "Thermal systems", "Material science"],
    colleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani", "NIT Trichy"]
  },
  "Chartered Accountancy": {
    description: "Professional accounting qualification focused on financial reporting, taxation, auditing, and business finance.",
    skills: ["Financial analysis", "Taxation knowledge", "Auditing", "Regulatory compliance", "Business acumen"],
    colleges: ["ICAI", "Symbiosis College of Commerce", "Christ University", "Narsee Monjee College"]
  },
  "MBA Finance": {
    description: "Advanced business degree with specialization in financial management, investment, banking, and financial markets.",
    skills: ["Financial analysis", "Investment management", "Risk assessment", "Strategic thinking", "Business communication"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "XLRI Jamshedpur", "FMS Delhi", "ISB Hyderabad"]
  },
  "Investment Banking": {
    description: "Career focused on raising capital for businesses, facilitating mergers and acquisitions, and financial advisory.",
    skills: ["Financial modeling", "Valuation", "Deal structuring", "Negotiation", "Market analysis"],
    colleges: ["IIM Ahmedabad", "IIM Calcutta", "SRCC Delhi", "St. Xavier's College", "Shri Ram College of Commerce"]
  },
  "Literature": {
    description: "Study of written works, including poetry, prose, drama, and literary criticism and theory.",
    skills: ["Critical analysis", "Research", "Writing", "Communication", "Cultural awareness"],
    colleges: ["St. Stephen's College", "Lady Shri Ram College", "Presidency College", "Jadavpur University", "Loyola College"]
  },
  "Fine Arts": {
    description: "Study and practice of visual arts, including painting, sculpture, photography, and other creative expressions.",
    skills: ["Creative thinking", "Technical skills", "Aesthetics", "Self-expression", "Art history knowledge"],
    colleges: ["JJ School of Art", "Faculty of Fine Arts, MSU Baroda", "Kala Bhavan, Santiniketan", "College of Art, Delhi"]
  },
  "Journalism": {
    description: "Study and practice of gathering, processing, and dissemination of news and information through various media.",
    skills: ["Writing", "Research", "Communication", "Media literacy", "Critical thinking"],
    colleges: ["IIMC Delhi", "ACJ Chennai", "Symbiosis Institute of Media and Communication", "Xavier Institute of Communications"]
  },
  "Psychology": {
    description: "Scientific study of mind and behavior, including cognitive processes, emotions, and social interactions.",
    skills: ["Research", "Analysis", "Empathy", "Communication", "Ethics"],
    colleges: ["Lady Shri Ram College", "Christ University", "Fergusson College", "Delhi University", "Presidency College"]
  },
  "Sociology": {
    description: "Study of social behavior, social structures, patterns of social relationships, social interaction, and culture.",
    skills: ["Research", "Analysis", "Critical thinking", "Communication", "Cultural awareness"],
    colleges: ["JNU", "Delhi School of Economics", "Loyola College", "Christ University", "TISS"]
  },
};

const QuizResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve results from session storage
    const storedResults = sessionStorage.getItem('quizResults');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, redirect to quiz page
      navigate('/quiz');
    }
    
    setLoading(false);
  }, [navigate]);

  // Function to get career path description
  const getCareerInfo = (career: string) => {
    return careerDescriptions[career] || {
      description: "A promising career path based on your interests and aptitude.",
      skills: ["Critical thinking", "Problem-solving", "Communication"],
      colleges: ["Various prestigious institutions across India"]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dreamforge-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-dreamforge-blue">Loading your career recommendations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-dreamforge-dark dark:text-white">No Quiz Results Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please take the career quiz to get personalized recommendations.</p>
            <Button 
              className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white"
              onClick={() => navigate('/quiz')}
            >
              Take Career Quiz
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="bg-dreamforge-blue text-white p-6 md:p-8 rounded-t-lg">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Your Career Recommendations
              </h1>
              <p className="text-center text-white/80">
                Based on your {results.stream}{results.scienceType ? ` (${results.scienceType})` : ''} background and responses to our assessment
              </p>
            </div>
            
            {/* Recommendations Section */}
            <Card className="p-6 md:p-8 shadow-lg rounded-b-lg">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dreamforge-dark dark:text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-dreamforge-blue" />
                  Recommended Career Paths
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  These career paths align well with your interests, aptitude, and educational background:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.recommendations.slice(0, 5).map((career, index) => (
                    <Card key={index} className="border-l-4 border-dreamforge-blue p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-lg mb-2 text-dreamforge-dark dark:text-white">{career}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {getCareerInfo(career).description}
                      </p>
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Key Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getCareerInfo(career).skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs bg-dreamforge-light dark:bg-dreamforge-blue/20 text-dreamforge-blue px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Top Colleges Section */}
              <div className="mt-10 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dreamforge-dark dark:text-white">
                  Top Colleges for Your Primary Recommendation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Here are some of the best institutions in India for {results.recommendations[0]}:
                </p>
                
                <ul className="space-y-2">
                  {getCareerInfo(results.recommendations[0]).colleges.map((college, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-dreamforge-blue shrink-0 mt-0.5 mr-2" />
                      <span>{college}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="border-dreamforge-blue text-dreamforge-blue hover:bg-dreamforge-blue hover:text-white"
                    onClick={() => navigate('/colleges')}
                  >
                    Explore More Colleges <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Actions Section */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button
                  className="flex-1 bg-dreamforge-blue hover:bg-dreamforge-dark text-white flex items-center justify-center"
                  onClick={() => window.print()}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-dreamforge-blue text-dreamforge-blue hover:bg-dreamforge-blue hover:text-white flex items-center justify-center"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'My DreamForge Career Recommendations',
                        text: `Based on my assessment, DreamForge recommends these career paths: ${results.recommendations.join(', ')}`,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Want to explore more options or have specific questions?
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                  <Button
                    className="bg-dreamforge-blue hover:bg-dreamforge-dark text-white"
                    onClick={() => {
                      const chatButton = document.querySelector('.fixed.bottom-6.left-6.rounded-full') as HTMLButtonElement;
                      if (chatButton) chatButton.click();
                    }}
                  >
                    Chat with AI Counselor
                  </Button>
                  <Button
                    variant="outline"
                    className="border-dreamforge-blue text-dreamforge-blue hover:bg-dreamforge-blue hover:text-white"
                    onClick={() => navigate('/quiz')}
                  >
                    Take Quiz Again
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuizResults;
