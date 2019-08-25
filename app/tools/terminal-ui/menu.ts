import { EnumNumberHandler } from '../../models/enum_handler.ts';
import * as logger from './logger.ts';
import { readLine } from './read_line.ts';

export async function showMenu(
  options: string[],
  title: string = '',
  defaultValue: number = NaN,
  level: logger.LogLevel = 'debug'
): Promise<number> {
  const txtDefault = (!Number.isNaN(defaultValue)) ? ` (${defaultValue})` : '';
  const txtMessage = (title || 'select option:') + txtDefault;

  const linesToPrint: string[] = [
    txtMessage,
    ...options.map((m, i) => `  ${i}) ${m}`)
  ]

  logger.log(linesToPrint.join('\n'), level);

  const min = 0;
  const max = (options.length || 1) - 1;
  let res = NaN;

  while(isNaN(res)) {
    const line = await readLine();
    res = line.length ? Number(line) : defaultValue;

    if (isNaN(res) || !isFinite(res) || res < min || res > max) {
      logger.error(`Please select a value between ${min} and ${max}:`)
      res = NaN;
    } else {
      return res;
    }
  }
}

export async function showEnumMenu<T>(
  options: T,
  title: string = '',
  defaultValue: number = 0,
  level: logger.LogLevel = 'debug',
): Promise<number> {
  const handler = EnumNumberHandler.from(options);
  const result = await showMenu(
    handler.nameList,
    title,
    handler.getIndexValue(defaultValue),
    level
  );
  return <any>handler.getEnumValue(result);
}