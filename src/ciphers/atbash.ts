import { ALPHABET_EN } from '../globals';
import { checkAlphabet, getShiftedChar, isUpperCase } from '../helpers';

const defaultConfig = {
    caseSensitive: true,
    includeForeignChars: true,
    alphabet: ALPHABET_EN,
};

/**
 * {@link https://en.wikipedia.org/wiki/Atbash | Atbash cipher} encryption.
 *
 * @param plaintext - text to encrypt
 * @param options - encryption config:
 *
 * - `caseSensitive` - if correct input of upper case and lower case matters; default is `true`
 * - `includeForeignChars` - if unknown char should be included in ciphertext; default is `true`
 * - `alphabet` - alphabet used for encryption process; default is `English alphabet`
 *
 * @returns ciphertext, the encrypted text
 *
 * @example
 * ```ts
 * encrypt('abc')
 * // returns 'zyx'
 *
 * encrypt('Abc', { caseSensitive: true })
 * // returns 'Zyx'
 *
 * encrypt('abc#d', { includeForeignChars: true })
 * // returns 'zyx#w'
 *
 * encrypt('ћшчшћћ', { alphabet: ['ш', 'ч', 'ћ'] })
 * // returns 'шћчћшш'
 * ```
 */
export function encrypt(
    plaintext: string,
    options?: {
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): string {
    const {
        caseSensitive = defaultConfig.caseSensitive,
        includeForeignChars = defaultConfig.includeForeignChars,
        alphabet = defaultConfig.alphabet,
    } = options ?? {};

    checkAlphabet(alphabet!);

    let ciphertext = '',
        shift: number,
        currentCharEncrypted: string | undefined;

    for (const currentChar of plaintext) {
        shift =
            alphabet.length -
            2 * alphabet.indexOf(currentChar.toLowerCase()) -
            1;
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
 * {@link https://en.wikipedia.org/wiki/Atbash | Atbash cipher} decryption.
 *
 * @param ciphertext - text to decrypt
 * @param options - decryption config:
 *
 * - `caseSensitive` - if correct input of upper case and lower case matters; default is `true`
 * - `includeForeignChars` - if unknown char should be included in plaintext; default is `true`
 * - `alphabet` - alphabet used for decryption process; default is `English alphabet`
 *
 * @returns plaintext, the decrypted text
 *
 * @example
 * ```ts
 * decrypt('zyx')
 * // returns 'abc'
 *
 * decrypt('Zyx', { caseSensitive: true })
 * // returns 'Abc'
 *
 * decrypt('zyx#w', { includeForeignChars: true })
 * // returns 'abc#d'
 *
 * decrypt('шћчћшш', { alphabet: ['ш', 'ч', 'ћ'] })
 * // returns 'ћшчшћћ'
 * ```
 */
export function decrypt(
    ciphertext: string,
    options?: {
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
        alphabet?: string[];
    },
): string {
    const {
        caseSensitive = defaultConfig.caseSensitive,
        includeForeignChars = defaultConfig.includeForeignChars,
        alphabet = defaultConfig.alphabet,
    } = options ?? {};

    return encrypt(ciphertext, {
        caseSensitive,
        includeForeignChars,
        alphabet,
    });
}
