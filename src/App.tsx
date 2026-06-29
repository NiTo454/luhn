import { useLuhnApp } from './hooks/useLuhnApp';
import { Header } from './components/Header';
import { NavTabs } from './components/NavTabs';
import { CalculatorView } from './components/CalculatorView';
import { ValidatorView } from './components/ValidatorView';
import { Part3View } from './components/Part3View';
import { TheoryView } from './components/TheoryView';
import './App.css';

function App() {
  const {
    activeTab,
    setActiveTab,
    calcInput,
    setCalcInput,
    calcResult,
    handleCalculate,
    loadCalcPreset,
    valInput,
    setValInput,
    valResult,
    handleValidate,
    loadValPreset
  } = useLuhnApp();

  return (
    <div className="app-container">
      <Header />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'calc' && (
          <CalculatorView
            calcInput={calcInput}
            setCalcInput={setCalcInput}
            calcResult={calcResult}
            handleCalculate={handleCalculate}
            loadCalcPreset={loadCalcPreset}
          />
        )}

        {activeTab === 'val' && (
          <ValidatorView
            valInput={valInput}
            setValInput={setValInput}
            valResult={valResult}
            handleValidate={handleValidate}
            loadValPreset={loadValPreset}
          />
        )}

        {activeTab === 'part3' && (
          <Part3View
            loadCalcPreset={loadCalcPreset}
            loadValPreset={loadValPreset}
          />
        )}

        {activeTab === 'theory' && <TheoryView />}
      </main>

      <footer className="app-footer">
        Desarrollado con React + TypeScript + Vite &bull; Algoritmo de Luhn Módulo 10 &bull; 2026
      </footer>
    </div>
  );
}

export default App;
