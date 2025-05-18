import { ALPHABET_EN } from '../globals';

const discs: string[] = [
    'ABCEIGDJFVUYMHTQKZOLRXSPWN', // B1
    'ACDEHFIJKTLMOUVYGZNPQXRWSB', // C2
    'ADKOMJUBGEPHSCZINXFYQRTVWL', // D3
    'AEDCBIFGJHLKMRUOQVPTNWYXZS', // E4
    'AFNQUKDOPITJBRHCYSLWEMZVXG', // F5
    'AGPOCIXLURNDYZHWBJSQFKVMET', // G6
    'AHXJEZBNIKPVROGSYDULCFMQTW', // H7
    'AIHPJOBWKCVFZLQERYNSUMGTDX', // I8
    'AJDSKQOIVTZEFHGYUNLPMBXWCR', // J9
    'AKELBDFJGHONMTPRQSVZUXYWIC', // K10
    'ALTMSXVQPNOHUWDIZYCGKRFBEJ', // L11
    'AMNFLHQGCUJTBYPZKXISRDVEWO', // M12
    'ANCJILDHBMKGXUZTSWQYVORPFE', // N13
    'AODWPKJVIUQHZCTXBLEGNYRSMF', // O14
    'APBVHIYKSGUENTCXOWFQDRLJZM', // P15
    'AQJNUBTGIMWZRVLXCSHDEOKFPY', // Q16
    'ARMYOFTHEUSZJXDPCWGQIBKLNV', // R17 "ARMY OF THE US..."
    'ASDMCNEQBOZPLGVJRKYTFUIWXH', // S18
    'ATOJYLFXNGWHVCMIRBSEKUPDZQ', // T19
    'AUTRZXQLYIOVBPESNHJWMDGFCK', // U20
    'AVNKHRGOXEYBFSJMUDQCLZWTIP', // V21
    'AWVSFDLIEBHKNRJQZGMXPUCOTY', // W22
    'AXKWREVDTUFOYHMLSIQNJCPGBZ', // X23
    'AYJPXMVKBQWUGLOSTECHNZFRID', // Y24
    'AZDNBUHYFWJLVGRCQMPSOEXTKI', // Z25
];

/**
 * [M-94 cipher](https://en.wikipedia.org/wiki/M-94) encryption
 *
 * @param plaintext text to be encrypted
 * @returns ciphertext, the encrypted text
 *
 * @example
 * encrypt('KINGS AND QUEENS')
 * // returns 'ZJXJLGIXOXJWCMPQRSTUVWXYZ'
 */
export function encrypt(plaintext: string): string {
    plaintext = plaintext.replace(/\s/g, '');
    plaintext = plaintext.toUpperCase();

    const upperCaseAlphabet = ALPHABET_EN.map(char => char.toUpperCase());

    for (const currentChar of plaintext) {
        if (!upperCaseAlphabet.includes(currentChar)) {
            throw new Error(
                'Plaintext can contain only English alphabet letters.',
            );
        }
    }

    if (plaintext.length > discs.length) {
        throw new Error(
            `Invalid length: plaintext should not be longer than ${discs.length} characters.`,
        );
    }

    for (let index = 0; index < plaintext.length; index++) {
        const charPositionOnDisc = discs[index].indexOf(plaintext[index]);
        discs[index] =
            discs[index].slice(charPositionOnDisc) +
            discs[index].slice(0, charPositionOnDisc);
    }

    const discLength = discs[0].length;
    const randomCipherTextIndex =
        Math.floor(Math.random() * discLength - 1) + 1;

    console.log(`Random index: ${randomCipherTextIndex}`);

    let ciphertext = '';
    for (const disk of discs) {
        ciphertext += disk[randomCipherTextIndex];
    }

    return ciphertext;
}
