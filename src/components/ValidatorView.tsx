import { ShieldCheck, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import type { LuhnValidationResult } from '../utils/luhn';
import { StepTable } from './StepTable';

interface ValidatorViewProps {
  valInput: string;
  setValInput: (val: string) => void;
  valResult: LuhnValidationResult;
  handleValidate: (target?: string) => void;
  loadValPreset: (num: string) => void;
}

export function ValidatorView({
  valInput,
  setValInput,
  valResult,
  handleValidate,
  loadValPreset
}: ValidatorViewProps) {
  return (
    <section className="card-panel">
      <div className="card-title">
        <ShieldCheck className="text-emerald-400" size={24} />
        Validación de Número Completo con Dígito de Chequeo
      </div>
      <p className="card-desc">
        Ingresa un número completo (incluyendo el último dígito verificador). El algoritmo validará si la suma total módulo 10 es exactamente 0.
      </p>

      <div className="input-group">
        <label className="input-label">Número Completo a Validar:</label>
        <div className="input-wrapper">
          <input 
            type="text" 
            className="custom-input" 
            value={valInput}
            onChange={(e) => {
              setValInput(e.target.value);
              handleValidate(e.target.value);
            }}
            placeholder="Ej. 5262-3656-4154-29262"
          />
          <button className="action-btn" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }} onClick={() => handleValidate()}>
            <ShieldCheck size={18} /> Validar Número
          </button>
        </div>
        <div className="preset-bar">
          <span className="preset-title">Cargar de Parte III:</span>
          <button className="preset-chip" onClick={() => loadValPreset('5262-3656-4154-29262')}>5262... (Válido)</button>
          <button className="preset-chip" onClick={() => loadValPreset('6857-9539-8377-36527')}>6857... (Inválido)</button>
          <button className="preset-chip" onClick={() => loadValPreset('7351-7325-627-553-3668-221-3422')}>7351... (Inválido)</button>
        </div>
      </div>

      {valResult.cleanedInput.length > 0 ? (
        <div className="results-container">
          <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#34d399" /> Verificación del Algoritmo Completo
          </h3>

          <StepTable steps={valResult.steps} isValidation totalSum={valResult.totalSum} />

          <div className="math-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="math-card">
              <div className="math-card-header">Suma Total Incluyendo Dígito Verificador</div>
              <div className="math-expression">Suma Total = {valResult.totalSum}</div>
              <div className="math-expression">{valResult.totalSum} mod 10 = {valResult.totalSum % 10}</div>
            </div>

            <div className="math-card">
              <div className="math-card-header">Comparación de Dígitos de Control</div>
              <div className="math-expression">Dígito en el número: {valResult.providedCheckDigit}</div>
              <div className="math-expression">Dígito esperado (calculado): {valResult.calculatedCheckDigit}</div>
            </div>
          </div>

          {valResult.isValid ? (
            <div className="banner-box success">
              <div className="banner-left">
                <div className="banner-icon">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <div className="banner-title">¡Número VÁLIDO según el Algoritmo de Luhn!</div>
                  <div className="banner-subtitle">La suma total de los dígitos es {valResult.totalSum}, cuyo módulo 10 es exactamente 0.</div>
                </div>
              </div>
              <div className="big-badge">VÁLIDO</div>
            </div>
          ) : (
            <div className="banner-box error">
              <div className="banner-left">
                <div className="banner-icon">
                  <XCircle size={32} />
                </div>
                <div>
                  <div className="banner-title">Número INCORRECTO / INVÁLIDO</div>
                  <div className="banner-subtitle">
                    La suma total es {valResult.totalSum} (módulo 10 = {valResult.totalSum % 10}). Contiene el dígito verificador <strong style={{color:'#fff'}}>{valResult.providedCheckDigit}</strong> pero el correcto debería ser <strong style={{color:'#fef08a'}}>{valResult.calculatedCheckDigit}</strong>.
                  </div>
                </div>
              </div>
              <div className="big-badge">INVÁLIDO</div>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: 'var(--text-dim)' }}>Ingresa un número para comenzar la verificación.</p>
      )}
    </section>
  );
}
