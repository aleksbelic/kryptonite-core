const polybiusSquareGreek = [
    ['A', 'B', 'Γ', 'Δ', 'E'],
    ['Z', 'H', 'Θ', 'I', 'K'],
    ['Λ', 'M', 'N', 'Ξ', 'O'],
    ['Π', 'P', 'Σ', 'T', 'Y'],
    ['Φ', 'X', 'Ψ', 'Ω'],
];

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
 */
export function encrypt(
    plaintext: string,
    options?: {
        alphabet?: 'latin' | 'greek' | string[][];
        separator?: string;
        caseSensitive?: boolean;
        includeForeignChars?: boolean;
    },
): string {
    if (
        options?.alphabet !== 'latin' &&
        options?.alphabet !== 'greek' &&
        options?.alphabet !== undefined &&
        !Array.isArray(options?.alphabet)
    ) {
        throw new Error(
            "Invalid param: alphabet should be either 'latin', 'greek' or a custom string[][].",
        );
    }

    let alphabet: string[][];
    if (options?.alphabet === 'latin') {
        alphabet = polybiusSquareLatin;
    } else if (options?.alphabet === 'greek') {
        alphabet = polybiusSquareGreek;
    } else if (Array.isArray(options?.alphabet)) {
        alphabet = options?.alphabet;
    } else {
        alphabet = polybiusSquareLatin;
    }

    const {
        separator = ' ',
        includeForeignChars = true,
        caseSensitive = false,
    } = options || {};

    let ciphertext = '';

    for (let charIndex = 0; charIndex < plaintext.length; charIndex++) {
        const char = plaintext[charIndex];
        let charEncrypted: string | undefined;

        for (let rowIndex = 0; rowIndex < alphabet.length; rowIndex++) {
            for (
                let colIndex = 0;
                colIndex < alphabet[rowIndex].length;
                colIndex++
            ) {
                if (
                    char.toLowerCase() ===
                    alphabet[rowIndex][colIndex].toLowerCase()
                ) {
                    charEncrypted = `${rowIndex + 1}${colIndex + 1}`;
                    break;
                }
            }
            if (charEncrypted !== undefined) break;
        }

        if (charEncrypted !== undefined) {
            ciphertext += charEncrypted;
        } else if (includeForeignChars) {
            ciphertext += char;
        }

        if (charIndex < plaintext.length - 1) {
            ciphertext += separator;
        }
    }

    return ciphertext;
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
