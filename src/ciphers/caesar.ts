import {ALPHABET_EN} from '../globals.js';
import {isUpperCase} from '../helpers.js';

/**
 * [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) encryption.
 * @param plaintext text to be encrypted
 * @param shift number of left or right alphabet rotations
 * @param caseSensitive if correct input of uppercase and lowercase chars matters
 * @param includeForeignChars if unknown char should be omitted in ciphertext
 * @param alphabet alphabet being used
 * @returns ciphertext
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 * @example
 * encrypt('abc', 1)
 * // returns 'bcd'
 * encrypt('abc', -1)
 * // returns 'zab'
 * encrypt('Abc', 1, true)
 * // returns 'Bcd'
 * encrypt('Abc', 1, false)
 * // returns 'bcd'
 * encrypt('ab!c', 1, true, true)
 * // returns 'bc!d'
 * encrypt('ab!c', 1, true, false)
 * // returns 'bcd'
 */
export const encrypt = (
  plaintext: string,
  shift: number,
  caseSensitive = true,
  includeForeignChars = true,
  alphabet = ALPHABET_EN
): string => {
  if (alphabet.length < 2) {
    throw Error('Alphabet needs be at least 2 characters long.');
  }

  let ciphertext = '';
  while (shift < 0) {
    shift = alphabet.length + shift;
  }

  let currentChar: string,
    currentCharIndexInAlphabet: number,
    isCurrentCharUpperCase: boolean,
    encryptedCurrentChar: string;

  for (let i = 0; i < plaintext.length; i++) {
    currentChar = plaintext[i];
    isCurrentCharUpperCase = isUpperCase(currentChar);
    currentCharIndexInAlphabet = alphabet.indexOf(
      currentChar.toLocaleLowerCase()
    );

    if (currentCharIndexInAlphabet === -1) {
      if (includeForeignChars) {
        ciphertext += currentChar;
      }
      continue;
    }

    encryptedCurrentChar =
      alphabet[(currentCharIndexInAlphabet + shift) % alphabet.length];
    if (caseSensitive && isCurrentCharUpperCase) {
      encryptedCurrentChar = encryptedCurrentChar.toLocaleUpperCase();
    }
    ciphertext += encryptedCurrentChar;
  }
  return ciphertext;
};

/**
 * [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) decryption.
 * @param ciphertext text to be decrypted
 * @param shift number of left or right alphabet rotations
 * @param caseSensitive if correct input of uppercase and lowercase chars matters
 * @param includeForeignChars if unknown char should be omitted in ciphertext
 * @param alphabet alphabet being used
 * @returns plaintext
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 * @example
 * decrypt('bcd', 1)
 * // returns 'abc'
 * decrypt('zab', -1)
 * // returns 'abc'
 */
export const decrypt = (
  ciphertext: string,
  shift: number,
  caseSensitive = true,
  includeForeignChars = true,
  alphabet = ALPHABET_EN
): string => {
  encrypt;
  return encrypt(
    ciphertext,
    alphabet.length - shift,
    caseSensitive,
    includeForeignChars,
    alphabet
  );
};