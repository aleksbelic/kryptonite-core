// note: 25 letters in total since "I" and "J" are represented by the same letter
const polybiusSquareLatin = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
];

/**
 * [Polybius square](https://en.wikipedia.org/wiki/Polybius_square) encryption.
 *
 * @param plaintext text to be encrypted
 * @returns ciphertext, the encrypted text
 *
 * @example
 * encrypt('HELLO WORLD')
 * // returns '23 15 31 31 34 52 34 42 31 14'
 *
 * encrypt('HELLO WORLD', { separator: '-' })
 * // returns '23-15-31-31-34-52-34-42-31-14'
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
    if (options?.alphabet && !Array.isArray(options?.alphabet)) {
        throw new Error(
            'Invalid param: alphabet should be a custom 2D array of strings.',
        );
    }

    const {
        alphabet = polybiusSquareLatin,
        separator = ' ',
        includeForeignChars = true,
        caseSensitive = false,
    } = options || {};

    let encryptedChars: string[] = [];

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
 */
export function decrypt(
    ciphertext: string,
    options?: { alphabet?: 'latin' | 'greek' | string[][] },
): string {
    throw new Error('Not implemented yet.');
}
