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

  return formats[locale] || '#,##0.00'; // fallback (US)
};

function getNumFmtFromLocale(locale) {
  const number = 1234567.89;
  const formatted = new Intl.NumberFormat(locale).format(number);

  const groupSep = formatted.match(/(\D)\d{3}\D/)[1];
  const decimalSep = formatted.match(/(\D)\d{2}$/)[1];

  // Excel numFmt: używamy separatorów
  return `#${groupSep}##0${decimalSep}00`;
}
