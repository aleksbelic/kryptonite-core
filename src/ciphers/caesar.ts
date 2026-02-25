import { ALPHABET_EN } from '../globals';
import { checkAlphabet, getShiftedChar, isUpperCase } from '../helpers';

/**
 * [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) encryption
 *
 * @param plaintext text to be encrypted
 * @param options configuration for encryption
 * @param options.shift number of left or right alphabet rotations
 * @param options.caseSensitive if correct input of upper case and lower case matters
 * @param options.includeForeignChars if unknown char should be included in ciphertext
 * @param options.alphabet used alphabet
 * @returns ciphertext, the encrypted text
 *
 * @example
 * encrypt('abc', { shift: 1 })
 * // returns 'bcd'
 *
 * encrypt('abc', { shift: -1 })
 * // returns 'zab'
 *
 * encrypt('Abc', { shift: 1, caseSensitive: true })
 * // returns 'Bcd'
 *
 * encrypt('Abc', { shift: 1, caseSensitive: false })
 * // returns 'bcd'
 *
 * encrypt('ab!c', { shift: 1, caseSensitive: true, includeForeignChars: true })
 * // returns 'bc!d'
 *
 * encrypt('ab!c', { shift: 1, caseSensitive: true, includeForeignChars: false })
 * // returns 'bcd'
 */
export function encrypt(
    plaintext: string,
    options: {
        shift: number;
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): string {
    const {
        shift,
        caseSensitive = true,
        includeForeignChars = true,
        alphabet = ALPHABET_EN,
    } = options;
    checkAlphabet(alphabet);

    let ciphertext = '',
        currentCharEncrypted: string | undefined;

    for (const currentChar of plaintext) {
        currentCharEncrypted = getShiftedChar(currentChar, shift, alphabet);
        if (currentCharEncrypted === undefined) {
            if (includeForeignChars) {
                ciphertext += currentChar;
            }
            continue;
        } else if (caseSensitive && isUpperCase(currentChar)) {
            currentCharEncrypted = currentCharEncrypted.toUpperCase();
        }
        ciphertext += currentCharEncrypted;
    }

    return ciphertext;
}

/**
 * [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) decryption
 *
 * @param ciphertext text to be decrypted
 * @param options configuration for decryption
 * @param options.shift number of left or right alphabet rotations
 * @param options.caseSensitive if correct input of upper case and lower case matters
 * @param options.includeForeignChars if unknown char should be included in plaintext
 * @param options.alphabet used alphabet
 * @returns plaintext, the decrypted text
 *
 * @example
 * decrypt('bcd', { shift: 1 })
 * // returns 'abc'
 *
 * decrypt('zab', { shift: -1 })
 * // returns 'abc'
 *
 * decrypt('Bcd', { shift: 1, caseSensitive: true })
 * // returns 'Abc'
 *
 * decrypt('Bcd', { shift: 1, caseSensitive: false })
 * // returns 'abc'
 *
 * decrypt('bc!d', { shift: 1, caseSensitive: true, includeForeignChars: true })
 * // returns 'ab!c'
 *
 * decrypt('bc!d', { shift: 1, caseSensitive: true, includeForeignChars: false })
 * // returns 'abc'
 */
export function decrypt(
    ciphertext: string,
    options: {
        shift: number;
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): string {
    const {
        shift,
        caseSensitive = true,
        includeForeignChars = true,
        alphabet = ALPHABET_EN,
    } = options;

    return encrypt(ciphertext, {
        shift: alphabet.length - shift,
        caseSensitive,
        includeForeignChars,
        alphabet,
    });
}

/**
 * Prints decrypted plaintext for given ciphertext, shift & alphabet
 *
 * @param ciphertext text to be decrypted
 * @param options configuration for encryption
 * @param options.shift number of left or right alphabet rotations
 * @param options.caseSensitive if correct input of upper case and lower case matters
 * @param options.includeForeignChars if unknown char should be included in ciphertext
 * @param options.alphabet used alphabet
 *
 * @example
 * printShift('abc', { shift: 1 })
 * // prints 'bcd'
 */
export function printShift(
    ciphertext: string,
    options: {
        shift: number;
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): void {
    const {
        shift,
        caseSensitive = true,
        includeForeignChars = true,
        alphabet = ALPHABET_EN,
    } = options;

    console.log(
        encrypt(ciphertext, {
            shift,
            caseSensitive,
            includeForeignChars,
            alphabet,
        }),
    );
}

/**
 * Prints decrypted plaintext of given ciphertext with all possible shifts
 *
 * @param ciphertext text to be decrypted
 * @param options configuration for decryption
 * @param options.caseSensitive if correct input of upper case and lower case matters
 * @param options.includeForeignChars if unknown char should be included in ciphertext
 * @param options.alphabet used alphabet
 *
 * @example
 * printAllShifts('a', { alphabet: ['a', 'b', 'c'] })
 * // prints
 * 'a'
 * 'b'
 * 'c'
 */
export function printAllShifts(
    ciphertext: string,
    options?: {
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): void {
    const {
        caseSensitive = true,
        includeForeignChars = true,
        alphabet = ALPHABET_EN,
    } = options ?? {};

    for (let shift = 0; shift < alphabet.length; shift++) {
        console.log(
            encrypt(ciphertext, {
                shift,
                caseSensitive,
                includeForeignChars,
                alphabet,
            }),
        );
    }
}
