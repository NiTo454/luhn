import { Calculator, RefreshCw, Sparkles, CreditCard } from 'lucide-react';
import type { LuhnCalculationResult } from '../utils/luhn';
import { StepTable } from './StepTable';

interface CalculatorViewProps {
  calcInput: string;
  setCalcInput: (val: string) => void;
  calcResult: LuhnCalculationResult;
  handleCalculate: (target?: string) => void;
  loadCalcPreset: (num: string) => void;
}

export function CalculatorView({
  calcInput,
  setCalcInput,
  calcResult,
  handleCalculate,
  loadCalcPreset
}: CalculatorViewProps) {
  return (
    <section className="card-panel">
      <div className="card-title">
        <Calculator className="text-purple-400" size={24} />
        Cálculo del Dígito Verificador (Dígito de Chequeo)
      </div>
      <p className="card-desc">
        Ingresa un número de cuenta o serie parcial. El algoritmo duplicará cada segundo dígito comenzando desde la derecha y calculará el dígito verificador.
      </p>

      <div className="input-group">
        <label className="input-label">Número de Cuenta / Tarjeta Parcial:</label>
        <div className="input-wrapper">
          <input 
            type="text" 
            className="custom-input" 
            value={calcInput}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/[^0-9-]/g, '');
              setCalcInput(sanitized);
              handleCalculate(sanitized);
            }}
            placeholder="Ej. 7992739871"
          />
          <button className="action-btn" onClick={() => handleCalculate()}>
            <RefreshCw size={18} /> Calcular
          </button>
        </div>
        <div className="preset-bar">
          <span className="preset-title">Ejemplos rápidos:</span>
          <button className="preset-chip" onClick={() => loadCalcPreset('7992739871')}>7992739871 (Ej. Guía)</button>
          <button className="preset-chip" onClick={() => loadCalcPreset('3247-4935-8587-883')}>3247-4935-8587-883</button>
          <button className="preset-chip" onClick={() => loadCalcPreset('6945-9273-832-414-3858-734-71')}>6945... (Largo)</button>
        </div>
      </div>

      {calcResult.cleanedInput.length > 0 ? (
        <div className="results-container">
          <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#c084fc" /> Procedimiento Paso a Paso (Tabla Módulo 10)
          </h3>

          <StepTable steps={calcResult.steps} totalSum={calcResult.totalSum} />

          <div className="math-grid">
            <div className="math-card">
              <div className="math-card-header">Suma Total de Dígitos (S)</div>
              <div className="math-expression">S = {calcResult.totalSum}</div>
              <div className="math-result">Suma: {calcResult.totalSum}</div>
            </div>

            <div className="math-card">
              <div className="math-card-header">Método 1: Multiplicación por 9</div>
              <div className="math-expression">({calcResult.totalSum} × 9) mod 10</div>
              <div className="math-expression">({calcResult.totalSum * 9}) mod 10 = {calcResult.method1Result}</div>
              <div className="math-result">Dígito = {calcResult.method1Result}</div>
            </div>

            <div className="math-card">
              <div className="math-card-header">Método 2: Resta del Módulo 10</div>
              <div className="math-expression">Unidades = {calcResult.unitDigit}</div>
              <div className="math-expression">(10 - {calcResult.unitDigit}) mod 10</div>
              <div className="math-result">Dígito = {calcResult.method2Result}</div>
            </div>
          </div>

          <div className="banner-box info">
            <div className="banner-left">
              <div className="banner-icon">
                <CreditCard size={28} />
              </div>
              <div>
                <div className="banner-title">Dígito Verificador Calculado: {calcResult.checkDigit}</div>
                <div className="banner-subtitle">
                  Número de cuenta completo generado: <strong className="mono" style={{ color: '#fbbf24' }}>{calcResult.fullNumber}</strong>
                </div>
              </div>
            </div>
            <div className="big-badge">{calcResult.checkDigit}</div>
          </div>
        </div>
      ) : (
        <p style={{ color: 'var(--text-dim)' }}>Por favor ingresa un número numérico válido.</p>
      )}
    </section>
  );
}
