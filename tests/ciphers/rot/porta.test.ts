import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../../src/ciphers/porta';

describe('Porta cipher', () => {
    test('Encryption', () => {
        expect(encrypt('abc', { key: 'key' })).toEqual('sqo');
        expect(encrypt('aBc', { key: 'key' })).toEqual('sQo');
        expect(encrypt('aBc', { key: 'key', caseSensitive: false })).toEqual(
            'sqo',
        );
        expect(encrypt('aB_c', { key: 'key' })).toEqual('sQ_u');
        expect(
            encrypt('aB_c', { key: 'key', includeForeignChars: false }),
        ).toEqual('sQo');
        expect(
            encrypt('aB_c', {
                key: 'key',
                caseSensitive: false,
                includeForeignChars: false,
            }),
        ).toEqual('sqo');
        expect(() => encrypt('abc', { key: '' })).toThrow(
            'Invalid param: key cannot be an empty string.',
        );
        expect(() => encrypt('abc', { key: '_' })).toThrow(
            `No substitution alphabet provided for key char '_'.`,
        );
    });

    test('Decryption', () => {
        expect(decrypt('sqo', { key: 'key' })).toEqual('abc');
        expect(decrypt('sQo', { key: 'key' })).toEqual('aBc');
        expect(decrypt('sQo', { key: 'key', caseSensitive: false })).toEqual(
            'abc',
        );
        expect(decrypt('sQ_u', { key: 'key' })).toEqual('aB_c');
        expect(
            decrypt('sQ_o', { key: 'key', includeForeignChars: false }),
        ).toEqual('aBc');
        expect(
            decrypt('sQ_o', {
                key: 'key',
                caseSensitive: false,
                includeForeignChars: false,
            }),
        ).toEqual('abc');
        expect(() => decrypt('sqo', { key: '' })).toThrow(
            'Invalid param: key cannot be an empty string.',
        );
        expect(() => decrypt('sqo', { key: '_' })).toThrow(
            `No substitution alphabet provided for key char '_'.`,
        );
    });
});
