/**
 * Generates an Excel-compatible number format string based on locale and precision.
 *
 * @param locale - BCP 47 locale string (e.g., 'pl-PL', 'en-US')
 * @param fractionDigits - Number of decimal places (default: 2)
 * @returns Excel number format string (e.g., "# ##0,00" for pl-PL)
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
