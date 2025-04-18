import { formatTimeString } from './formatTimeString';

describe('formatTimeString', () => {
  const originalTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  beforeAll(() => {
    // Ustawiamy stałą strefę czasową na potrzeby testów
    jest
      .spyOn(Intl.DateTimeFormat().resolvedOptions(), 'timeZone', 'get')
      .mockReturnValue('Europe/Warsaw');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return correct local time in winter (CET)', () => {
    const result = formatTimeString('10:00:00', '2024-12-10');
    // 10:00 UTC +1h CET = 11:00
    expect(result).toBe('11:00');
  });

  it('should return correct local time in summer (CEST)', () => {
    const result = formatTimeString('10:00:00', '2024-07-15');
    // 10:00 UTC +2h CEST = 12:00
    expect(result).toBe('12:00');
  });

  it('should handle Date object input (winter)', () => {
    const result = formatTimeString('10:00:00', new Date('2024-12-10'));
    expect(result).toBe('11:00');
  });

  it('should handle Date object input (summer)', () => {
    const result = formatTimeString('10:00:00', new Date('2024-07-15'));
    expect(result).toBe('12:00');
  });

  it('should work for midnight UTC', () => {
    const result = formatTimeString('00:00:00', '2024-12-10'); // Zima
    expect(result).toBe('01:00');
  });
});
