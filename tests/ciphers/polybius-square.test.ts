import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../src/ciphers/polybius-square';

describe('Polybius square cipher - encryption', () => {
    test('encrypt with default options', () => {
        expect(encrypt('abc')).toEqual('11 12 13');
        expect(encrypt('ABC')).toEqual('11 12 13');
        expect(encrypt('a bc')).toEqual('11   12 13');
        expect(encrypt('a_bc')).toEqual('11 _ 12 13');
        expect(encrypt('a_b=c')).toEqual('11 _ 12 = 13');
        expect(encrypt(' abc')).toEqual('  11 12 13');
        expect(encrypt('abc ')).toEqual('11 12 13  ');
        expect(encrypt(' abc ')).toEqual('  11 12 13  ');
        expect(encrypt('a-b-c')).toEqual('11 - 12 - 13');
        expect(encrypt('HELLO WORLD')).toEqual(
            '23 15 31 31 34   52 34 42 31 14',
        );
        expect(encrypt('ij')).toEqual('24 24'); // 'I' and 'J' share the same coordinates in the default latin alphabet
        expect(encrypt('iIi jJj')).toEqual('24 24 24   24 24 24');
    });

    test('encrypt with custom separator', () => {
        expect(encrypt('abc', { separator: '' })).toEqual('111213');
        expect(encrypt('abc', { separator: '-' })).toEqual('11-12-13');
        expect(encrypt('a bc', { separator: '-' })).toEqual('11- -12-13');
        expect(encrypt('ABC', { separator: '-' })).toEqual('11-12-13');
        expect(encrypt('abc', { separator: '...' })).toEqual('11...12...13');
    });

    test('encrypt with custom alphabet', () => {
        expect(
            encrypt('ABCDE', {
                alphabet: [['A', 'B', 'C', 'D', 'E']],
            }),
        ).toEqual('11 12 13 14 15');

        expect(
            encrypt('ab de', {
                alphabet: [['A', 'B', 'C', 'D', 'E']],
            }),
        ).toEqual('11 12   14 15');

        expect(
            encrypt('aBcDe', {
                alphabet: [['A', 'B', 'C', 'D', 'E']],
            }),
        ).toEqual('11 12 13 14 15');

        expect(
            encrypt('aAbBcC', {
                alphabet: [
                    ['a', 'A'],
                    ['b', 'B'],
                    ['c', 'C'],
                ],
            }),
        ).toEqual('11 11 21 21 31 31');

        expect(() =>
            encrypt('aAbBcC', {
                // @ts-expect-error - function param with false type
                alphabet: 'no way this is a valid alphabet',
            }),
        ).toThrow(
            'Invalid param: alphabet should be a custom 2D array of strings (string[][]).',
        );

        expect(() =>
            encrypt('aAbBcC', {
                // @ts-expect-error - function param with false type
                alphabet: ['A', 'B', 'C'],
            }),
        ).toThrow(
            'Invalid param: alphabet should be a custom 2D array of strings (string[][]).',
        );

        expect(() =>
            encrypt('aAbBcC', {
                alphabet: [
                    // @ts-expect-error - function param with false type
                    ['A', 2, 'C'],
                ],
            }),
        ).toThrow(
            'Invalid param: alphabet should be a custom 2D array of strings (string[][]).',
        );
    });

    test('encrypt with custom alphabet and caseSensitive', () => {
        expect(
            encrypt('aAbBcC', {
                alphabet: [
                    ['a', 'A'],
                    ['b', 'B'],
                    ['c', 'C'],
                ],
                caseSensitive: false,
            }),
        ).toEqual('11 11 21 21 31 31');

        expect(
            encrypt('aAbBcC', {
                alphabet: [
                    ['a', 'A'],
                    ['b', 'B'],
                    ['c', 'C'],
                ],
                caseSensitive: true,
            }),
        ).toEqual('11 12 21 22 31 32');
    });

    test('encrypt with custom includeForeignChars option', () => {
        expect(encrypt('HELLO WORLD', { includeForeignChars: false })).toEqual(
            '23 15 31 31 34 52 34 42 31 14',
        );

        expect(encrypt('HELLO WORLD', { includeForeignChars: true })).toEqual(
            '23 15 31 31 34   52 34 42 31 14',
        );

        expect(encrypt('hELLO world', { includeForeignChars: true })).toEqual(
            '23 15 31 31 34   52 34 42 31 14',
        );

        expect(
            encrypt('HELLO WORLD', {
                separator: '-',
                includeForeignChars: true,
            }),
        ).toEqual('23-15-31-31-34- -52-34-42-31-14');

        expect(
            encrypt('HELLO WORLD', {
                separator: '-',
                includeForeignChars: false,
            }),
        ).toEqual('23-15-31-31-34-52-34-42-31-14');

        expect(
            encrypt('HELLO WORLD ', {
                separator: '-',
                includeForeignChars: true,
            }),
        ).toEqual('23-15-31-31-34- -52-34-42-31-14- ');

        expect(
            encrypt(' HELLO WORLD ', {
                separator: '-',
                includeForeignChars: false,
            }),
        ).toEqual('23-15-31-31-34-52-34-42-31-14');

        expect(
            encrypt(' HELLO-WORLD ', {
                separator: '-',
                includeForeignChars: false,
            }),
        ).toEqual('23-15-31-31-34-52-34-42-31-14');
    });

    test('Various', () => {
        expect(encrypt('')).toEqual('');
        expect(encrypt(' ')).toEqual(' ');
        expect(encrypt(' ', { separator: '-' })).toEqual(' ');

        expect(
            encrypt('a bc', { separator: ' ', includeForeignChars: true }),
        ).toEqual('11   12 13');

        expect(
            encrypt('a bc', { separator: ' ', includeForeignChars: false }),
        ).toEqual('11 12 13');

        expect(
            encrypt('I J', { separator: '-', includeForeignChars: false }),
        ).toEqual('24-24');

        expect(
            encrypt('I J', { separator: '-', includeForeignChars: true }),
        ).toEqual('24- -24');

        expect(
            encrypt('IJ', {
                alphabet: [
                    ['i', 'I'],
                    ['j', 'J'],
                ],
                separator: '-',
                includeForeignChars: true,
            }),
        ).toEqual('11-21');
    });
});

describe('Polybius square cipher - decryption', () => {
    test('decrypt with default options', () => {
        expect(decrypt('11 12 13')).toEqual('ABC');
        //expect(decrypt('11   12 13')).toEqual('A BC');
        //expect(decrypt('11 _ 12 13')).toEqual('A_BC');
        //expect(decrypt('11 _ 12 = 13')).toEqual('A_B=C');
        //expect(decrypt('  11 12 13')).toEqual(' ABC');
        //expect(decrypt('11 12 13  ')).toEqual('abc ');
        //expect(decrypt('  11 12 13  ')).toEqual(' abc ');
        //expect(decrypt('11 - 12 - 13')).toEqual('a-b-c');
        /*expect(decrypt('23 15 31 31 34   52 34 42 31 14')).toEqual(
            'HELLO WORLD',
        );*/
        expect(decrypt('24 24')).toEqual('II');
        //expect(decrypt('24 24 24   24 24 24')).toEqual('III III');
    });

    test('decrypt with custom separator', () => {
        expect(decrypt('111213', { separator: '' })).toEqual('ABC');
        expect(decrypt('11-12-13', { separator: '-' })).toEqual('ABC');
        //expect(decrypt('11- -12-13', { separator: '-' })).toEqual('a bc');
        expect(decrypt('11...12...13', { separator: '...' })).toEqual('ABC');
    });

    test('Various', () => {
        expect(decrypt('')).toEqual('');
        expect(decrypt('11 55')).toEqual('AZ');

        expect(() => decrypt('62 11', { includeForeignChars: false })).toThrow(
            'Invalid ciphertext: "62" does not correspond to a valid position in the provided alphabet.',
        );

        expect(() => decrypt('26 11', { includeForeignChars: false })).toThrow(
            'Invalid ciphertext: "26" does not correspond to a valid position in the provided alphabet.',
        );
    });
});
