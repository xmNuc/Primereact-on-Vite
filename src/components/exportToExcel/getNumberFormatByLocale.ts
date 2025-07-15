/**
 * Generates an Excel-compatible number format string (`numFmt`) based on the specified locale.
 * This format string can be used with libraries like `exceljs` to display numbers
 * according to the local conventions for thousand separators and decimal marks.
 *
 * The function preserves the numeric type of the data (does not convert numbers to strings),
 * allowing Excel to treat the values as actual numbers for sorting, filtering, and calculations.
 *
 * @param {string} locale - A BCP 47 language tag (e.g. "en-US", "pl-PL", "de-DE").
 * @param {number} [fractionDigits=2] - Number of decimal places to display.
 *                                       The output format will have this fixed number of decimal digits.
 *
 * @returns {string} - An Excel number format string (e.g. "#,##0.00" for "en-US", "# ##0,00" for "pl-PL").
 *
 * @example
 * // For US English, 2 decimal places:
 * getExcelNumberFormatByLocale('en-US', 2); // returns "#,##0.00"
 *
 * @example
 * // For Polish, 0 decimal places:
 * getExcelNumberFormatByLocale('pl-PL', 0); // returns "# ##0"
 */

export const getExcelNumberFormatByLocale = (
  locale: string,
  fractionDigits: number = 2
): string => {
  const testNumber = 1234567.89;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(testNumber);

  const decimalMatch = formatted.match(/(\D)\d{2}$/);
  const decimalSeparator = decimalMatch ? decimalMatch[1] : '.';

  const thousandsMatch = formatted.match(/(\D)\d{3}\D?\d{2}$/);
  const thousandsSeparator =
    thousandsMatch && thousandsMatch[1] !== decimalSeparator ? thousandsMatch[1] : '';

  const decimals = '0'.repeat(fractionDigits);

  const numFmt = [
    '#',
    thousandsSeparator ? thousandsSeparator + '##0' : '##0',
    fractionDigits > 0 ? decimalSeparator + decimals : '',
  ].join('');

  return numFmt;
};
