// note: 25 letters in total since "I" and "J" are represented by the same letter
const polybiusSquareLatin = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
];

/**
 * {@link https://en.wikipedia.org/wiki/Polybius_square | Polybius square} encryption.
 *
 * @param plaintext - text to be encrypted
 * @param options - encryption config:
 *
 * - `alphabet` - 2D string array representing the Polybius square alphabet, where the first dimension represents rows and the second dimension represents columns. Default is the `Latin alphabet` with "I" and "J" sharing the same cell to make it 25 letters.
 * - `separator` - string used to separate encrypted characters in the output; default is a single space (`' '`)
 * - `caseSensitive` - if correct input of upper case and lower case matters; default is `false`, meaning that the case of the input characters will be ignored
 * - `includeForeignChars` - if unknown char should be included in plaintext; default is `true`, meaning that characters not found in the provided alphabet will be included in the output as they are
 *
 * @returns ciphertext, the encrypted text
 *
 * @throws Error thrown if given alphabet is not a valid 2D array of strings
 *
 * @example
 * ```ts
 * encrypt('HELLO WORLD')
 * // returns '23 15 31 31 34 52 34 42 31 14'
 *
 * encrypt('HELLO WORLD', { separator: '-' })
 * // returns '23-15-31-31-34-52-34-42-31-14'
 * ```
 */
export function encrypt(
    plaintext: string,
    options?: {
        alphabet?: string[][];
        separator?: string;
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
    },
): string {
    if (
        options?.alphabet &&
        (!Array.isArray(options?.alphabet) ||
            !options?.alphabet.every(
                row =>
                    Array.isArray(row) &&
                    row.every(char => typeof char === 'string'),
            ))
    ) {
        throw new Error(
            'Invalid param: alphabet should be a custom 2D array of strings (string[][]).',
        );
    }

    const {
        alphabet = polybiusSquareLatin,
        separator = ' ',
        caseSensitive = false,
        includeForeignChars = true,
    } = options ?? {};

    const encryptedChars: string[] = [];

    if (options?.alphabet === undefined) {
        plaintext = plaintext.replace(/j/gi, charJ =>
            charJ === 'J' ? 'I' : 'i',
        );
    }

    for (let charIndex = 0; charIndex < plaintext.length; charIndex++) {
        const char = plaintext[charIndex];
        let encryptedChar: string | undefined = undefined;

        for (let rowIndex = 0; rowIndex < alphabet.length; rowIndex++) {
            for (
                let colIndex = 0;
                colIndex < alphabet[rowIndex].length;
                colIndex++
            ) {
                if (
                    (caseSensitive === true &&
                        char === alphabet[rowIndex][colIndex]) ||
                    (caseSensitive === false &&
                        char.toLocaleLowerCase() ===
                            alphabet[rowIndex][colIndex].toLocaleLowerCase())
                ) {
                    encryptedChar = `${rowIndex + 1}${colIndex + 1}`;
                    break;
                }
            }

            if (encryptedChar) break;
        }

        if (encryptedChar) {
            encryptedChars.push(encryptedChar);
        } else if (includeForeignChars) {
            encryptedChars.push(char);
        }
    }

    return encryptedChars.join(separator);
}

/**
 * [Polybius square](https://en.wikipedia.org/wiki/Polybius_square) decryption.
 *
 * @param ciphertext - text to be decrypted
 * @param options - decryption config:
 *
 * - `alphabet` - 2D string array representing the Polybius square alphabet. Default is the `Latin alphabet` with "I" and "J" sharing the same cell.
 * - `separator` - string used to separate encrypted characters; default is a single space (`' '`)
 * - `includeForeignChars` - if true, characters not in given alphabet will also be included as-is; default is `true`
 *
 * @returns plaintext, the decrypted text
 *
 * @throws Error thrown if given alphabet is not a valid 2D array of strings
 *
 * @example
 * ```ts
 * decrypt('23 15 31 31 34 52 34 42 31 14')
 * // returns 'HELLO WORLD'
 * ```
 * ```ts
 * decrypt('23-15-31-31-34-52-34-42-31-14', { separator: '-' })
 * // returns 'HELLO WORLD'
 * ```
 */
export function decrypt(
    ciphertext: string,
    options?: {
        alphabet?: string[][];
        separator?: string;
        includeForeignChars?: boolean;
    },
): string {
    if (
        options?.alphabet &&
        (!Array.isArray(options?.alphabet) ||
            !options?.alphabet.every(
                row =>
                    Array.isArray(row) &&
                    row.every(cell => typeof cell === 'string'),
            ))
    ) {
        throw new Error(
            'Invalid param: alphabet should be a custom 2D array of strings (string[][]).',
        );
    }

    const {
        alphabet = polybiusSquareLatin,
        separator = ' ',
        includeForeignChars = true,
    } = options ?? {};

    let encryptedChars: string[] = [];
    const decryptedChars: string[] = [];

    if (options?.includeForeignChars) {
        // <-- only testing, here should be default, not func param (includeForeignChars)!
        // TODO
    } else if (separator) {
        encryptedChars = ciphertext
            .split(separator)
            .filter(encryptedChar => /^\d{2}$/.test(encryptedChar));
    } else {
        encryptedChars = ciphertext.match(/\d{2}/g) ?? [];
    }

    for (
        let encryptedCharIndex = 0;
        encryptedCharIndex < encryptedChars.length;
        encryptedCharIndex++
    ) {
        const encryptedChar = encryptedChars[encryptedCharIndex];

        const rowIndex = parseInt(encryptedChar[0], 10) - 1;
        const colIndex = parseInt(encryptedChar[1], 10) - 1;

        if (alphabet[rowIndex] && alphabet[rowIndex][colIndex]) {
            decryptedChars.push(alphabet[rowIndex][colIndex]);
        } else if (includeForeignChars) {
            decryptedChars.push(encryptedChar);
        } else {
            throw new Error(
                `Invalid ciphertext: "${encryptedChar}" does not correspond to a valid position in the provided alphabet.`,
            );
        }
    }

    return decryptedChars.join('');
}
