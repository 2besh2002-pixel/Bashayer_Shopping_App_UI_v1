import { convertFromSar, formatPrice } from '../src/utils/currency';

test('converts SAR to USD', () => {
  const v = convertFromSar(100, 'USD');
  expect(v).toBeCloseTo(26.66, 2);
});

test('formats SAR price in SAR', () => {
  expect(formatPrice(100, 'en', 'SAR')).toContain('100');
});

test('converts back to the original SAR amount', () => {
  expect(convertFromSar(429, 'SAR')).toBe(429);
});