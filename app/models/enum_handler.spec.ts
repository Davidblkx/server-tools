import { assertEqual } from '../tools/tests/assert.ts';
import { EnumNumberHandler } from './enum_handler.ts';

enum TestValidEnum {
  data1 = 0,
  data2 = 1,
  data3 = 2,
  exit = 99,
}

export async function test() {
  const value = testConstrutor(TestValidEnum);
  testNumberReference(value);

  try {
    EnumNumberHandler.from({0: 'data0', 1: 'data1', data0: 0})
    return [false, 'Error: exception not thrown on invalid enum']
  } catch {}

  return [true, 'success']
}

function testConstrutor(data: any) {
  try {
    return EnumNumberHandler.from(data);
  } catch { throw [false, 'Error runing constructor from Enum']; }
}

function testNumberReference(e: EnumNumberHandler) {
  assertEqual(TestValidEnum.exit, e.getEnumValue(3));
  assertEqual(3, e.getIndexValue(TestValidEnum.exit));
}