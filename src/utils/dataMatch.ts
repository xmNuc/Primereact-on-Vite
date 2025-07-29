type DataRecord = {
  id: string;
  one_exp: string;
  name: string;
};

export const splitByExpMatch = (
  data: DataRecord[],
  exp_list: string[]
): { data_yes: string[]; data_no: string[] } => {
  const data_yes: string[] = [];
  const data_no: string[] = [];

  data.forEach((record) => {
    const hasMatch = exp_list.some((exp) => record.one_exp.includes(exp));

    if (hasMatch) {
      data_yes.push(record.id);
    } else {
      data_no.push(record.id);
    }
  });

  return { data_yes, data_no };
};
