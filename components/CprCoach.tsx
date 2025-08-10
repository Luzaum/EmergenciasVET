import React, { useState } from 'react';
import QuestionMarkIcon from './icons/QuestionMarkIcon';

interface CprCoachProps {
    time: number;
    cycleCount: number;
    isActive: boolean;
    isPausePhase: boolean;
    isMetronomeOn: boolean;
    toggleTimer: () => void;
    resetTimer: () => void;
    toggleMetronome: () => void;
}

const MetronomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v4.963my-3.286l-1.056 3.167a2.25 2.25 0 01-2.244 2.244H4.5a2.25 2.25 0 01-2.244-2.244L2.25 10.5h5.256a2.25 2.25 0 012.244 2.244z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const cprSongs = [
    { title: "Stayin' Alive", artist: "Bee Gees", bpm: 103 },
    { title: "Another One Bites the Dust", artist: "Queen", bpm: 110 },
    { title: "I Will Survive", artist: "Gloria Gaynor", bpm: 117 },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", bpm: 115 },
    { title: "Dancing Queen", artist: "ABBA", bpm: 100 },
    { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", bpm: 120 },
];

const compressionGuideSteps = [
    {
        title: "1. Posição Correta do Corpo",
        publicId: "RCP/POSICAO-CORPO",
        alt: "Ilustração da postura correta do socorrista durante a RCP, com os braços esticados e ombros sobre as mãos",
        caption: "Para compressões eficazes, posicione-se sobre o paciente com os braços retos e os cotovelos travados. Seus ombros devem estar diretamente acima das suas mãos. Use o peso do seu tronco para comprimir, e não a força dos braços. O objetivo é comprimir o tórax em 1/3 a 1/2 de sua largura, permitindo o recuo total entre as compressões."
    },
    {
        title: "2. Posição Padrão das Mãos",
        publicId: "RCP/POSICAO-MAOS",
        alt: "Ilustração do posicionamento das mãos uma sobre a outra com os dedos entrelaçados para realizar a compressão torácica",
        caption: "Coloque a base (região hipotenar) de uma mão sobre o ponto de compressão. Posicione a outra mão sobre a primeira, entrelaçando os dedos para mantê-los afastados do tórax do paciente. Esta técnica concentra a força na base das mãos, otimizando a eficácia da compressão."
    },
    {
        title: "3. Cães de Tórax Redondo (Ex: Labrador, Golden)",
        publicId: "RCP/CAES-TORAX-REDONDO",
        alt: "Ilustração do ponto de compressão em cães de tórax redondo, sobre a parte mais larga do tórax",
        caption: "Para cães com tórax redondo ou profundo, as compressões devem ser realizadas sobre a parte mais larga do tórax. Esta técnica se baseia na 'Teoria da Bomba Torácica', onde a compressão do tórax como um todo gera o fluxo sanguíneo."
    },
    {
        title: "4. Cães com Tórax em Quilha (Ex: Galgo, Doberman)",
        publicId: "RCP/CAES-QUILHA",
        alt: "Ilustração do ponto de compressão em cães com tórax em quilha, diretamente sobre o coração",
        caption: "Para cães com tórax estreito e profundo (em forma de quilha), as compressões devem ser aplicadas diretamente sobre o coração (entre o 4º e 6º espaço intercostal). Esta abordagem utiliza a 'Teoria da Bomba Cardíaca', comprimindo o coração diretamente entre as costelas."
    },
    {
        title: "5. Cães com Tórax em Barril (Ex: Bulldog, Pug)",
        publicId: "RCP/CAES-TORAX-BARRIL",
        alt: "Ilustração da RCP em cães de tórax em barril, com o animal em decúbito dorsal e compressão sobre o esterno",
        caption: "Para cães com tórax largo e achatado (em barril), o paciente deve ser posicionado em decúbito dorsal (de costas para o chão). As compressões são realizadas sobre o esterno, de forma similar à técnica em humanos."
    },
    {
        title: "6. Cães Pequenos (<5 kg), Filhotes e Gatos",
        publicId: "RCP/GATOS",
        alt: "Ilustração da técnica de compressão torácica com uma ou duas mãos para gatos e cães pequenos",
        caption: "Para pacientes pequenos, a técnica de compressão circunferencial com uma mão é preferível. O coração é comprimido diretamente entre o polegar e os outros dedos. Para socorristas com mãos pequenas ou em animais um pouco maiores, a técnica com as duas mãos pode ser utilizada, aplicando a mesma teoria."
    }
];

const CprCoach: React.FC<CprCoachProps> = ({
    time,
    cycleCount,
    isActive,
    isPausePhase,
    isMetronomeOn,
    toggleTimer,
    resetTimer,
    toggleMetronome
}) => {
    const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
    const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
    const cloudName = 'dwta1roq1';
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_400`;


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getAlert = () => {
        if (isPausePhase) return <span className="text-blue-500 font-bold">Verifique pulso + ECG ({time}s)</span>;
        if (!isActive) {
            if (cycleCount === 0 && time === 120) {
                return 'Pressione "Iniciar" para começar';
            }
            return 'Pausado';
        }
        if (time <= 10 && !isPausePhase) return <span className="text-yellow-400">Pausa em {time}s. Preparar troca!</span>;
        if (time > 115) return 'Inicie o ciclo de compressões';
        return 'Continue compressões de alta qualidade';
    };

    const getButtonText = () => {
        if (isActive) return 'Pausar';
        if (cycleCount === 0 && time === 120) return 'Iniciar';
        return 'Retomar';
    };
    
    const size = 180;
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const circumference = 2 * Math.PI * radius;

    const totalDuration = isPausePhase ? 8 : 120;
    const cappedTime = Math.min(time, totalDuration);
    const progress = (totalDuration - cappedTime) / totalDuration;
    const strokeDashoffset = circumference * (1 - progress);

    const getTimerStrokeColor = () => {
        if (!isActive) return 'stroke-slate-300';
        if (isPausePhase) return 'stroke-blue-500';
        return 'stroke-red-500';
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">Ciclo de RCP Contínuo</h2>
                    <p className="text-slate-500 mb-4 h-10">Ciclos completos: <span className="font-bold text-xl text-slate-800">{cycleCount}</span></p>

                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg width={size} height={size} viewBox={viewBox} className="-rotate-90 transform">
                            <circle className="stroke-slate-200" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="transparent" />
                            <circle
                                className={`${getTimerStrokeColor()} transition-[stroke-dashoffset] duration-1000 linear`}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-mono font-bold text-slate-800">{formatTime(time)}</span>
                        </div>
                    </div>

                    <div className="mt-4 text-lg font-semibold h-6">{getAlert()}</div>

                    <div className="flex items-center space-x-3 mt-4">
                        <button onClick={toggleTimer} className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                            {getButtonText()}
                        </button>
                        <button onClick={resetTimer} className="px-4 py-3 bg-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-300 transition-colors">
                            Resetar
                        </button>
                    </div>
                     <button onClick={toggleMetronome} className={`mt-6 flex items-center space-x-2 px-5 py-2 rounded-full font-semibold transition-colors ${isMetronomeOn ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        <MetronomeIcon className="w-5 h-5"/>
                        <span>{isMetronomeOn ? 'Metrônomo Ativo (120bpm)' : 'Ligar Metrônomo (120bpm)'}</span>
                    </button>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100">
                        <h3 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2 border-red-200">Suporte Básico de Vida (SBV) - O Que Fazer</h3>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">✓</span>
                                <div className="flex-1"><strong>Iniciar Compressões:</strong> Imediatamente se inconsciente e apnéico. Não perca tempo palpando pulso.</div>
                                <button onClick={() => setIsGuideModalOpen(true)} className="ml-2 text-red-500 hover:text-red-700"><QuestionMarkIcon className="w-5 h-5"/></button>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">✓</span>
                                <div className="flex-1"><strong>Frequência e Profundidade:</strong> 100-120 bpm, 1/3 a 1/2 da largura do tórax.</div>
                                <button onClick={() => setIsMusicModalOpen(true)} className="ml-2 text-red-500 hover:text-red-700"><QuestionMarkIcon className="w-5 h-5"/></button>
                            </li>
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Recuo Completo:</strong> Permita ao tórax expandir totalmente entre compressões.</div></li>
                             <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Ventilação (Com Tubo):</strong> 10 rpm (1 respiração a cada 6s). Evite hiperventilação.</div></li>
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Trocar Compressor:</strong> A cada 2 minutos para evitar fadiga e manter a qualidade.</div></li>
                        </ul>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100">
                        <h3 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2 border-red-200">Suporte Avançado de Vida (SAV) - Ações</h3>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Ritmos Não-Chocáveis (AESP/Assistolia):</strong> Epinefrina (dose baixa) a cada 3-5 min.</div></li>
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Ritmos Chocáveis (FV/TV sem pulso):</strong> Desfibrilar imediatamente (2-4 J/kg).</div></li>
                             <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Após Choque:</strong> Retomar compressões imediatamente por 2 min. Não pause para checar ritmo.</div></li>
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>FV/TV Refratária:</strong> Após choque, considerar Amiodarona (gatos/cães) ou Lidocaína (cães).</div></li>
                            <li className="flex items-start"><span className="text-red-500 mr-2 mt-1">✓</span><div><strong>Causas Reversíveis:</strong> Investigar e tratar os "Hs e Ts" (Hipovolemia, Hipóxia, etc.).</div></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Music Modal */}
            {isMusicModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setIsMusicModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Guia de Ritmo (100-120 BPM)</h3>
                        <p className="text-slate-600 mb-6">Use estas músicas como um metrônomo mental para manter a frequência de compressão correta.</p>
                        <ul className="space-y-3">
                            {cprSongs.map(song => (
                                <li key={song.title} className="flex justify-between items-center p-3 bg-slate-100 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-slate-700">{song.title}</p>
                                        <p className="text-sm text-slate-500">{song.artist}</p>
                                    </div>
                                    <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">{song.bpm} BPM</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Compression Guide Modal */}
            {isGuideModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col relative">
                         <button onClick={() => setIsGuideModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 bg-white/50 rounded-full p-1 z-10">
                            <CloseIcon className="w-7 h-7" />
                        </button>
                        <h3 className="text-2xl font-bold text-slate-800 p-6 flex-shrink-0">Guia Visual de Compressão Torácica</h3>
                        <div className="overflow-y-auto px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {compressionGuideSteps.map(step => (
                                    <div key={step.title} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="p-4">
                                          <h3 className="text-lg font-bold text-red-700 mb-2">{step.title}</h3>
                                        </div>
                                        <img src={`${baseUrl}/${step.publicId}`} alt={step.alt} className="w-full h-auto" />
                                        <div className="p-4">
                                            <p className="text-sm text-slate-600">{step.caption}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CprCoach;