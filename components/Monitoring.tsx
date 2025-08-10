
import React, { useState } from 'react';
import { MONITORING_PARAMS } from '../constants';
import { MonitoringParam } from '../types';

const MonitoringCard: React.FC<{ param: MonitoringParam }> = ({ param }) => {
    const [value, setValue] = useState<string>('');

    const getStatus = () => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return { color: 'slate', message: 'Aguardando valor...' };
        }
        if (numValue < param.lowThreshold) {
            return { color: 'amber', message: param.lowMessage };
        }
        if (param.highThreshold && numValue > param.highThreshold) {
            return { color: 'amber', message: param.highMessage };
        }
        return { color: 'green', message: `Alvo (${param.target} ${param.unit}) atingido.` };
    };

    const status = getStatus();
    const colorVariants = {
        slate: 'border-slate-300 bg-slate-100 text-slate-500',
        green: 'border-green-400 bg-green-100 text-green-700',
        amber: 'border-amber-400 bg-amber-100 text-amber-700',
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 flex flex-col">
            <h3 className="text-xl font-bold text-slate-700">{param.name}</h3>
            <p className="text-slate-500 mb-4">Alvo: {param.target} {param.unit}</p>
            
            <div className="relative">
                <input
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={`Valor em ${param.unit}`}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{param.unit}</span>
            </div>
            
            <div className={`mt-4 p-3 rounded-lg border-2 ${colorVariants[status.color]} transition-colors`}>
                <p className="font-semibold text-sm">{status.message}</p>
            </div>
            
            {status.color === 'amber' && (
                <div className="mt-4 pt-4 border-t border-slate-200 text-sm">
                     <p className="font-bold text-slate-600">Causas Potenciais:</p>
                     <p className="text-slate-500 mb-2">{param.causes}</p>
                     <p className="font-bold text-slate-600">Ações Recomendadas:</p>
                     <p className="text-slate-500">{param.actions}</p>
                </div>
            )}
        </div>
    );
}

const Monitoring: React.FC = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Monitorização em Tempo Real</h1>
            <p className="text-slate-500 mb-6">Insira os dados do paciente para guiar suas ações com base nos alvos RECOVER.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MONITORING_PARAMS.map(param => (
                    <MonitoringCard key={param.id} param={param} />
                ))}
            </div>
        </div>
    );
};

export default Monitoring;
