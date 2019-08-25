import { isEnumNumber } from '../tools/type-guards.ts';
import { EnumNumber } from './indexed.ts';

export class EnumNumberHandler {

  public readonly nameList: string[];

  protected constructor(
    public readonly source: EnumNumber,
  ) { this.nameList = this.buildReferences(source); }

  /** return Enum value referent to a position in text array */
  public getEnumValue(n: number) {
    return +this.source[this.nameList[n]];
  }

  /** return a index in text array referent to Enum value */
  public getIndexValue(n: number) {
    return this.nameList.indexOf(this.source[n]);
  }

  public static from<T>(data: T) {
    if (isEnumNumber(data)) {
      return new EnumNumberHandler(data);
    }

    throw new Error('Input data is not a valid Enum!');
  }

  private buildReferences(data: EnumNumber): string[] {
    const list: string[] = [];

    for (const key of Reflect.ownKeys(data)) {
      if (
        typeof key !== 'symbol'
        && !Number.isNaN(+key))
        list.push(data[+key]);
    }

    return list;
  }
}