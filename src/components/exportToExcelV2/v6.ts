// Locale → Excel number format
export const getExcelNumberFormatByLocale = (locale: string): string => {
  const formats: Record<string, string> = {
    // Europe
    'pl-PL': '# ##0,00', // 1 234,56
    'de-DE': '#.##0,00', // 1.234,56
    'fr-FR': '# ##0,00', // 1 234,56
    'es-ES': '#.##0,00', // 1.234,56
    'it-IT': '#.##0,00', // 1.234,56
    'nl-NL': '#.##0,00', // 1.234,56
    'pt-PT': '# ##0,00', // 1 234,56
    'cs-CZ': '# ##0,00', // 1 234,56
    'hu-HU': '# ##0,00', // 1 234,56
    'ro-RO': '#.##0,00', // 1.234,56

    // Americas
    'en-US': '#,##0.00', // 1,234.56
    'en-CA': '#,##0.00', // 1,234.56
    'fr-CA': '# ##0,00', // 1 234,56
    'es-MX': '#,##0.00', // 1,234.56
    'pt-BR': '#.##0,00', // 1.234,56

    // Asia
    'ja-JP': '#,##0.00', // 1,234.56
    'zh-CN': '#,##0.00', // 1,234.56
    'ko-KR': '#,##0.00', // 1,234.56
    'hi-IN': '#,##,##0.00', // 12,34,567.89 – Indian number system
    'th-TH': '#,##0.00', // 1,234.56

    // Eastern Europe & Russia
    'ru-RU': '# ##0,00', // 1 234,56
    'uk-UA': '# ##0,00', // 1 234,56
    'bg-BG': '# ##0,00', // 1 234,56

    // Middle East
    'tr-TR': '# ##0,00', // 1 234,56
    'ar-SA': '#,##0.00', // ١٬٢٣٤٫٥٦ (Excel handles Arabic numerals separately)

    // Fallback
    default: '#,##0.00',
  };

  return formats[locale] || formats['default'];
};
