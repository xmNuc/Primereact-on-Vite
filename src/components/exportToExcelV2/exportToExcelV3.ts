import ExcelJS from 'exceljs';
import { omit } from 'lodash';
import { saveBlobAsFile } from './saveBlobAsFile';
import { getExcelNumberFormatByLocale } from './getExcelNumberFormatByLocale';

type ExportRow = Record<string, string | number | null | undefined>;

export const exportToExcel = async ({
  data,
  filename = 'export.xlsx',
  numericFields,
  textFields,
  locale = navigator.language || 'en-US',
  fractionDigits = 2,
  omitFields = ['id', 'lastEntry'],
}: {
  data: ExportRow[];
  filename?: string;
  numericFields?: string[];
  textFields?: string[];
  locale?: string;
  fractionDigits?: number;
  omitFields?: string[];
}): Promise<void> => {
  if (!data || data.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Export');

  const filteredData = data.map((row) => omit(row, omitFields));
  const allKeys = Object.keys(filteredData[0]);

  const numberFormat =
    numericFields?.length && locale
      ? getExcelNumberFormatByLocale(locale, fractionDigits)
      : undefined;

  worksheet.columns = allKeys.map((key) => {
    const isNumeric = numericFields?.includes(key);
    const isText = textFields?.includes(key);
    let style = {};

    if (isNumeric && numberFormat) {
      style = { numFmt: numberFormat };
    } else if (isText) {
      style = { numFmt: '@' }; // Excel format for text
    }

    return {
      header: key,
      key: key,
      width: 20,
      style,
    };
  });

  filteredData.forEach((row) => {
    const newRow: Record<string, any> = {};

    for (const key of allKeys) {
      const value = row[key];

      if (numericFields?.includes(key)) {
        if (typeof value === 'string') {
          const parsed = parseFloat(value.replace(',', '.'));
          newRow[key] = isNaN(parsed) ? null : parsed;
        } else {
          newRow[key] = value;
        }
      } else if (textFields?.includes(key)) {
        newRow[key] = value != null ? String(value) : '';
      } else {
        newRow[key] = value;
      }
    }

    worksheet.addRow(newRow);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveBlobAsFile(blob, filename);
};
