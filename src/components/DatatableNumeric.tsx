import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MyTable = () => {
  const data = [
    { product: 'Laptop', price: 4599.99 },
    { product: 'Telefon', price: 2899.5 },
    { product: 'Monitor', price: 1090 },
  ];

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const numberBodyTemplate = (rowData) => {
    const value = rowData.price;
    return <div style={{ textAlign: 'right', width: '100%' }}>{formatNumber(value)}</div>;
  };

  return (
    <div className="card">
      <DataTable value={data}>
        <Column field="product" header="Produkt" />
        <Column
          field="price"
          header="Cena (PLN)"
          body={numberBodyTemplate}
          style={{ textAlign: 'right' }}
        />
      </DataTable>
    </div>
  );
};

export default MyTable;
