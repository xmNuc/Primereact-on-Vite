export const getExcelNumberFormatByLocale = (
  locale: string,
  maxFractionDigits: number = 5
): string => {
  const testNumber = 1234567.89;

  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: maxFractionDigits,
  }).format(testNumber);

  const decimalMatch = formatted.match(/(\D)\d{2}$/);
  const decimalSeparator = decimalMatch ? decimalMatch[1] : '.';

  const thousandsMatch = formatted.match(/(\D)\d{3}\D?\d{2}$/);
  const thousandsSeparator =
    thousandsMatch && thousandsMatch[1] !== decimalSeparator ? thousandsMatch[1] : '';

  const hasDecimalPart = maxFractionDigits > 0;
  const decimalPart = hasDecimalPart ? `${decimalSeparator}${'#'.repeat(maxFractionDigits)}` : '';

  const integerPart = thousandsSeparator ? `#${thousandsSeparator}##0` : `##0`;

  let numFmt = `${integerPart}${decimalPart}`;

  if (hasDecimalPart && numFmt.endsWith(decimalSeparator)) {
    numFmt = numFmt.slice(0, -1);
  }

  return numFmt;
};
