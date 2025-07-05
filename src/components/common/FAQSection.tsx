
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StructuredData from '../seo/StructuredData';

interface FAQLink {
  text: string;
  href: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  links?: FAQLink[];
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

const FAQSection = ({ 
  title = "Frequently Asked Questions", 
  subtitle, 
  faqs, 
  className = "" 
}: FAQSectionProps) => {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <StructuredData 
        type="FAQ" 
        faqs={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))} 
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6">
                {faq.links && faq.links.length > 0 ? (
                  <p>
                    {faq.answer.split(/(register with us|job listings|housing options)/).map((part, index) => {
                      const linkMatch = faq.links?.find(link => link.text === part);
                      if (linkMatch) {
                        return (
                          <Link 
                            key={index}
                            to={linkMatch.href} 
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            {part}
                          </Link>
                        );
                      }
                      return part;
                    })}
                  </p>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
