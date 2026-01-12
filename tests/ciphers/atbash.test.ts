import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../src/ciphers/atbash';

describe('Atbash cipher - encryption', () => {
    test('Basic substitution', () => {
        expect(encrypt('abcdefghijklmnopqrstuvwxyz')).toEqual(
            'zyxwvutsrqponmlkjihgfedcba',
        );
    });

    test('Case sensitive', () => {
        expect(encrypt('abc')).toEqual('zyx');
        expect(encrypt('Abc', { caseSensitive: true })).toEqual('Zyx');
        expect(encrypt('Abc', { caseSensitive: false })).toEqual('zyx');
    });

    test('Include foreign chars', () => {
        expect(encrypt('abc#d', { includeForeignChars: true })).toEqual(
            'zyx#w',
        );
    });

    test('Custom alphabet', () => {
        expect(encrypt('ћшчшћћ', { alphabet: ['ш', 'ч', 'ћ'] })).toEqual(
            'шћчћшш',
        );
    });

    test('Various', () => {
        expect(
            encrypt('aBc!D', {
                caseSensitive: false,
                includeForeignChars: false,
            }),
        ).toEqual('zyxw');
        expect(
            encrypt('aBc!D', {
                caseSensitive: true,
                includeForeignChars: false,
            }),
        ).toEqual('zYxW');
        expect(
            encrypt('aBc!D', {
                caseSensitive: false,
                includeForeignChars: true,
            }),
        ).toEqual('zyx!w');
        expect(
            encrypt('aBc!D', {
                caseSensitive: true,
                includeForeignChars: true,
            }),
        ).toEqual('zYx!W');
        expect(encrypt('abcd abcd')).toEqual('zyxw zyxw');
        expect(encrypt('abcd abcd', { includeForeignChars: false })).toEqual(
            'zyxwzyxw',
        );
    });
});

describe('Atbash cipher - decryption', () => {
    test('Basic substitution', () => {
        expect(decrypt('zyxwvutsrqponmlkjihgfedcba')).toEqual(
            'abcdefghijklmnopqrstuvwxyz',
        );
    });

    test('Case sensitive', () => {
        expect(decrypt('zyx')).toEqual('abc');
        expect(decrypt('Zyx', { caseSensitive: true })).toEqual('Abc');
        expect(decrypt('Zyx', { caseSensitive: false })).toEqual('abc');
    });

    test('Include foreign chars', () => {
        expect(decrypt('zyx#w', { includeForeignChars: true })).toEqual(
            'abc#d',
        );
    });

    test('Custom alphabet', () => {
        expect(decrypt('шћчћшш', { alphabet: ['ш', 'ч', 'ћ'] })).toEqual(
            'ћшчшћћ',
        );
    });

    test('Various', () => {
        expect(
            decrypt('zYx!W', {
                caseSensitive: false,
                includeForeignChars: false,
            }),
        ).toEqual('abcd');
        expect(
            decrypt('zYx!W', {
                caseSensitive: true,
                includeForeignChars: false,
            }),
        ).toEqual('aBcD');
        expect(
            decrypt('zYx!W', {
                caseSensitive: false,
                includeForeignChars: true,
            }),
        ).toEqual('abc!d');
        expect(
            decrypt('zYx!W', {
                caseSensitive: true,
                includeForeignChars: true,
            }),
        ).toEqual('aBc!D');
        expect(decrypt('zyxw zyxw')).toEqual('abcd abcd');
        expect(decrypt('zyxw zyxw', { includeForeignChars: false })).toEqual(
            'abcdabcd',
        );
    });
});
