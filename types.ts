export interface Drug {
  name: string;
  class: string;
  indication: string;
  doseCanine: string;
  doseCanineValue?: { low: number, high?: number };
  doseFeline: string;
  doseFelineValue?: { low: number, high?: number };
  doseIT: string;
  concentration?: number; // mg/mL for volume calculation
  notes: string;
}

export interface GuideContent {
  title: string;
  content: string;
  subsections?: GuideContent[];
  tooltips?: { term: string; explanation:string }[];
}

export interface GuideSection {
  id: string;
  title: string;
  data: GuideContent[];
}

export interface MonitoringParam {
  id: string;
  name: string;
  target: string;
  unit: string;
  lowThreshold: number;
  highThreshold?: number;
  lowMessage: string;
  highMessage?: string;
  causes: string;
  actions: string;
}
