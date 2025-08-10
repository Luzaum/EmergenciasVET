
import React, { useState } from 'react';
import { GUIDES_CONTENT } from '../constants';
import { GuideContent, GuideSection } from '../types';
import Tooltip from './Tooltip';
import QuestionMarkIcon from './icons/QuestionMarkIcon';

const Accordion: React.FC<{
  item: GuideContent;
  renderContent: (text: string, tooltips?: { term: string; explanation: string }[]) => React.ReactNode;
}> = ({ item, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-slate-50"
      >
        <h3 className="font-semibold text-slate-700">{item.title}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50/70 text-slate-600 animate-fade-in-down">
          {renderContent(item.content, item.tooltips)}
          {item.subsections && item.subsections.map((sub, index) => (
            <div key={index} className="mt-3 pl-4 border-l-2 border-red-200">
                <h4 className="font-bold text-slate-700">{sub.title}</h4>
                 <p className="mt-1">{renderContent(sub.content, sub.tooltips)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Guides: React.FC = () => {
    const renderContentWithTooltips = (text: string, tooltips?: { term: string; explanation: string }[]) => {
        if (!tooltips) return <p>{text}</p>;

        const parts = text.split(new RegExp(`(${tooltips.map(t => t.term).join('|')})`, 'g'));

        return (
            <p>
                {parts.map((part, index) => {
                    const tooltip = tooltips.find(t => t.term === part);
                    return tooltip ? (
                        <span key={index} className="inline-flex items-center">
                            <span className="font-bold text-red-600">{part}</span>
                            <Tooltip explanation={tooltip.explanation}>
                                <span className="ml-1 text-red-500 hover:text-red-700">
                                    <QuestionMarkIcon className="w-4 h-4" />
                                </span>
                            </Tooltip>
                        </span>
                    ) : (
                        part
                    );
                })}
            </p>
        );
    };


  return (
    <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Guias de Estudo</h1>
        <p className="text-slate-500 mb-6">Aprofunde seu conhecimento nos "porquês" da medicina de emergência.</p>
      
        <div className="space-y-4">
            {GUIDES_CONTENT.map((section: GuideSection) => (
                <div key={section.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-red-100">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">{section.title}</h2>
                    {section.data.map((item, index) => (
                        <Accordion key={index} item={item} renderContent={renderContentWithTooltips} />
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};

export default Guides;
