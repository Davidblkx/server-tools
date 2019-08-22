import { blue, green, red, yellow } from 'https://deno.land/std/colors/mod.ts';

export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'success';

const colorMapping: { [key in LogLevel]: ((e: string) => any) | undefined } = {
  debug: e => e,
  error: red,
  info: blue,
  warning: yellow,
  success: green,
}

export function log(message: string, level: LogLevel = 'debug', ...extras: any[]) {
  console.log(colorMapping[level](message), ...extras)
}

export function debug(message: string, ...extras: any[]) {
  log(message, 'debug', ...extras);
}

export function info(message: string, ...extras: any[]) {
  log(message, 'info', ...extras);
}

export function warning(message: string, ...extras: any[]) {
  log(message, 'warning', ...extras);
}

export function error(message: string, ...extras: any[]) {
  log(message, 'error', ...extras);
}

export function success(message: string, ...extras: any[]) {
  log(message, 'success', ...extras);
}