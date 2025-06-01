// Utility to omit specified fields from an object or array of objects
export function omitFields<T extends object>(obj: T, fields: (keyof T)[]): Partial<T> {
  const result = { ...obj };
  for (const field of fields) {
    delete result[field];
  }
  return result;
}

export function omitFieldsFromArray<T extends object>(arr: T[], fields: (keyof T)[]): Partial<T>[] {
  return arr.map((item) => omitFields(item, fields));
}
