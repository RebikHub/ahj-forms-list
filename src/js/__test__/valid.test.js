import { validationTitle, validationPrice } from '../valid';

test.each([
  ['validate input-text', 'text', true],
  ['not-valid input-text', null, false],
])(('it should be %s'), (_, input, expected) => {
  expect(validationTitle(input)).toBe(expected);
});

test.each([
  ['valid input-number', 34, true],
  ['not-valid input-number', 0, false],
])(('it should be %s'), (_, input, expected) => {
  expect(validationPrice(input)).toBe(expected);
});
