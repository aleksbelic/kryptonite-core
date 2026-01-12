import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../src/ciphers/scytale';
import { ALPHABET_EN } from '../../src/globals';

describe('Scytale cipher', () => {
    test('Encryption', () => {
        expect(encrypt('', { columnCount: 1 })).toEqual('');
        expect(encrypt('abcdef')).toEqual('aebfc d');
        expect(encrypt('abcdef', { columnCount: 1 })).toEqual('abcdef');
        expect(encrypt('abcdef', { columnCount: 2 })).toEqual('acebdf');
        expect(encrypt('abcdef', { columnCount: 3 })).toEqual('adbecf');
        expect(encrypt('abcdef', { columnCount: 4 })).toEqual('aebfc d');
        expect(encrypt('abcdef', { columnCount: 5 })).toEqual('afb c d e');
        expect(encrypt('abcdef', { columnCount: 6 })).toEqual('abcdef');
        expect(encrypt('abcdef', { columnCount: 7 })).toEqual('abcdef');
        expect(encrypt([...ALPHABET_EN].join(''), { columnCount: 1 })).toEqual(
            [...ALPHABET_EN].join(''),
        );
        expect(encrypt([...ALPHABET_EN].join(''), { columnCount: 4 })).toEqual(
            'aeimquybfjnrvzcgkosw dhlptx',
        );
        expect(encrypt([...ALPHABET_EN].join(''), { columnCount: 5 })).toEqual(
            'afkpuzbglqv chmrw dinsx ejoty',
        );
        expect(() => encrypt('abcdef', { columnCount: 0 })).toThrow(
            'Invalid param: number of columns must be a positive integer.',
        );
    });

    test('Decryption', () => {
        expect(decrypt('aebfc d')).toEqual('abcdef');
        expect(decrypt('abcdef', { columnCount: 1 })).toEqual('abcdef');
        expect(decrypt('acebdf', { columnCount: 2 })).toEqual('abcdef');
        expect(decrypt('adbecf', { columnCount: 3 })).toEqual('abcdef');
        expect(decrypt('aebfc d', { columnCount: 4 })).toEqual('abcdef');
        expect(decrypt('afb c d e', { columnCount: 5 })).toEqual('abcdef');
        expect(decrypt('abcdef', { columnCount: 6 })).toEqual('abcdef');
        expect(decrypt('abcdef', { columnCount: 7 })).toEqual('abcdef');
        expect(decrypt([...ALPHABET_EN].join(''), { columnCount: 1 })).toEqual(
            [...ALPHABET_EN].join(''),
        );
        expect(
            decrypt('aeimquybfjnrvzcgkosw dhlptx', { columnCount: 4 }),
        ).toEqual([...ALPHABET_EN].join(''));
        expect(
            decrypt('afkpuzbglqv chmrw dinsx ejoty', { columnCount: 5 }),
        ).toEqual([...ALPHABET_EN].join(''));
        expect(() => decrypt('abcdef', { columnCount: 0 })).toThrow(
            'Invalid param: number of columns must be a positive integer.',
        );
        expect(() => decrypt('', { columnCount: 1 })).toThrow(
            'Invalid param: no ciphertext provided.',
        );
    });
});
