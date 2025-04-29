const arr1 = [
  { field: 'asd', id: 'asdaasdasda', header: 'ASD' },
  { field: 'bsd', id: 'asdasfgfnvdasda', header: 'BSD_1' },
  { field: 'csd', id: 'csdcsdcsdcsd24', header: 'CSD_3' },
];

const excluded = ['asd', 'csd'];

type Accumulator = {
  fields: string[];
  headers: string[];
};

const { fields, headers } = arr1.reduce<Accumulator>(
  (acc, item) => {
    if (!excluded.includes(item.field)) {
      acc.fields.push(item.field);
      acc.headers.push(item.header);
    }
    return acc;
  },
  { fields: [], headers: [] }
);

console.log(fields); // ['bsd']
console.log(headers); // ['BSD_1']

const filtered = arr1.filter((item) => !excluded.includes(item.field));

const fields = filtered.map((item) => item.field);
const headers = filtered.map((item) => item.header);
