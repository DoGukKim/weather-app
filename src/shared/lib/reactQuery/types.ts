export interface QueryKeyFactory {
  [key: PropertyKey]: readonly any[] | ((...args: any[]) => readonly any[]);
}
