
import React, { useState, useMemo } from 'react';
import { DRUGS } from '../constants';
import { Drug } from '../types';

const DrugRow: React.FC<{ drug: Drug; weight: number }> = ({ drug, weight }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const calculateDose = (doseInfo?: { low: number; high?: number }, isFeline?: boolean) => {
        if (!doseInfo || weight <= 0) return 'N/A';
        if (isFeline && drug.doseFeline.toLowerCase().includes('não rec')) return 'Não Rec.';
        
        const lowDose = (doseInfo.low * weight).toFixed(2);
        const highDose = doseInfo.high ? (doseInfo.high * weight).toFixed(2) : null;

        const lowVolume = drug.concentration ? (parseFloat(lowDose) / drug.concentration).toFixed(2) : null;
        const highVolume = drug.concentration && highDose ? (parseFloat(highDose) / drug.concentration).toFixed(2) : null;
        
        const doseUnit = drug.name === 'Vasopressina' ? 'U' : (drug.class.includes('alcalinizante') ? 'mEq' : 'mg');
        
        let doseStr = `${lowDose} ${doseUnit}`;
        if(highDose) doseStr = `${lowDose} - ${highDose} ${doseUnit}`;
        
        let volStr = '';
        if(lowVolume) volStr = `${lowVolume} mL`;
        if(highVolume && lowVolume) volStr = `${lowVolume} - ${highVolume} mL`;
        
        return (
            <div>
                <p className="font-semibold">{doseStr}</p>
                {volStr && <p className="text-xs text-slate-500">{volStr}</p>}
            </div>
        );
    };

    const concentrationStr = drug.concentration 
        ? `${drug.concentration} ${drug.name === 'Vasopressina' ? 'U' : (drug.class.includes('alcalinizante') ? 'mEq' : 'mg')}/mL` 
        : null;

    return (
        <>
            <tr onClick={() => setIsExpanded(!isExpanded)} className="border-b border-slate-200 hover:bg-red-50/50 cursor-pointer transition-colors">
                <td className="p-3">
                    <p className="font-semibold text-red-700">{drug.name}</p>
                    {concentrationStr && <p className="text-xs font-normal text-slate-500">{concentrationStr}</p>}
                </td>
                <td className="p-3 text-slate-600 hidden md:table-cell">{drug.class}</td>
                <td className="p-3">{calculateDose(drug.doseCanineValue)}</td>
                <td className="p-3">{calculateDose(drug.doseFelineValue, true)}</td>
            </tr>
            {isExpanded && (
                <tr className="bg-slate-50">
                    <td colSpan={4} className="p-4 text-sm">
                        <p className="font-bold text-slate-700">Notas (RECOVER 2024):</p>
                        <p className="text-slate-600">{drug.notes}</p>
                        <p className="mt-2 text-slate-500"><strong className="text-slate-600">Indicação:</strong> {drug.indication}</p>
                         {concentrationStr && <p className="text-xs text-slate-400 mt-1">Concentração p/ cálculo: {concentrationStr}</p>}
                    </td>
                </tr>
            )}
        </>
    );
};


const DrugFormulary: React.FC = () => {
    const [weight, setWeight] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDrugs = useMemo(() => {
        return DRUGS.filter(drug => 
            drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            drug.class.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Fármacos de Emergência</h1>
            <p className="text-slate-500 mb-6">Doses e calculadoras baseadas nas diretrizes RECOVER 2024.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-2xl shadow-lg border border-red-100">
                <div className="md:col-span-1">
                    <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-1">Peso do Paciente (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight || ''}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        placeholder="Ex: 10"
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Buscar Fármaco ou Classe</label>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        placeholder="Ex: Epinefrina, Vasopressor..."
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-red-100">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-3">Fármaco</th>
                            <th className="p-3 hidden md:table-cell">Classe</th>
                            <th className="p-3">Dose Cães (IV/IO)</th>
                            <th className="p-3">Dose Gatos (IV/IO)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDrugs.map(drug => (
                            <DrugRow key={drug.name} drug={drug} weight={weight} />
                        ))}
                    </tbody>
                </table>
                 {filteredDrugs.length === 0 && <p className="p-4 text-center text-slate-500">Nenhum fármaco encontrado.</p>}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">Clique em uma linha para ver mais detalhes. As doses calculadas são para a via IV/IO.</p>
        </div>
    );
};

export default DrugFormulary;