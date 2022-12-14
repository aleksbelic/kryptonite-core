import {ALPHABET_EN, ASCII_PRINTABLE_SPECIAL, DIGITS} from '../src/globals.js';
import {
  checkAlphabet,
  getMapKeyByValue,
  getRandomAsciiChar,
  getShiftedChar,
  getUniqueCharsFromText,
  isUpperCase,
} from '../src/helpers.js';

describe('Helper functions', () => {
  test('Is upper case', () => {
    expect(isUpperCase('a')).toEqual(false);
    expect(isUpperCase('A')).toEqual(true);
    expect(isUpperCase('abc')).toEqual(false);
    expect(isUpperCase('ABC')).toEqual(true);
    expect(isUpperCase('aBc')).toEqual(false);
  });

  test('Get map key by value - undefined', () => {
    const testMap: Map<string, string> = new Map([
      ['a', 'alpha'],
      ['b', 'beta'],
    ]);
    expect(getMapKeyByValue(testMap, 'alpha')).toEqual('a');
    expect(getMapKeyByValue(testMap, 'gama')).toBeUndefined();
  });

  test('Get map key by value - no map given', () => {
    expect(() =>
      // @ts-expect-error - function param with false type
      getMapKeyByValue('abc', 'alpha')
    ).toThrowError('Invalid param: please provide an intance of Map.');
  });

  test('Check alphabet', () => {
    // @ts-expect-error - function param with false type
    expect(() => checkAlphabet(true)).toThrowError(
      'Invalid alphabet: please provide an array of single-letter chars.'
    );
    // @ts-expect-error - function param with false type
    expect(() => checkAlphabet([1, 2])).toThrowError(
      'Invalid alphabet: alphabet should contain only single-letter chars.'
    );
    expect(() => checkAlphabet([])).toThrowError(
      'Invalid alphabet: alphabet needs be at least 2 characters long.'
    );
    expect(() => checkAlphabet([''])).toThrowError(
      'Invalid alphabet: alphabet needs be at least 2 characters long.'
    );
    expect(() => checkAlphabet(['', ''])).toThrowError(
      'Invalid alphabet: alphabet should contain only single-letter chars.'
    );
    expect(() => checkAlphabet(['a'])).toThrowError(
      'Invalid alphabet: alphabet needs be at least 2 characters long.'
    );
    expect(() => checkAlphabet(['a', 'a'])).toThrowError(
      'Invalid alphabet: alphabet must not contain duplicates.'
    );
    expect(() => checkAlphabet(['a', 'A'])).toThrowError(
      'Invalid alphabet: alphabet must not contain duplicates.'
    );
    expect(() => checkAlphabet([' ', 'x'])).toThrowError(
      'Invalid alphabet: alphabet should contain only single-letter chars.'
    );
    expect(() => checkAlphabet(['a', 'b'])).toBeTruthy();
  });

  test('Get shifted char', () => {
    expect(getShiftedChar('a', 1)).toBe('b');
    expect(getShiftedChar('a', -1)).toBe('z');
    expect(getShiftedChar('A', 1)).toBe('b');
    expect(getShiftedChar('A', -1)).toBe('z');
  });

  test('Get unique chars from text', () => {
    expect(getUniqueCharsFromText('abba')).toEqual(['a', 'b']);
    expect(getUniqueCharsFromText('ABba')).toEqual(['a', 'b']);
    expect(getUniqueCharsFromText('ABba', true)).toEqual(['A', 'B', 'b', 'a']);
    expect(getUniqueCharsFromText('Today was a good day', true)).toEqual([
      'T',
      'o',
      'd',
      'a',
      'y',
      ' ',
      'w',
      's',
      'g',
    ]);
  });

  test('Get random ASCII char', () => {
    const asciiChars = ASCII_PRINTABLE_SPECIAL.concat(DIGITS)
      .concat(ALPHABET_EN)
      .concat(ALPHABET_EN.map(lowerCaseChar => lowerCaseChar.toUpperCase()));
    expect(getRandomAsciiChar()).toMatch(
      /[a-zA-Z0-9 !"#$%\\'()*+,-./:;<=>?@`[~\]^_{|}]{1}/g
    );

    let randomAsciiChars = '';
    for (let i = 0; i < 10000; i++) {
      randomAsciiChars += getRandomAsciiChar();
    }

    for (const char of asciiChars) {
      if (randomAsciiChars.indexOf(char) === -1) {
        throw Error(
          `Error: ASCII char '${char}' not found in randomly generated string.`
        );
      } else {
        randomAsciiChars = randomAsciiChars.replaceAll(char, '');
      }
    }
    expect(randomAsciiChars).toEqual('');
  });
});
