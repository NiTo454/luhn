import type { LuhnStep } from '../utils/luhn';

interface StepTableProps {
  steps: LuhnStep[];
  isValidation?: boolean;
  totalSum: number;
}

export function StepTable({ steps, isValidation = false, totalSum }: StepTableProps) {
  return (
    <div className="table-wrapper">
      <table className="luhn-table">
        <thead>
          <tr>
            <th className="header-col">{isValidation ? 'Posición' : 'Operación'}</th>
            {steps.map((_, idx) => (
              <th 
                key={idx} 
                className={isValidation && idx === steps.length - 1 ? 'cell-check' : ''}
              >
                {isValidation && idx === steps.length - 1 ? 'Check (x)' : `D${idx + 1}`}
              </th>
            ))}
            {!isValidation && <th className="cell-check">x</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="header-col">{isValidation ? 'Dígito ingresado' : 'Dígitos del número'}</td>
            {steps.map((s, idx) => (
              <td 
                key={idx} 
                className={`cell-digit ${isValidation && idx === steps.length - 1 ? 'cell-check' : ''}`}
              >
                {s.digit}
              </td>
            ))}
            {!isValidation && <td className="cell-check">x</td>}
          </tr>
          <tr>
            <td className="header-col">Duplicación (←)</td>
            {steps.map((s, idx) => (
              <td 
                key={idx} 
                className={`cell-doubled ${s.isDoubled ? 'highlight' : ''} ${isValidation && idx === steps.length - 1 ? 'cell-check' : ''}`}
              >
                {s.doubledValue}
              </td>
            ))}
            {!isValidation && <td className="cell-check">x</td>}
          </tr>
          <tr>
            <td className="header-col">Suma individual</td>
            {steps.map((s, idx) => (
              <td 
                key={idx} 
                className={`cell-sum ${isValidation && idx === steps.length - 1 ? 'cell-check' : ''}`}
              >
                {s.sumExpression}
              </td>
            ))}
            {!isValidation && <td className="cell-check">= {totalSum}</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
