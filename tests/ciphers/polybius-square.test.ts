import { describe, expect, test } from 'vitest';
import { encrypt } from '../../src/ciphers/polybius-square';

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
    });

    test('encrypt with custom separator', () => {
        expect(encrypt('abc', { separator: '-' })).toEqual('11-12-13');
        expect(encrypt('a bc', { separator: '-' })).toEqual('11- -12-13');
        expect(encrypt('ABC', { separator: '-' })).toEqual('11-12-13');
        expect(encrypt('abc', { separator: '...' })).toEqual('11...12...13');
    });

    test('encrypt with custom alphabet', () => {
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
            'Invalid param: alphabet should be a custom 2D array of strings.',
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
            }),
        ).toEqual('11 11 21 21 31 31');

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

    test('encrypt with defined includeForeignChars option', () => {
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
});
