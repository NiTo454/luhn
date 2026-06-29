import { useState } from 'react';
import {
  calculateLuhnCheckDigit,
  validateLuhnNumber
} from '../utils/luhn';
import type {
  LuhnCalculationResult,
  LuhnValidationResult
} from '../utils/luhn';

export type TabType = 'calc' | 'val' | 'part3' | 'theory';

export function useLuhnApp() {
  const [activeTab, setActiveTab] = useState<TabType>('calc');

  // State for Calculator
  const [calcInput, setCalcInput] = useState<string>('7992739871');
  const [calcResult, setCalcResult] = useState<LuhnCalculationResult>(() =>
    calculateLuhnCheckDigit('7992739871')
  );

  // State for Validator
  const [valInput, setValInput] = useState<string>('5262-3656-4154-29262');
  const [valResult, setValResult] = useState<LuhnValidationResult>(() =>
    validateLuhnNumber('5262-3656-4154-29262')
  );

  const handleCalculate = (strToCalc?: string) => {
    const target = strToCalc !== undefined ? strToCalc : calcInput;
    setCalcResult(calculateLuhnCheckDigit(target));
  };

  const handleValidate = (strToVal?: string) => {
    const target = strToVal !== undefined ? strToVal : valInput;
    setValResult(validateLuhnNumber(target));
  };

  const loadCalcPreset = (num: string) => {
    setCalcInput(num);
    handleCalculate(num);
    setActiveTab('calc');
  };

  const loadValPreset = (num: string) => {
    setValInput(num);
    handleValidate(num);
    setActiveTab('val');
  };

  return {
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
  };
}
