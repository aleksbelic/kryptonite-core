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
    const rotatedDiscs = [...discs];
    const normalizedPlaintext = plaintext.replace(/\s/g, '').toUpperCase();

    const upperCaseAlphabet = ALPHABET_EN.map(char => char.toUpperCase());

    for (const currentChar of normalizedPlaintext) {
        if (!upperCaseAlphabet.includes(currentChar)) {
            throw new Error(
                'Plaintext can contain only English alphabet letters.',
            );
        }
    }

    if (normalizedPlaintext.length > rotatedDiscs.length) {
        throw new Error(
            `Invalid length: plaintext should not be longer than ${rotatedDiscs.length} characters.`,
        );
    }

    for (let index = 0; index < normalizedPlaintext.length; index++) {
        const charPositionOnDisc = rotatedDiscs[index].indexOf(
            normalizedPlaintext[index],
        );
        rotatedDiscs[index] =
            rotatedDiscs[index].slice(charPositionOnDisc) +
            rotatedDiscs[index].slice(0, charPositionOnDisc);
    }

    const discLength = rotatedDiscs[0].length;

    let ciphertext: string;
    do {
        const randomCiphertextIndex = Math.floor(Math.random() * discLength);
        ciphertext = Array.from(
            rotatedDiscs,
            disk => disk[randomCiphertextIndex],
        ).join('');
    } while (ciphertext === normalizedPlaintext);

    return ciphertext;
}

/**
 * [M-94 cipher](https://en.wikipedia.org/wiki/M-94) decryption
 *
 * @param ciphertext text to be decrypted
 * @returns all possible plaintexts
 *
 * @example
 * decrypt('ZJXJLGIXOXJWCMPQRSTUVWXYZ')
 * // returns
    [
    'KINGSANDQUEENSAAAAAAAAAAA',
    'ZJXJLGIXOXJWCMPQRSTUVWXYZ',
    'OKFHWPKAIYAOJFBJMDOTNVKJD',
    'LTYLEOPIVWLAIAVNYMJRKSWPN',
    'RLQKMCVHTITMLOHUOCYZHFRXB',
    'XMRMZIRPZCMNDDIBFNLXRDEMU',
    'SOTRVXOJEASFHWYTTEFQGLVVH',
    'PUVUXLGOFKXLBPKGHQXLOIDKY',
    'WVWOGUSBHEVHMKSIEBNYXETBF',
    'NYLQARYWGLQQKJGMUOGIEBUQW',
    'AGAVFNDKYBPGGVUWSZWOYHFWJ',
    'BZDPNDUCUDNCXIEZZPHVBKOUL',
    'CNKTQYLVNFOUUUNRJLVBFNYGV',
    'EPONUZCFLJHJZQTVXGCPSRHLG',
    'IQMWKHFZPGUTTHCLDVMEJJMOR',
    'GXJYDWMLMHWBSZXXPJISMQLSC',
    'DRUXOBQQBODYWCOCCRRNUZSTQ',
    'JWBZPJTEXNIPQTWSWKBHDGIEM',
    'FSGSISWRWMZZYXFHGYSJQMQCP',
    'VBEATQAYCTYKVBQDQTEWCXNHS',
    'UAPEJFHNRPCXOLDEIFKMLPJNO',
    'YCHDBKXSARGIREROBUUDZUCZE',
    'MDSCRVJUJQKSPGLKKIPGWCPFX',
    'HECBHMEMDSRRFNJFLWDFTOGRT',
    'THZICEZGSVFDEYZPNXZCITBIK',
    'QFIFYTBTKZBVARMYVHQKPYZDI',
    ];
 */
export function decrypt(ciphertext: string): string[] {
    const rotatedDiscs = [...discs];
    const normalizedCiphertext = ciphertext.replace(/\s/g, '').toUpperCase();

    const upperCaseAlphabet = ALPHABET_EN.map(char => char.toUpperCase());

    for (const currentChar of normalizedCiphertext) {
        if (!upperCaseAlphabet.includes(currentChar)) {
            throw new Error(
                'Ciphertext can contain only English alphabet letters.',
            );
        }
    }

    if (normalizedCiphertext.length > rotatedDiscs.length) {
        throw new Error(
            `Invalid length: ciphertext should not be longer than ${rotatedDiscs.length} characters.`,
        );
    }

    for (let index = 0; index < normalizedCiphertext.length; index++) {
        const charPositionOnDisc = rotatedDiscs[index].indexOf(
            normalizedCiphertext[index],
        );
        rotatedDiscs[index] =
            rotatedDiscs[index].slice(charPositionOnDisc) +
            rotatedDiscs[index].slice(0, charPositionOnDisc);
    }

    const rotatedDiscsPlaintexts = [];
    for (let i = 0; i < rotatedDiscs[0].length; i++) {
        const plaintext = Array.from(rotatedDiscs, disk => disk[i]).join('');
        rotatedDiscsPlaintexts.push(plaintext);
    }
    return rotatedDiscsPlaintexts;
}
