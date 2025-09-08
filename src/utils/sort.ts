const customSort = (event) => {
  let sorted = [...event.data];

  sorted.sort((a, b) => {
    // 1. Rekord z bx === 100 zawsze pierwszy
    if (a.bx === 100 && b.bx !== 100) return -1;
    if (b.bx === 100 && a.bx !== 100) return 1;

    // 2. Rekord z ItemName === "Bank" zaraz po bx=100
    if (a.ItemName === 'Bank' && b.ItemName !== 'Bank') return -1;
    if (b.ItemName === 'Bank' && a.ItemName !== 'Bank') return 1;

    // 3. Rekord z ItemName === "Ase" zaraz po Bank
    if (a.ItemName === 'Ase' && b.ItemName !== 'Ase') return -1;
    if (b.ItemName === 'Ase' && a.ItemName !== 'Ase') return 1;

    // 4. Reszta alfabetycznie po ItemName
    return a.ItemName.localeCompare(b.ItemName);
  });

  setData(sorted);
};
