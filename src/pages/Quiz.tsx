
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Stream selection options
type Stream = 'arts' | 'commerce' | 'science';
type ScienceType = 'biology' | 'maths' | '';

// Question interface
interface Question {
  id: number;
  text: string;
  options: string[];
}

// Questions by stream
const artsQuestions: Question[] = [
  {
    id: 1,
    text: "How much do you enjoy analyzing literature and cultural texts?",
    options: ["Not at all", "Somewhat", "Moderately", "Very much", "Extremely passionate about it"]
  },
  {
    id: 2,
    text: "Do you enjoy expressing yourself through creative mediums?",
    options: ["No, not really", "A little bit", "Sometimes", "Often", "It's my favorite way to express myself"]
  },
  {
    id: 3,
    text: "How interested are you in understanding human behavior and society?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
  {
    id: 4,
    text: "Would you consider a career that involves public speaking or performance?",
    options: ["Definitely not", "Probably not", "Maybe", "Likely", "Absolutely yes"]
  },
  {
    id: 5,
    text: "How comfortable are you with writing extensive essays and research papers?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 6,
    text: "How interested are you in studying different languages and linguistics?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 7,
    text: "Do you enjoy studying historical events and their impacts?",
    options: ["Not at all", "A little bit", "Moderately", "Quite a lot", "It's one of my favorite subjects"]
  },
  {
    id: 8,
    text: "How interested are you in pursuing a career in teaching or academia?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "It's my career goal"]
  },
  {
    id: 9,
    text: "How much do you value creative thinking over analytical reasoning?",
    options: ["Strongly prefer analytical", "Slightly prefer analytical", "Value both equally", "Slightly prefer creative", "Strongly prefer creative"]
  },
  {
    id: 10,
    text: "How interested are you in studying philosophy and abstract concepts?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
];

const commerceQuestions: Question[] = [
  {
    id: 1,
    text: "How comfortable are you working with numbers and financial data?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 2,
    text: "How interested are you in understanding business operations and strategies?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 3,
    text: "Do you enjoy analyzing market trends and economic patterns?",
    options: ["Not at all", "A little bit", "Moderately", "Quite a lot", "Very much"]
  },
  {
    id: 4,
    text: "How would you rate your leadership and management skills?",
    options: ["Poor", "Below average", "Average", "Above average", "Excellent"]
  },
  {
    id: 5,
    text: "Are you interested in entrepreneurship and starting your own business?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "It's my primary goal"]
  },
  {
    id: 6,
    text: "How comfortable are you with legal and regulatory frameworks?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 7,
    text: "How interested are you in financial planning and investment strategies?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
  {
    id: 8,
    text: "Do you enjoy solving complex problems using logical reasoning?",
    options: ["Not at all", "A little bit", "Moderately", "Quite a lot", "Very much"]
  },
  {
    id: 9,
    text: "How interested are you in global trade and international business?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 10,
    text: "How comfortable are you with public speaking and client presentations?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
];

const scienceBiologyQuestions: Question[] = [
  {
    id: 1,
    text: "How interested are you in understanding living organisms and their functions?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
  {
    id: 2,
    text: "How comfortable are you with laboratory work and experiments?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 3,
    text: "Are you interested in healthcare and medical fields?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "It's my career goal"]
  },
  {
    id: 4,
    text: "How interested are you in studying genetics and molecular biology?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 5,
    text: "Would you consider a career that involves direct patient care?",
    options: ["Definitely not", "Probably not", "Maybe", "Likely", "Absolutely yes"]
  },
  {
    id: 6,
    text: "How interested are you in environmental science and ecology?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
  {
    id: 7,
    text: "How comfortable are you with memorizing detailed scientific terminology?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 8,
    text: "Are you interested in research and scientific discoveries?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "It's my primary interest"]
  },
  {
    id: 9,
    text: "How comfortable are you with subjects requiring both theoretical knowledge and practical applications?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 10,
    text: "Would you consider pursuing higher education (MD/MS/PhD) in your field?",
    options: ["Definitely not", "Probably not", "Maybe", "Likely", "Absolutely yes"]
  },
];

const scienceMathsQuestions: Question[] = [
  {
    id: 1,
    text: "How comfortable are you with complex mathematical calculations?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 2,
    text: "How interested are you in understanding physical laws and theories?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
  {
    id: 3,
    text: "Do you enjoy solving problems using logical reasoning and algorithms?",
    options: ["Not at all", "A little bit", "Moderately", "Quite a lot", "Very much"]
  },
  {
    id: 4,
    text: "How interested are you in computer programming and technology?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 5,
    text: "Would you consider a career in engineering or technical fields?",
    options: ["Definitely not", "Probably not", "Maybe", "Likely", "Absolutely yes"]
  },
  {
    id: 6,
    text: "How comfortable are you with abstract thinking and theoretical concepts?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"]
  },
  {
    id: 7,
    text: "Are you interested in designing and developing new products or systems?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "It's my primary interest"]
  },
  {
    id: 8,
    text: "How interested are you in data analysis and statistical methods?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: 9,
    text: "Would you enjoy a career that involves continuous learning of new technologies?",
    options: ["Definitely not", "Probably not", "Maybe", "Likely", "Absolutely yes"]
  },
  {
    id: 10,
    text: "How interested are you in research and innovation in technical fields?",
    options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely passionate about it"]
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'stream' | 'scienceType' | 'questions'>('stream');
  const [selectedStream, setSelectedStream] = useState<Stream | ''>('');
  const [selectedScienceType, setSelectedScienceType] = useState<ScienceType>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<string | null>>(Array(10).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the appropriate questions based on the selected stream and science type
  const getQuestions = () => {
    if (selectedStream === 'arts') return artsQuestions;
    if (selectedStream === 'commerce') return commerceQuestions;
    if (selectedStream === 'science') {
      return selectedScienceType === 'biology' ? scienceBiologyQuestions : scienceMathsQuestions;
    }
    return [];
  };

  const questions = getQuestions();

  // Handle stream selection
  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    if (stream === 'science') {
      setStep('scienceType');
    } else {
      setStep('questions');
    }
  };

  // Handle science type selection
  const handleScienceTypeSelect = (type: ScienceType) => {
    setSelectedScienceType(type);
    setStep('questions');
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (selectedStream === 'science') {
      setStep('scienceType');
    } else {
      setStep('stream');
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Calculate results based on answers
    const calculateResults = () => {
      // This is a simplified scoring system
      // In a real app, you would have more sophisticated logic
      
      const scoreMap: Record<string, number> = {};
      
      // Count the frequency of each answer option
      answers.forEach((answer, index) => {
        if (answer) {
          const optionIndex = questions[index].options.indexOf(answer);
          // Weight answers based on their position (higher index = stronger preference)
          scoreMap[answer] = (scoreMap[answer] || 0) + optionIndex;
        }
      });
      
      // Determine career recommendations based on stream and scores
      let recommendations: string[] = [];
      
      if (selectedStream === 'arts') {
        if (scoreMap["Extremely passionate about it"] > 2 || scoreMap["Very interested"] > 3) {
          recommendations = ["Literature", "Fine Arts", "Journalism", "Psychology", "Sociology"];
        } else if (scoreMap["It's my favorite way to express myself"] > 1) {
          recommendations = ["Mass Communication", "Design", "Theater", "Film Studies"];
        } else {
          recommendations = ["Education", "Social Work", "Public Administration", "History", "Philosophy"];
        }
      } 
      else if (selectedStream === 'commerce') {
        if (scoreMap["Very comfortable"] > 2 || scoreMap["Excellent"] > 1) {
          recommendations = ["Chartered Accountancy", "MBA Finance", "Investment Banking", "Actuarial Science"];
        } else if (scoreMap["It's my primary goal"] > 0 || scoreMap["Very interested"] > 3) {
          recommendations = ["BBA", "Entrepreneurship", "Marketing Management", "International Business"];
        } else {
          recommendations = ["BCom", "Banking Services", "Human Resource Management", "Retail Management"];
        }
      }
      else if (selectedStream === 'science') {
        if (selectedScienceType === 'biology') {
          if (scoreMap["Extremely passionate about it"] > 2 || scoreMap["It's my career goal"] > 0) {
            recommendations = ["MBBS", "BDS", "Pharmacy", "Veterinary Science", "Biomedical Engineering"];
          } else if (scoreMap["Very interested"] > 3) {
            recommendations = ["BSc Biology", "Biotechnology", "Microbiology", "Genetics", "Agricultural Science"];
          } else {
            recommendations = ["Nursing", "Physiotherapy", "Nutrition and Dietetics", "Environmental Science"];
          }
        } else { // maths
          if (scoreMap["Very comfortable"] > 2 || scoreMap["Extremely interested"] > 1) {
            recommendations = ["Computer Science", "Data Science", "AI/ML", "Electrical Engineering", "Mechanical Engineering"];
          } else if (scoreMap["Very interested"] > 3) {
            recommendations = ["Civil Engineering", "Chemical Engineering", "Mathematics", "Statistics", "Physics"];
          } else {
            recommendations = ["IT", "Architecture", "Aerospace Engineering", "Automation", "Robotics"];
          }
        }
      }
      
      return {
        stream: selectedStream,
        scienceType: selectedScienceType,
        recommendations: recommendations,
        answers: answers,
        questions: questions,
      };
    };

    // Store results in session storage
    const results = calculateResults();
    sessionStorage.setItem('quizResults', JSON.stringify(results));

    // Navigate to results page after a short delay
    setTimeout(() => {
      navigate('/quiz-results');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {step === 'stream' && (
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-dreamforge-dark dark:text-white">
                Select Your Educational Stream
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-10">
                Choose the stream you studied in your high school (10+2) to get personalized career recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedStream === 'arts' ? 'ring-2 ring-dreamforge-blue' : ''}`}
                  onClick={() => handleStreamSelect('arts')}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-dreamforge-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">Arts / Humanities</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Subjects like History, Political Science, Economics, Languages, etc.
                    </p>
                  </div>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedStream === 'commerce' ? 'ring-2 ring-dreamforge-blue' : ''}`}
                  onClick={() => handleStreamSelect('commerce')}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-dreamforge-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">Commerce</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Subjects like Accountancy, Business Studies, Economics, etc.
                    </p>
                  </div>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedStream === 'science' ? 'ring-2 ring-dreamforge-blue' : ''}`}
                  onClick={() => handleStreamSelect('science')}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-dreamforge-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">Science</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Subjects like Physics, Chemistry, Mathematics, Biology, etc.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {step === 'scienceType' && (
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-dreamforge-dark dark:text-white">
                Select Your Science Specialization
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-10">
                Tell us which subjects you focused on in your science stream.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedScienceType === 'biology' ? 'ring-2 ring-dreamforge-blue' : ''}`}
                  onClick={() => handleScienceTypeSelect('biology')}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-dreamforge-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">PCB - Biology</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Physics, Chemistry, Biology (Medical stream)
                    </p>
                  </div>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedScienceType === 'maths' ? 'ring-2 ring-dreamforge-blue' : ''}`}
                  onClick={() => handleScienceTypeSelect('maths')}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-dreamforge-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dreamforge-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-dreamforge-dark dark:text-white">PCM - Mathematics</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Physics, Chemistry, Mathematics (Non-Medical stream)
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setStep('stream')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stream Selection
                </Button>
              </div>
            </div>
          )}
          
          {step === 'questions' && questions.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Question {currentQuestion + 1} of {questions.length}</h2>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-dreamforge-blue h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-dreamforge-blue">{selectedStream.charAt(0).toUpperCase() + selectedStream.slice(1)}</span>
                  {selectedStream === 'science' && (
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      ({selectedScienceType.charAt(0).toUpperCase() + selectedScienceType.slice(1)})
                    </span>
                  )}
                </div>
              </div>

              <Card className="mb-8">
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-6 text-dreamforge-dark dark:text-white">
                    {questions[currentQuestion].text}
                  </h3>
                  
                  <RadioGroup 
                    value={answers[currentQuestion] || ""}
                    onValueChange={(value) => handleAnswerSelect(value)}
                    className="space-y-4"
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Card>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                
                <Button
                  className="bg-dreamforge-blue hover:bg-dreamforge-dark flex items-center"
                  onClick={handleNext}
                  disabled={!answers[currentQuestion] || isSubmitting}
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      {isSubmitting ? 'Processing...' : 'Submit'}
                      {isSubmitting ? (
                        <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      ) : (
                        <CheckCircle className="ml-2 h-4 w-4" />
                      )}
                    </>
                  ) : (
                    <>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Quiz;
