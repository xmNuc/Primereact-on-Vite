const customSort = (event) => {
  const sorted = [...event.data];

  sorted.sort((a, b) => {
    if (a.bx === 100 && b.bx !== 100) return -1;
    if (b.bx === 100 && a.bx !== 100) return 1;

    if (a.ItemName === 'Bank' && b.ItemName !== 'Bank') return -1;
    if (b.ItemName === 'Bank' && a.ItemName !== 'Bank') return 1;

    if (a.ItemName === 'Ase' && b.ItemName !== 'Ase') return -1;
    if (b.ItemName === 'Ase' && a.ItemName !== 'Ase') return 1;

    return a.ItemName.localeCompare(b.ItemName);
  });

  setData(sorted);
};
