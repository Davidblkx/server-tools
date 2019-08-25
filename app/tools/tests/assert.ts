export function assertEqual<T>(expected: T, actual: T, errorMessage: string = '') {
  const result = actual === expected;
  if (result) return true;

  const err = `Expecting ${expected}, but got ${actual}: ` + errorMessage;
  throw [false, err];
}