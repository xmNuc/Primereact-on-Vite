import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface ExportRow {
  [key: string]: string | number | null;
}

const numericFields = ['Price', 'Quantity', 'Total'];

// Mapa locale → Excel number format
const getExcelNumberFormatByLocale = (locale: string): string => {
  const formats: Record<string, string> = {
    'pl-PL': '# ##0,00', // 1 234,56
    'en-US': '#,##0.00', // 1,234.56
    'de-DE': '#.##0,00', // 1.234,56
    'fr-FR': '# ##0,00', // 1 234,56
    'ru-RU': '# ##0,00', // 1 234,56
    'es-ES': '#.##0,00', // 1.234,56
    'it-IT': '#.##0,00', // 1.234,56
    'ja-JP': '#,##0.00', // 1,234.56
  };
  return formats[locale] || '#,##0.00';
};

export const exportToExcel = async (data: ExportRow[], locale: string = 'pl-PL') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Eksport');

  const numberFormat = getExcelNumberFormatByLocale(locale);

  const allKeys = Object.keys(data[0] || {});
  worksheet.columns = allKeys.map((key) => ({
    header: key,
    key,
    width: 20,
    style: numericFields.includes(key) ? { numFmt: numberFormat } : {},
  }));

  data.forEach((row) => {
    const formattedRow: ExportRow = {};

    allKeys.forEach((key) => {
      const value = row[key];

      if (numericFields.includes(key) && typeof value === 'string') {
        const parsed = parseFloat(value.replace(',', '.'));
        formattedRow[key] = isNaN(parsed) ? null : parsed;
      } else {
        formattedRow[key] = value;
      }
    });

    worksheet.addRow(formattedRow);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'eksport.xlsx');
};
