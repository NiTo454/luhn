import { Calculator, ShieldCheck, ListCheck, BookOpen } from 'lucide-react';
import type { TabType } from '../hooks/useLuhnApp';

interface NavTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function NavTabs({ activeTab, setActiveTab }: NavTabsProps) {
  return (
    <nav className="nav-tabs">
      <button 
        className={`tab-btn ${activeTab === 'calc' ? 'active' : ''}`}
        onClick={() => setActiveTab('calc')}
      >
        <Calculator size={18} /> Parte I & II: Calcu. Dígito
      </button>
      <button 
        className={`tab-btn ${activeTab === 'val' ? 'active' : ''}`}
        onClick={() => setActiveTab('val')}
      >
        <ShieldCheck size={18} /> Parte I & II: Validador
      </button>
      <button 
        className={`tab-btn ${activeTab === 'part3' ? 'active' : ''}`}
        onClick={() => setActiveTab('part3')}
      >
        <ListCheck size={18} /> Parte III: Ejercicios
      </button>
      <button 
        className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
        onClick={() => setActiveTab('theory')}
      >
        <BookOpen size={18} /> Explicación Teórica
      </button>
    </nav>
  );
}
