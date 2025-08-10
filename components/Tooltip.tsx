
import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  explanation: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ explanation, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
        childRef.current && !childRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex">
      <span ref={childRef} onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full mb-2 w-64 bg-slate-800 text-white text-sm rounded-lg p-3 shadow-lg z-10"
        >
          <p>{explanation}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
