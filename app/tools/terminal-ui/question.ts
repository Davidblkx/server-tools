import * as logger from './logger.ts';
import { readLine } from './read_line.ts';

export async function question(
  message: string,
  options: string[] = [],
  defaultValue: string = '',
  level: logger.LogLevel = 'debug'
): Promise<string> {
  const txtOptions = options.length ? ` [${options.join(';')}]` : '';
  const txtDefault = defaultValue ? ` (${defaultValue})` : '';
  const txtMessage = message + txtOptions + txtDefault;

  logger.log(txtMessage, level);

  const response = await readLine();
  

  return response || defaultValue;
}