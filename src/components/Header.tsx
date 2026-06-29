import { Cpu } from 'lucide-react';

export function Header() {
  return (
    <header className="app-header">
      <div className="brand-badge">
        <Cpu size={16} /> Hans Peter Luhn Algorithm (IBM)
      </div>
      <h1 className="app-title">Algoritmo de Luhn (Módulo 10)</h1>
      <p className="app-subtitle">
        Fórmula de suma de comprobación simple para la validación de tarjetas de crédito, números IMEI y datos bancarios confidenciales.
      </p>
      <div className="tech-tags">
        <span className="tag">ISO/IEC 7812-1</span>
        <span className="tag">Verificación Módulo 10</span>
        <span className="tag">Dígito de Chequeo</span>
        <span className="tag">Seguridad de Datos</span>
      </div>
    </header>
  );
}
