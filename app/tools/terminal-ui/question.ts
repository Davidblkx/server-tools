import * as logger from './logger.ts';

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

  const response = ''; // TODO: implement fn to load from stdIn
  

  return response || defaultValue;
}