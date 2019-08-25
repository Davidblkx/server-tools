export interface StringStore<T> {
  [key: string]: T | undefined;
}

export interface NumberStore<T> {
  [key: number]: T | undefined;
}

export interface EnumNumber {
  [index: number]: string;
  [key: string]: number|string;
}