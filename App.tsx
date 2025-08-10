import React, { useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import CprCoach from './components/CprCoach';
import DrugFormulary from './components/DrugFormulary';
import Guides from './components/Guides';
import Algorithms from './components/Algorithms';

type View = 'coach' | 'drugs' | 'algorithms' | 'guides';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('coach');

    // === CPR Coach State and Logic ===
    const [cycleCount, setCycleCount] = useState(0);
    const [isPausePhase, setIsPausePhase] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(120);
    const [isMetronomeOn, setIsMetronomeOn] = useState(true);

    const metronomeAudioRef = useRef<HTMLAudioElement | null>(null);
    const metronomeIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        metronomeAudioRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(300).join('123'));
    }, []);

    const playMetronomeSound = useCallback(() => {
        if (metronomeAudioRef.current) {
            metronomeAudioRef.current.currentTime = 0;
            metronomeAudioRef.current.play().catch(e => console.error("Error playing metronome sound:", e));
        }
    }, []);
    
    useEffect(() => {
        const shouldBePlaying = isMetronomeOn && isActive;

        if (shouldBePlaying) {
            if (!metronomeIntervalRef.current) {
                playMetronomeSound();
                metronomeIntervalRef.current = window.setInterval(playMetronomeSound, 60000 / 120);
            }
        } else {
            if (metronomeIntervalRef.current) {
                clearInterval(metronomeIntervalRef.current);
                metronomeIntervalRef.current = null;
            }
        }

        return () => {
            if (metronomeIntervalRef.current) {
                clearInterval(metronomeIntervalRef.current);
                metronomeIntervalRef.current = null;
            }
        };
    }, [isActive, isMetronomeOn, playMetronomeSound]);


    const toggleMetronome = useCallback(() => {
        setIsMetronomeOn(prev => !prev);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1;
                }
                if (!isPausePhase) { 
                    setCycleCount(c => c + 1);
                    setIsPausePhase(true);
                    return 8; 
                } else { 
                    setIsPausePhase(false);
                    return 120;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, isPausePhase]);

    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(120);
        setCycleCount(0);
        setIsPausePhase(false);
        setIsMetronomeOn(true);
    };
    // === End of Lifted Logic ===

    const cprCoachProps = {
      time,
      cycleCount,
      isActive,
      isPausePhase,
      isMetronomeOn,
      toggleTimer,
      resetTimer,
      toggleMetronome
    };

    const renderView = (): ReactNode => {
        switch (activeView) {
            case 'coach':
                return <CprCoach {...cprCoachProps} />;
            case 'drugs':
                return <DrugFormulary />;
            case 'algorithms':
                return <Algorithms />;
            case 'guides':
                return <Guides />;
            default:
                return <CprCoach {...cprCoachProps} />;
        }
    };
    
    const NavItem: React.FC<{ view: View; label: string; icon: ReactNode }> = ({ view, label, icon }) => {
      const isActive = activeView === view;
      return (
        <button
          onClick={() => setActiveView(view)}
          className={`flex-1 md:flex-none md:w-auto flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-red-500 text-white shadow-md' : 'text-slate-500 hover:bg-red-100 hover:text-red-700'
          }`}
          aria-label={`Ver ${label}`}
          aria-current={isActive}
        >
          {icon}
          <span className="text-xs md:text-sm font-medium">{label}</span>
        </button>
      );
    }

    const HeartbeatIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    );

    const PillIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a9 9 0 100 12 9 9 0 000-12z" /></svg>
    );
    
    const BookIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    );

    const FlowChartIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3H14.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H9.75A2.25 2.25 0 017.5 7.5V5.25A2.25 2.25 0 019.75 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 14.25H14.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H9.75A2.25 2.25 0 017.5 18.75V16.5A2.25 2.25 0 019.75 14.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v4.5" />
      </svg>
    );

    const allViews: { view: View; label: string; icon: ReactNode; desktopLabel: string; }[] = [
        { view: 'coach', label: 'RCP', icon: <HeartbeatIcon />, desktopLabel: 'Coach RCP' },
        { view: 'drugs', label: 'Fármacos', icon: <PillIcon />, desktopLabel: 'Fármacos' },
        { view: 'algorithms', label: 'Fluxos', icon: <FlowChartIcon />, desktopLabel: 'Algoritmos' },
        { view: 'guides', label: 'Guias', icon: <BookIcon />, desktopLabel: 'Guias' },
    ];

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-center space-x-3 md:space-x-4">
                    <img
                        src="https://res.cloudinary.com/dwta1roq1/image/upload/w_64,h_64,c_limit,q_auto,f_auto/logo/emergencias-veterinarias"
                        alt="Logo do aplicativo Emergências Veterinárias"
                        className="h-12 w-12 md:h-14 md:w-14 object-contain"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Emergências <span className="text-red-600">Veterinárias</span>
                    </h1>
                </div>
            </header>

            <main className="container mx-auto pb-24 md:pb-8 pl-0 md:pl-24">
                {renderView()}
            </main>
            
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 md:hidden z-20">
              <div className="flex justify-around items-center p-1">
                 {allViews.map(v => <NavItem key={v.view} view={v.view} label={v.label} icon={v.icon} />)}
              </div>
            </nav>
            
            <nav className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-lg p-3 rounded-2xl shadow-lg border border-red-100 z-20">
              <div className="flex flex-col space-y-3">
                 {allViews.map(v => <NavItem key={v.view} view={v.view} label={v.desktopLabel} icon={v.icon} />)}
              </div>
            </nav>

        </div>
    );
};

export default App;