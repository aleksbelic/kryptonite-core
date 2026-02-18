import { describe, expect, test } from 'vitest';
import { decrypt, encrypt } from '../../src/ciphers/m-94';

const possibleCiphertexts = [
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

describe('M-94 cipher - encryption', () => {
    test('Basic encryption', () => {
        expect(
            possibleCiphertexts.includes(encrypt('KINGS AND QUEENS')),
        ).toEqual(true);
    });

    test('throws error for invalid characters', () => {
        expect(() => encrypt('HELLO123')).toThrow(
            'Plaintext can contain only English alphabet letters.',
        );
    });

    test('throws error for invalid characters with special chars', () => {
        expect(() => encrypt('HELLO!')).toThrow(
            'Plaintext can contain only English alphabet letters.',
        );
    });

    test('handles lowercase input', () => {
        expect(
            possibleCiphertexts.includes(encrypt('kings and queens')),
        ).toEqual(true);
    });

    test('handles mixed case input', () => {
        console.log('XXXXXXX', encrypt('Kings And Queens'));
        expect(
            possibleCiphertexts.includes(encrypt('Kings And Queens')),
        ).toEqual(true);
    });

    test('throws error for too long plaintext', () => {
        const longText = 'A'.repeat(26);
        expect(() => encrypt(longText)).toThrow(
            'Invalid length: plaintext should not be longer than 25 characters.',
        );
    });
});

describe('M-94 cipher - decryption', () => {
    test('Basic decryption 1', () => {
        expect(
            decrypt('FSGSISWRWMZZYXFHGYSJQMQCP').includes(
                'KINGSANDQUEENSAAAAAAAAAAA',
            ),
        ).toEqual(true);
    });

    test('Basic decryption 2', () => {
        expect(
            decrypt('YCHDBKXSARGIREROBUUDZUCZE').includes(
                'KINGSANDQUEENSAAAAAAAAAAA',
            ),
        ).toEqual(true);
    });

    test('throws error for invalid characters', () => {
        expect(() => decrypt('HELLO123')).toThrow(
            'Ciphertext can contain only English alphabet letters.',
        );
    });

    test('throws error for invalid characters with special chars', () => {
        expect(() => decrypt('HELLO!')).toThrow(
            'Ciphertext can contain only English alphabet letters.',
        );
    });

    test('handles lowercase input', () => {
        expect(
            decrypt('agavfndkybpggvuwszwoyhfwj').includes(
                'KINGSANDQUEENSAAAAAAAAAAA',
            ),
        ).toEqual(true);
    });

    test('handles mixed case input', () => {
        expect(
            decrypt('AgAvFnDkYbPggVuWsZwOyHfWj').includes(
                'KINGSANDQUEENSAAAAAAAAAAA',
            ),
        ).toEqual(true);
    });

    test('throws error for too long plaintext', () => {
        const longText = 'A'.repeat(26);
        expect(() => decrypt(longText)).toThrow(
            'Invalid length: ciphertext should not be longer than 25 characters.',
        );
    });
});
