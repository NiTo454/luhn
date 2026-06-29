import { ListCheck, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';

const PART_3_CALCS = [
  { input: '3247-4935-8587-883', checkDigit: 2, full: '3247-4935-8587-8832' },
  { input: '8985-6319-4884-265', checkDigit: 7, full: '8985-6319-4884-2657' },
  { input: '6656-7674-9731-285', checkDigit: 8, full: '6656-7674-9731-2858' },
  { input: '29-967-14', checkDigit: 8, full: '29-967-148' },
  { input: '64-788-46', checkDigit: 6, full: '64-788-466' },
  { input: '6945-9273-832-414-3858-734-71', checkDigit: 4, full: '6945-9273-832-414-3858-734-714' }
];

const PART_3_VALS = [
  { input: '5262-3656-4154-29262', isValid: true, sum: 70, expectedCheck: 2 },
  { input: '6857-9539-8377-36527', isValid: false, sum: 93, expectedCheck: 4 },
  { input: '5975-5954-9975-19711', isValid: false, sum: 95, expectedCheck: 6 },
  { input: '91-523-9855', isValid: false, sum: 46, expectedCheck: 9 },
  { input: '59-425-2722', isValid: false, sum: 44, expectedCheck: 8 },
  { input: '7351-7325-627-553-3668-221-3422', isValid: false, sum: 107, expectedCheck: 5 }
];

interface Part3ViewProps {
  loadCalcPreset: (num: string) => void;
  loadValPreset: (num: string) => void;
}

export function Part3View({ loadCalcPreset, loadValPreset }: Part3ViewProps) {
  return (
    <section className="card-panel">
      <div className="card-title">
        <ListCheck className="text-amber-400" size={24} />
        Resolución de Ejercicios - Parte III
      </div>
      <p className="card-desc">
        Resultados completos y verificaciones automáticas para todos los ejercicios solicitados en la Parte III de la práctica. Haz clic en el botón "Paso a paso" para explorar cualquiera en la interfaz interactiva.
      </p>

      <div className="part3-grid">
        {/* Subsection 1 */}
        <div>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={18} /> 1. Cálculo del Dígito Verificador (x)
          </h3>
          {PART_3_CALCS.map((item, idx) => (
            <div className="exercise-card" key={idx}>
              <div>
                <div className="ex-num">{item.input}?</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Completo: <span className="mono" style={{ color: '#34d399' }}>{item.full}</span>
                </div>
              </div>
              <div className="ex-result">
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }} className="mono">
                  x = {item.checkDigit}
                </span>
                <button className="mini-btn" onClick={() => loadCalcPreset(item.input)}>
                  Paso a paso <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subsection 2 */}
        <div>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} /> 2. Verificación de Números de Tarjeta
          </h3>
          {PART_3_VALS.map((item, idx) => (
            <div className="exercise-card" key={idx}>
              <div>
                <div className="ex-num" style={{ fontSize: '0.95rem' }}>{item.input}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Suma: {item.sum} {item.isValid ? '(Mod 10 = 0)' : `(Esperado x=${item.expectedCheck})`}
                </div>
              </div>
              <div className="ex-result">
                {item.isValid ? (
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                    Correcto
                  </span>
                ) : (
                  <span style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                    Incorrecto
                  </span>
                )}
                <button className="mini-btn" onClick={() => loadValPreset(item.input)}>
                  Validar <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
