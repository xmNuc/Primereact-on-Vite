function sortObjectsArray<T extends Record<string, string | number | null>>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return array.sort((a, b) => {
    if (a[key] == null) return order === 'asc' ? 1 : -1;
    if (b[key] == null) return order === 'asc' ? -1 : 1;

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    }

    return order === 'asc'
      ? (a[key] as number) - (b[key] as number)
      : (b[key] as number) - (a[key] as number);
  });
}

const data = [
  { name: 'Anna', age: 25 },
  { name: 'John', age: 30 },
  { name: 'Zara', age: 22 },
  { name: null, age: 40 },
];

console.log(sortObjectsArray(data, 'age', 'asc'));
console.log(sortObjectsArray(data, 'name', 'desc'));
