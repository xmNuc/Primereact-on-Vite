import { exportToExcel } from './exportToExcel';

export const MyExportButton = ({ data }) => {
  const handleExport = () => {
    const locale = navigator.language || 'en-US'; // dynamicznie
    exportToExcel(data, locale);
  };

  return <button onClick={handleExport}>Eksportuj do Excela</button>;
};
