import { morseCodeMap } from '../globals';
import { getMapKeyByValue } from '../helpers';

const defaultConfig = {
    short: '.',
    long: '-',
    space: '/',
};

/**
 * {@link https://en.wikipedia.org/wiki/Morse_code | Morse code} encryption.
 *
 * @param plaintext - text to be encrypted
 * @param options - encryption config:
 *
 * - `short` - symbol to represent short signals; default is dot (`.`)
 * - `long` - symbol to represent long signals; default is dash (`-`)
 * - `space` - symbol to represent spaces between words; default is slash (`/`)
 *
 * @returns ciphertext, the encrypted text
 *
 * @throws Error thrown if any of the provided symbols for short, long or space are the same
 * @throws Error if plaintext contains characters not defined in Morse code
 *
 * @example
 * ```ts
 * encrypt('abc')
 * //returns '.- -... -.-.'
 *
 * encrypt('Ab cd')
 * // returns '.- -... / -.-. -..'
 *
 * encrypt('x y z', { short: 'o', long: '=', space: '#' })
 * // returns '=oo= # =o== # ==oo'
 * ```
 */
export function encrypt(
    plaintext: string,
    options?: {
        short?: string;
        long?: string;
        space?: string;
    },
): string {
    const {
        short = defaultConfig.short,
        long = defaultConfig.long,
        space = defaultConfig.space,
    } = options ?? {};

    if (
        [short, long, space].join('') !==
        [...new Set([short, long, space])].join('')
    ) {
        throw new Error(
            'Please use different characters for short mark, long mark & spacing between the words.',
        );
    }

    let ciphertextWord;
    const ciphertextArray: string[] = [];
    for (const currentWord of plaintext.toLowerCase().split(/\s/g)) {
        ciphertextWord = [];
        for (const currentChar of currentWord) {
            if (morseCodeMap.get(currentChar) === undefined) {
                throw new Error(
                    `Character '${currentChar}' is not defined in Morse code.`,
                );
            }
            ciphertextWord.push(
                morseCodeMap
                    .get(currentChar)
                    ?.replaceAll('.', short)
                    .replaceAll('-', long),
            );
        }
        ciphertextArray.push(ciphertextWord.join(' '));
    }
    return ciphertextArray.join(` ${space} `);
}

/**
 * {@link https://en.wikipedia.org/wiki/Morse_code | Morse code} decryption.
 *
 * @param ciphertext - text to be decrypted
 * @param options - decryption config:
 *
 * - `short` - symbol to represent short signals; default is dot (`.`)
 * - `long` - symbol to represent long signals; default is dash (`-`)
 * - `space` - symbol to represent spaces between words; default is slash (`/`)
 *
 * @returns plaintext, the decrypted text
 *
 * @throws Error thrown if any of the provided symbols for short, long or space are the same
 * @throws Error thrown if any of the characters in ciphertext cannot be decrypted using Morse code
 *
 * @example
 * ```ts
 * decrypt('.- -... -.-.')
 * // returns 'abc'
 *
 * decrypt('.- -... / -.-. -..')
 * // returns 'ab cd'
 *
 * decrypt('=oo= # =o== # ==oo', { short: 'o', long: '=', space: '#' })
 * // returns 'x y z'
 * ```
 */
export function decrypt(
    ciphertext: string,
    options?: {
        short?: string;
        long?: string;
        space?: string;
    },
): string {
    const {
        short = defaultConfig.short,
        long = defaultConfig.long,
        space = defaultConfig.space,
    } = options ?? {};

    if (
        [short, long, space].join('') !==
        [...new Set([short, long, space])].join('')
    ) {
        throw new Error(
            'Please use different characters for short mark, long mark & spacing between the words.',
        );
    }

    const plaintextArray: string[] = [];
    let plaintextWord: string[];
    let currentCharDecrypted: string | undefined;
    for (const ciphertextWord of ciphertext.split(` ${space} `)) {
        plaintextWord = [];
        for (const ciphertextChar of ciphertextWord.split(' ')) {
            currentCharDecrypted = getMapKeyByValue(
                morseCodeMap,
                ciphertextChar.replaceAll(short, '.').replaceAll(long, '-'),
            );
            if (currentCharDecrypted === undefined) {
                throw new Error(
                    `Character '${ciphertextChar}' could not be decrypted.`,
                );
            }
            plaintextWord.push(currentCharDecrypted);
        }
        plaintextArray.push(plaintextWord.join(''));
    }
    return plaintextArray.join(' ');
}
