import { Drug, GuideSection, MonitoringParam } from './types';

export const DRUGS: Drug[] = [
  {
    name: 'Amiodarona',
    class: 'Antiarrítmico Classe III',
    indication: 'FV/TV refratária à desfibrilação',
    doseCanine: '5 mg/kg bolus lento',
    doseCanineValue: { low: 5 },
    doseFeline: '5 mg/kg bolus lento',
    doseFelineValue: { low: 5 },
    doseIT: 'Não recomendado',
    concentration: 50, // 50 mg/mL
    notes: 'Fármaco de escolha para gatos. Usar em cães se a lidocaína for ineficaz.',
  },
  {
    name: 'Atipamezol',
    class: 'Antagonista α-2 seletivo',
    indication: 'Reversão de (dex)medetomidina',
    doseCanine: '0.5 mg/kg',
    doseCanineValue: { low: 0.5 },
    doseFeline: '0.5 mg/kg',
    doseFelineValue: { low: 0.5 },
    doseIT: 'Não recomendado',
    concentration: 5, // 5 mg/mL
    notes: 'Reversor de eleição para (dex)medetomidina. Administrar IM preferencialmente (dose em volume igual à do sedativo).',
  },
  {
    name: 'Atropina',
    class: 'Anticolinérgico',
    indication: 'AESP/Assistolia com suspeita de alto tônus vagal',
    doseCanine: '0.04 mg/kg',
    doseCanineValue: { low: 0.04 },
    doseFeline: '0.04 mg/kg',
    doseFelineValue: { low: 0.04 },
    doseIT: '0.08-0.12 mg/kg',
    concentration: 0.54, // mg/mL
    notes: 'Dose única no início da RCP. Não repetir. O uso rotineiro é desaconselhado.',
  },
  {
    name: 'Bicarbonato de Sódio',
    class: 'Agente alcalinizante',
    indication: 'PCR prolongada (>10-15 min) com acidose metabólica grave',
    doseCanine: '1 mEq/kg lento',
    doseCanineValue: { low: 1 },
    doseFeline: '1 mEq/kg lento',
    doseFelineValue: { low: 1 },
    doseIT: 'Não aplicável',
    concentration: 1, // 1 mEq/mL (8.4%)
    notes: 'Contraindicado para uso rotineiro. Requer ventilação adequada para eliminar o CO2 produzido.',
  },
  {
    name: 'Cálcio (Gluconato 10%)',
    class: 'Eletrólito',
    indication: 'Hipocalcemia grave, Hipercalemia, Overdose de bloqueador de canal de Ca2+',
    doseCanine: '50-100 mg/kg',
    doseCanineValue: { low: 50, high: 100 },
    doseFeline: '50-100 mg/kg',
    doseFelineValue: { low: 50, high: 100 },
    doseIT: 'Não aplicável',
    concentration: 100, // 100 mg/mL (10%)
    notes: 'Contraindicado para uso rotineiro. Administrar apenas com indicação específica e documentada.',
  },
  {
    name: 'Epinefrina',
    class: 'Agonista α e β-adrenérgico',
    indication: 'AESP, Assistolia, FV/TV refratária',
    doseCanine: '0.01 mg/kg',
    doseCanineValue: { low: 0.01 },
    doseFeline: '0.01 mg/kg',
    doseFelineValue: { low: 0.01 },
    doseIT: '0.1 mg/kg',
    concentration: 1, // 1 mg/mL
    notes: 'Administrar a cada 3-5 min (a cada 2 ciclos de SBV). A dose alta (0.1 mg/kg) é desaconselhada. Não administrar antes do primeiro choque para FV/TV.',
  },
  {
    name: 'Furosemida',
    class: 'Diurético de alça',
    indication: 'Edema pulmonar cardiogênico, insuficiência cardíaca congestiva',
    doseCanine: '2-4 mg/kg',
    doseCanineValue: { low: 2, high: 4 },
    doseFeline: '1-2 mg/kg',
    doseFelineValue: { low: 1, high: 2 },
    doseIT: 'Não aplicável',
    concentration: 10, // 10 mg/mL
    notes: 'Essencial no tratamento do choque cardiogênico com edema pulmonar. Monitorar hidratação e eletrólitos.',
  },
  {
    name: 'Ioimbina',
    class: 'Antagonista α-2',
    indication: 'Reversão de xilazina',
    doseCanine: '0.1 mg/kg',
    doseCanineValue: { low: 0.1 },
    doseFeline: '0.1 mg/kg',
    doseFelineValue: { low: 0.1 },
    doseIT: 'Não aplicável',
    concentration: 2, // 2 mg/mL
    notes: 'Reversor específico para xilazina. Atipamezol é o preferido para reverter (dex)medetomidina.',
  },
  {
    name: 'Lidocaína',
    class: 'Antiarrítmico Classe IB',
    indication: 'FV/TV refratária à desfibrilação',
    doseCanine: '2 mg/kg bolus',
    doseCanineValue: { low: 2 },
    doseFeline: 'Não recomendado',
    doseIT: '4 mg/kg',
    concentration: 20, // 20 mg/mL (2%)
    notes: 'Fármaco de escolha para cães. Gatos são muito sensíveis à toxicidade do SNC.',
  },
  {
    name: 'Midazolam',
    class: 'Benzodiazepínico',
    indication: 'Controle de convulsões, sedação',
    doseCanine: '0.2-0.5 mg/kg',
    doseCanineValue: { low: 0.2, high: 0.5 },
    doseFeline: '0.2-0.5 mg/kg',
    doseFelineValue: { low: 0.2, high: 0.5 },
    doseIT: 'Não aplicável',
    concentration: 5, // 5 mg/mL
    notes: 'Usado como anticonvulsivante de ação rápida. Pode ser combinado com outros fármacos para sedação.',
  },
  {
    name: 'Naloxona',
    class: 'Antagonista de opioides',
    indication: 'PCR suspeita de ser causada por overdose de opioides',
    doseCanine: '0.04 mg/kg',
    doseCanineValue: { low: 0.04 },
    doseFeline: '0.04 mg/kg',
    doseFelineValue: { low: 0.04 },
    doseIT: '0.08 mg/kg',
    concentration: 0.4, // 0.4 mg/mL
    notes: 'Administrar se houver histórico de administração recente de opioides.',
  },
  {
    name: 'Vasopressina',
    class: 'Hormônio antidiurético (agonista V1)',
    indication: 'AESP, Assistolia, FV/TV refratária',
    doseCanine: '0.8 U/kg',
    doseCanineValue: { low: 0.8 },
    doseFeline: '0.8 U/kg',
    doseFelineValue: { low: 0.8 },
    doseIT: '0.8 U/kg',
    concentration: 20, // 20 U/mL
    notes: 'Pode ser alternada ou substituir a epinefrina. Eficaz em ambientes acidóticos.',
  },
];

export const GUIDES_CONTENT: GuideSection[] = [
    {
        id: 'fisiologia',
        title: 'I: Fisiologia da Doença Crítica',
        data: [
            {
                title: 'A Cascata Celular da Parada Cardiorrespiratória',
                content: 'A PCR resulta na cessação do fornecimento de oxigênio (DO2), forçando as células a um metabolismo anaeróbico ineficiente. Isso leva ao esgotamento de ATP, acúmulo de lactato (acidose), falha da bomba iônica e edema celular. A reperfusão, embora vital, causa uma explosão de espécies reativas de oxigênio (EROs), gerando a "lesão de reperfusão" e a Síndrome Pós-Parada Cardíaca.',
                tooltips: [
                  { term: 'DO2', explanation: 'DO2 = Débito Cardíaco × Conteúdo Arterial de Oxigênio. Representa a quantidade de oxigênio entregue aos tecidos.' },
                  { term: 'Lesão de Reperfusão', explanation: 'Dano tecidual paradoxal causado pela restauração do fluxo sanguíneo a uma área previamente isquêmica. A reintrodução de oxigênio gera radicais livres que danificam as células.' },
                ]
            },
            {
                title: 'Hemodinâmica do Choque',
                content: 'O choque é a produção inadequada de energia celular, geralmente por baixo DO2.',
                subsections: [
                    {
                        title: 'Choque Hipovolêmico',
                        content: 'Problema de "volume" (ex: hemorragia, desidratação). Causa vasoconstrição compensatória. Sinais clássicos: taquicardia, TPC prolongado, pulsos fracos. Tratamento: reposição agressiva de fluidos.'
                    },
                    {
                        title: 'Choque Cardiogênico',
                        content: 'Problema de "bomba" (ex: insuficiência cardíaca). O coração falha. Causa congestão venosa (edema pulmonar). Tratamento: inotrópicos e diuréticos. Fluidos agressivos são fatais.'
                    },
                    {
                        title: 'Choque Distributivo',
                        content: 'Problema de "vasos" (ex: sepse, anafilaxia). Vasodilatação massiva. Tratamento: fluidos para preencher o espaço vascular e vasopressores para restaurar o tônus.'
                    }
                ],
                tooltips: [
                  { term: 'Choque', explanation: 'Estado de falha circulatória aguda que resulta em perfusão tecidual e oxigenação celular inadequadas.' }
                ]
            }
        ]
    },
    {
        id: 'sbv',
        title: 'III: Suporte Básico de Vida (SBV)',
        data: [
            {
                title: 'Dominando as Compressões Torácicas',
                content: 'A base da sobrevivência. Qualidade é crucial.',
                subsections: [
                    {
                        title: 'Frequência',
                        content: '100 a 120 compressões por minuto. Use um metrônomo.'
                    },
                    {
                        title: 'Profundidade',
                        content: 'Comprimir o tórax em 1/3 a 1/2 de sua largura.'
                    },
                    {
                        title: 'Recuo Completo',
                        content: 'Permitir que a parede torácica recue totalmente. Não se apoie no paciente.'
                    }
                ]
            },
            {
                title: 'O Perigo da Hiperventilação',
                content: 'Um dos erros mais comuns e prejudiciais. A hiperventilação aumenta a pressão intratorácica, diminuindo o retorno venoso e o débito cardíaco gerado pelas compressões. A taxa correta é de 10 respirações por minuto (1 a cada 6 segundos) com um tubo endotraqueal.',
                tooltips: [
                    {term: 'Hiperventilação', explanation: 'Ventilar com frequência ou volume excessivos. Diminui drasticamente a eficácia da RCP ao impedir o retorno de sangue ao coração.'}
                ]
            },
            {
                title: 'O Ciclo de 2 Minutos',
                content: 'Realizar ciclos ininterruptos de 2 minutos de compressões de alta qualidade. Minimizar pausas (<10s) para análise de ritmo e troca de compressor. A fadiga reduz a qualidade após 2 minutos, então a troca é essencial.'
            }
        ]
    },
    {
        id: 'sav',
        title: 'IV: Suporte Avançado de Vida (SAV)',
        data: [
            {
                title: 'Acesso Vascular: A Linha da Vida',
                content: 'O acesso vascular rápido e eficiente é um pilar do SAV. A via intravenosa (IV) é a ideal, preferencialmente em veias de grosso calibre como a jugular ou cefálica. Se o acesso IV não for obtido em 90 segundos, a via intraóssea (IO) é a alternativa de eleição, oferecendo absorção e efeitos de fármacos equivalentes. A via intracardíaca é desaconselhada devido aos riscos (laceração do miocárdio, pneumotórax).',
                tooltips: [
                  { term: 'Intraóssea (IO)', explanation: 'Técnica de inserção de uma agulha especial no espaço medular de um osso (úmero, fêmur, tíbia) para administrar fluidos e fármacos diretamente na circulação sistêmica.' },
                ]
            },
            {
                title: 'O Arsenal Farmacológico: Quando e Por Quê',
                content: 'O uso de fármacos é guiado pelo ritmo do ECG e pelo tempo de parada. O objetivo é melhorar a perfusão coronariana e cerebral, e reverter arritmias.',
                subsections: [
                    {
                        title: 'Epinefrina (Dose Baixa)',
                        content: 'O vasopressor de eleição. Usado em AESP/Assistolia a cada 3-5 minutos (um ciclo sim, um ciclo não). Seu efeito alfa-agonista aumenta a pressão arterial diastólica, melhorando a perfusão do coração.'
                    },
                    {
                        title: 'Vasopressina',
                        content: 'Pode ser usada em substituição ou alternada com a epinefrina. Não possui efeito beta-adrenérgico cronotrópico, sendo uma boa opção em ambientes acidóticos.'
                    },
                    {
                        title: 'Atropina',
                        content: 'Uso controverso. Indicada apenas na suspeita de alto tônus vagal como causa da parada (ex: colapso durante procedimento oftálmico). Não usar rotineiramente.'
                    },
                    {
                        title: 'Antiarrítmicos (Amiodarona/Lidocaína)',
                        content: 'Reservados para FV/TV sem pulso que não respondem à desfibrilação. A amiodarona é a escolha para gatos, enquanto a lidocaína é a primeira linha para cães.'
                    }
                ]
            },
            {
                title: "Desfibrilação: O 'Reset' Elétrico",
                content: 'A desfibrilação é o único tratamento eficaz para a Fibrilação Ventricular (FV) e Taquicardia Ventricular sem pulso (TVSP). O objetivo é despolarizar simultaneamente uma massa crítica de miócitos, permitindo que o nó sinusal retome o controle do ritmo. O primeiro choque deve ser administrado o mais rápido possível. Após o choque, as compressões devem ser retomadas imediatamente por 2 minutos, sem verificar o pulso, para não perder o fluxo sanguíneo gerado.',
                tooltips: [
                  { term: 'Fibrilação Ventricular (FV)', explanation: 'Atividade elétrica caótica e desorganizada nos ventrículos, que impede a contração cardíaca eficaz. Resulta em ausência de débito cardíaco.' },
                  { term: 'Taquicardia Ventricular sem pulso (TVSP)', explanation: 'Ritmo ventricular rápido e regular que é tão ineficaz em bombear sangue que não gera pulso palpável.' },
                ]
            }
        ]
    },
    {
        id: 'monitorizacao',
        title: 'V: Monitorização em Tempo Real',
        data: [
            {
                title: 'Capnografia (ETCO2)',
                content: 'É o padrão-ouro para avaliar a eficácia da RCP. Um ETCO2 ≥15-18 mmHg indica boa qualidade de compressão. Uma queda (<15 mmHg) sugere compressões ineficazes, deslocamento do tubo, ou outras complicações. Um aumento súbito e acentuado é o indicador mais precoce de ROSC.',
                subsections: [
                    { title: 'Alvo na RCP', content: '≥15-18 mmHg' },
                    { title: 'Causas de Valor Baixo', content: 'Compressões ineficazes, deslocamento do tubo ET, hipovolemia, embolia pulmonar.' },
                    { title: 'Ações Recomendadas', content: 'Otimizar técnica de compressão (frequência, profundidade, recuo). Verificar tubo. Considerar fluidos/vasopressores.' }
                ]
            },
            {
                title: 'Pressão Arterial Diastólica (PAD)',
                content: 'Medida com cateter arterial invasivo, reflete a perfusão coronariana. Uma PAD baixa significa que o coração não está recebendo sangue suficiente para se recuperar.',
                subsections: [
                    { title: 'Alvo na RCP', content: '≥30 mmHg' },
                    { title: 'Causas de Valor Baixo', content: 'Compressões ineficazes, vasodilatação severa, hipovolemia.' },
                    { title: 'Ações Recomendadas', content: 'Otimizar compressões. Aumentar dose/frequência de vasopressor. Considerar fluidos.' }
                ]
            },
            {
                title: 'Oximetria de Pulso (SpO2) Pós-ROSC',
                content: 'Após o retorno da circulação, a oximetria é crucial. Tanto a hipoxemia (falta de oxigênio) quanto a hiperoxemia (excesso de oxigênio) são prejudiciais, especialmente para o cérebro.',
                subsections: [
                    { title: 'Alvo Pós-ROSC', content: '94-98%' },
                    { title: 'Causas de Valor Anormal', content: 'Má ventilação, doença pulmonar, baixa perfusão (para hipoxemia); FiO2 excessiva (para hiperoxemia).' },
                    { title: 'Ações Recomendadas', content: 'Ajustar FiO2 para o mínimo necessário. Garantir via aérea patente e ventilação adequada (10 rpm).' }
                ]
            }
        ]
    }
];

export const MONITORING_PARAMS: MonitoringParam[] = [
    {
        id: 'etco2',
        name: 'Capnografia (ETCO2) durante RCP',
        target: '≥ 15-18',
        unit: 'mmHg',
        lowThreshold: 15,
        lowMessage: 'Qualidade de compressão subótima. Risco de ROSC baixo.',
        causes: 'Compressões ineficazes (profundidade/frequência), deslocamento do tubo ET, hipovolemia severa, embolia pulmonar maciça.',
        actions: 'Otimizar técnica de compressão, verificar posicionamento do tubo, considerar bolus de fluidos ou aumento da dose de vasopressores.',
    },
    {
        id: 'pad',
        name: 'Pressão Arterial Diastólica (Invasiva)',
        target: '≥ 30',
        unit: 'mmHg',
        lowThreshold: 30,
        lowMessage: 'Perfusão coronariana inadequada. Coração não está sendo "alimentado".',
        causes: 'Compressões ineficazes, vasodilatação severa (ex: sepse), hipovolemia.',
        actions: 'Otimizar compressões. Aumentar dose/frequência de vasopressores (Epinefrina). Considerar bolus de fluidos.',
    },
    {
        id: 'spo2',
        name: 'Oximetria (SpO2) Pós-ROSC',
        target: '94-98',
        unit: '%',
        lowThreshold: 94,
        highThreshold: 98,
        lowMessage: 'Hipoxemia. Risco de lesão cerebral secundária. Aumente a FiO2.',
        highMessage: 'Hiperoxemia. Risco de lesão por radicais livres. Reduza a FiO2.',
        causes: 'Hipoventilação, doença pulmonar pré-existente, edema pulmonar (para hipoxemia); FiO2 excessiva (para hiperoxemia).',
        actions: 'Ajustar FiO2 (oxigênio suplementar) para o mínimo necessário para manter a meta. Garantir via aérea patente e ventilação adequada (10 rpm).',
    },
];
