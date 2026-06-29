export interface LuhnStep {
  digit: number;
  originalIndex: number;
  isDoubled: boolean;
  doubledValue: number;
  sumExpression: string;
  finalValue: number;
}

export interface LuhnCalculationResult {
  rawInput: string;
  cleanedInput: string;
  steps: LuhnStep[];
  totalSum: number;
  checkDigit: number;
  method1Result: number;
  method2Result: number;
  unitDigit: number;
  fullNumber: string;
}

export interface LuhnValidationResult {
  rawInput: string;
  cleanedInput: string;
  payload: string;
  providedCheckDigit: number;
  calculatedCheckDigit: number;
  steps: LuhnStep[];
  totalSum: number;
  isValid: boolean;
}

export function cleanNumberString(str: string): string {
  return str.replace(/[^0-9]/g, '');
}

/**
 * Calcula el dígito verificador para una secuencia numérica.
 */
export function calculateLuhnCheckDigit(input: string): LuhnCalculationResult {
  const cleaned = cleanNumberString(input);
  const digits = cleaned.split('').map(Number);
  const steps: LuhnStep[] = [];
  let totalSum = 0;

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const indexFromRight = digits.length - 1 - i;
    const isDoubled = indexFromRight % 2 === 0;

    let doubledValue = digit;
    let finalValue = digit;
    let sumExpression = `${digit}`;

    if (isDoubled) {
      doubledValue = digit * 2;
      if (doubledValue >= 10) {
        const d1 = Math.floor(doubledValue / 10);
        const d2 = doubledValue % 10;
        finalValue = d1 + d2;
        sumExpression = `${d1}+${d2}`;
      } else {
        finalValue = doubledValue;
        sumExpression = `${doubledValue}`;
      }
    }

    totalSum += finalValue;

    steps.push({
      digit,
      originalIndex: i,
      isDoubled,
      doubledValue,
      sumExpression,
      finalValue
    });
  }

  const unitDigit = totalSum % 10;
  const method1Result = (totalSum * 9) % 10;
  const method2Result = (10 - unitDigit) % 10;
  const checkDigit = method1Result;

  return {
    rawInput: input,
    cleanedInput: cleaned,
    steps,
    totalSum,
    checkDigit,
    method1Result,
    method2Result,
    unitDigit,
    fullNumber: cleaned + checkDigit
  };
}

/**
 * Valida un número completo comprobando la congruencia módulo 10.
 */
export function validateLuhnNumber(input: string): LuhnValidationResult {
  const cleaned = cleanNumberString(input);
  if (cleaned.length === 0) {
    return {
      rawInput: input,
      cleanedInput: '',
      payload: '',
      providedCheckDigit: 0,
      calculatedCheckDigit: 0,
      steps: [],
      totalSum: 0,
      isValid: false
    };
  }

  const payload = cleaned.slice(0, -1);
  const providedCheckDigit = parseInt(cleaned.slice(-1), 10);
  const calcRes = calculateLuhnCheckDigit(payload);

  const digits = cleaned.split('').map(Number);
  const steps: LuhnStep[] = [];
  let totalSum = 0;

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const indexFromRight = digits.length - 1 - i;
    const isDoubled = indexFromRight % 2 === 1;

    let doubledValue = digit;
    let finalValue = digit;
    let sumExpression = `${digit}`;

    if (isDoubled) {
      doubledValue = digit * 2;
      if (doubledValue >= 10) {
        const d1 = Math.floor(doubledValue / 10);
        const d2 = doubledValue % 10;
        finalValue = d1 + d2;
        sumExpression = `${d1}+${d2}`;
      } else {
        finalValue = doubledValue;
        sumExpression = `${doubledValue}`;
      }
    }

    totalSum += finalValue;

    steps.push({
      digit,
      originalIndex: i,
      isDoubled,
      doubledValue,
      sumExpression,
      finalValue
    });
  }

  return {
    rawInput: input,
    cleanedInput: cleaned,
    payload,
    providedCheckDigit,
    calculatedCheckDigit: calcRes.checkDigit,
    steps,
    totalSum,
    isValid: totalSum % 10 === 0
  };
}
