import ExcelJS from 'exceljs';
import { omit } from 'lodash';
import { saveBlobAsFile } from './saveBlobAsFile';
import { getExcelNumberFormatByLocale } from './getExcelNumberFormatByLocale';

type ExportRow = Record<string, string | number | null | undefined>;

/**
 * Exports structured data to an Excel file with localized numeric formatting.
 *
 * @param options.data - Data to export
 * @param options.filename - Desired filename (default: "export.xlsx")
 * @param options.numericFields - Keys to treat as numeric (optional)
 * @param options.locale - Number formatting locale (default: browser)
 * @param options.fractionDigits - Decimal precision (default: 2)
 * @param options.omitFields - Keys to exclude from output (optional)
 */
export const exportToExcel = async ({
  data,
  filename = 'export.xlsx',
  numericFields,
  locale = navigator.language || 'en-US',
  fractionDigits = 2,
  omitFields = ['id', 'lastEntry'],
}: {
  data: ExportRow[];
  filename?: string;
  numericFields?: string[];
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

  worksheet.columns = allKeys.map((key) => ({
    header: key,
    key: key,
    width: 20,
    style: numericFields?.includes(key) && numberFormat ? { numFmt: numberFormat } : {},
  }));

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
