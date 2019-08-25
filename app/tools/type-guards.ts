import { EnumNumber } from '../models/indexed.ts';

export function isEnumNumber(input: unknown): input is EnumNumber {
  if (typeof input !== 'object' || input === null) return false;
  
  for (const key of Reflect.ownKeys(input)) {
    if (
      typeof key !== 'symbol'
      && !Number.isNaN(+key)
    ) {
      const value = input[key];
      if (typeof value !== 'string') return false;
      if (input[value] !== +key) return false;
    }
  }

  return true;
}