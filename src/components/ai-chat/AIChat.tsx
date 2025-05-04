
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Suggested questions for the chatbot
const suggestedQuestions = [
  "Which engineering branch has the best job prospects?",
  "How to prepare for medical entrance exams?",
  "What are the best commerce courses after 12th?",
  "Which colleges offer good fine arts programs?",
  "Should I pursue higher studies abroad?",
  "What are the emerging career options in India?",
  "How to get scholarships for my college education?",
  "What skills should I develop for future job market?"
];

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Sample bot responses
const botResponses: { [key: string]: string } = {
  "Which engineering branch has the best job prospects?": 
    "Currently, Computer Science, Data Science, and AI-related engineering branches have excellent job prospects in India and globally. However, opportunities also exist in Mechanical, Electrical, and Civil engineering with good specializations. Choose based on your interests and aptitude alongside market trends.",
  
  "How to prepare for medical entrance exams?": 
    "For NEET preparation: 1) Understand the syllabus thoroughly, 2) Create a structured study plan with equal focus on Physics, Chemistry and Biology, 3) Use quality study materials and NCERTs, 4) Practice previous years' papers and take regular mock tests, 5) Join a good coaching if needed, and 6) Maintain proper health with adequate sleep and breaks.",
  
  "What are the best commerce courses after 12th?": 
    "Popular commerce courses after 12th include: BCom, BBA, Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), Bachelor's in Economics, BBS, and various banking and finance related diplomas. The 'best' depends on your career goals and interests.",
  
  "Which colleges offer good fine arts programs?": 
    "Some of India's top institutions for fine arts include: National Institute of Design (NID), Sir J.J. School of Art (Mumbai), Faculty of Fine Arts, MS University (Baroda), Kala Bhavana (Shantiniketan), College of Art (Delhi), and Government College of Fine Arts (Chennai). Each has unique strengths in different art disciplines.",
  
  "Should I pursue higher studies abroad?": 
    "Studying abroad offers advantages like global exposure, quality education, and diverse opportunities. However, it involves significant financial investment and cultural adjustment. Consider your career goals, financial situation, and whether international experience is valued in your field. Research scholarships and part-time work options to manage costs.",
  
  "What are the emerging career options in India?": 
    "Emerging careers in India include: Data Science, Artificial Intelligence, Machine Learning, Blockchain Development, Digital Marketing, UI/UX Design, Cybersecurity, Renewable Energy Engineering, Healthcare Informatics, Content Creation, and E-commerce Management. These fields are growing rapidly and offer good compensation with the right skills.",
  
  "How to get scholarships for my college education?": 
    "For scholarships: 1) Research government schemes (Central/State), 2) Check institution-specific financial aid, 3) Look for private foundation scholarships, 4) Explore merit-based and need-based options, 5) Prepare early with strong academics and extracurriculars, 6) Maintain organized documentation, and 7) Apply to multiple opportunities with well-written applications.",
  
  "What skills should I develop for future job market?": 
    "Key skills for future employability include: 1) Digital literacy and basic coding, 2) Data analysis, 3) Critical thinking and problem-solving, 4) Creativity and innovation, 5) Emotional intelligence and communication, 6) Adaptability and continuous learning, 7) Collaboration across disciplines, and 8) Domain-specific technical skills in your chosen field."
};

// Default greeting message
const defaultBotMessage: Message = {
  id: '1',
  content: "Hello! I'm the DreamForge AI Career Counselor. How can I help you with your career questions today? You can select one of the suggested questions below or ask your own question.",
  sender: 'bot',
  timestamp: new Date()
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([defaultBotMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsSending(true);

    // Simulate bot response
    setTimeout(() => {
      // Find exact or closest match from predefined answers
      let botReply = "I'm sorry, I don't have specific information on that topic yet. Please try asking another question or rephrase your query.";
      
      // Check for exact match in our responses
      if (botResponses[userMessage.content]) {
        botReply = botResponses[userMessage.content];
      } else {
        // Try to find a partial match
        for (const question in botResponses) {
          if (question.toLowerCase().includes(userMessage.content.toLowerCase()) || 
              userMessage.content.toLowerCase().includes(question.toLowerCase())) {
            botReply = botResponses[question];
            break;
          }
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    handleSuggestedQuestion(question);
  };

  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponses[question] || "I'm still learning about this topic. Let me connect you with our expert counselors for more detailed guidance.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg z-50 bg-dreamforge-blue hover:bg-dreamforge-dark transition-colors duration-300 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Career Counselor"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      <div className={cn(
        "fixed bottom-6 left-6 w-[350px] sm:w-[400px] z-50 transition-all duration-300 transform",
        isOpen 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <Card className="shadow-xl border border-dreamforge-blue/20 overflow-hidden flex flex-col h-[550px]">
          {/* Chat header */}
          <div className="bg-dreamforge-blue text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h3 className="font-bold">AI Career Counselor</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-dreamforge-dark/20" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "mb-4",
                  msg.sender === 'user' ? "flex justify-end" : "flex justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  msg.sender === 'user' 
                    ? "bg-dreamforge-blue text-white rounded-tr-none" 
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none"
                )}>
                  <div className="flex items-start mb-1">
                    {msg.sender === 'bot' ? (
                      <Bot className="h-4 w-4 mr-2 mt-1" />
                    ) : (
                      <User className="h-4 w-4 mr-2 mt-1" />
                    )}
                    <p>{msg.content}</p>
                  </div>
                  <div className="text-xs text-right opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start mb-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div className="bg-white dark:bg-gray-800 p-2 overflow-x-auto flex gap-2">
            {suggestedQuestions.slice(0, 4).map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="text-xs whitespace-nowrap border-dreamforge-blue/30 text-dreamforge-blue hover:bg-dreamforge-blue/10"
                onClick={() => handleQuestionClick(question)}
              >
                {question.length > 25 ? question.substring(0, 25) + '...' : question}
              </Button>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Textarea
                className="resize-none min-h-[40px] max-h-[120px]"
                placeholder="Type your question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-dreamforge-blue hover:bg-dreamforge-dark h-10 w-10"
                disabled={!inputMessage.trim() || isSending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AIChat;
