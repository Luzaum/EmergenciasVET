
import React from 'react';

const Algorithms: React.FC = () => {
  const cloudName = 'dwta1roq1';
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto`;

  return (
    <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Algoritmos de RCP</h1>
      <p className="text-slate-500 mb-8">Fluxogramas visuais baseados nas diretrizes RECOVER 2024 para guiar a tomada de decisão rápida durante uma emergência.</p>

      <div className="space-y-10">

        {/* Algoritmo Inicial */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-red-100">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Guia Rápido: Algoritmo Inicial de RCP</h2>
          <div className="bg-slate-100 p-2 rounded-lg">
            <img
              src={`${baseUrl}/RCP/ALGORITMO-INICIAL`}
              alt="Fluxograma do algoritmo inicial de Reanimação Cardiopulmonar (RCP) em cães e gatos, detalhando os ciclos de massagem, ventilação e administração de fármacos"
              className="w-full rounded-md"
            />
          </div>
          <div className="mt-4 text-slate-600 space-y-2 text-sm md:text-base">
            <p>
              Este algoritmo representa o ciclo central da RCP. Ele começa com o reconhecimento da parada e a imediata iniciação de compressões torácicas de alta qualidade, intercaladas com ventilação. A cada 2 minutos, o ciclo é pausado brevemente para análise do ritmo cardíaco, troca do compressor e administração de fármacos (como epinefrina), se indicado.
            </p>
            <p>
              A simplicidade e a estrutura cíclica são projetadas para minimizar interrupções nas compressões, que são cruciais para a perfusão cerebral e coronariana. A fonte para este protocolo é a iniciativa <strong className="text-slate-700">RECOVER 2024</strong>.
            </p>
          </div>
        </div>

        {/* Algoritmo de ECG */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-red-100">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Interpretação do ECG Durante a RCP</h2>
           <div className="bg-slate-100 p-2 rounded-lg">
              <img
                src={`${baseUrl}/RCP/ALGORITMO-ELETROCARDIOGRAMA`}
                alt="Fluxograma do algoritmo de Eletrocardiograma (ECG) para diferenciar ritmos chocáveis (TVSP, FV) de ritmos não chocáveis (Assistolia, AESP) durante uma parada cardiorrespiratória"
                className="w-full rounded-md"
              />
          </div>
          <div className="mt-4 text-slate-600 space-y-2 text-sm md:text-base">
            <p>
              Este fluxograma detalha a tomada de decisão após a análise do ritmo no ECG. Os ritmos são classificados em "chocáveis" (Fibrilação Ventricular/TV sem pulso) ou "não chocáveis" (Assistolia/AESP). A escolha do tratamento diverge a partir daqui: ritmos chocáveis requerem desfibrilação imediata, seguida pelo retorno às compressões, enquanto ritmos não chocáveis são tratados com fármacos vasopressores.
            </p>
            <p>
              Esta diferenciação é um ponto crítico na RCP, pois a aplicação de um choque em um ritmo não chocável é ineficaz e apenas atrasa as compressões vitais. A fonte para este protocolo é a iniciativa <strong className="text-slate-700">RECOVER 2024</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Algorithms;
