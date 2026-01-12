import { describe, expect, test, vi } from 'vitest';
import {
    encrypt,
    decrypt,
    printShift,
    printAllShifts,
} from '../../src/ciphers/caesar';
import { ALPHABET_SR_CYR } from '../../src/globals';

describe('Caesar cipher - encryption', () => {
    test('Shift', () => {
        expect(encrypt('abcdefghijklmnopqrstuvwxyz', { shift: 1 })).toEqual(
            'bcdefghijklmnopqrstuvwxyza',
        );
        expect(encrypt('abcdefghijklmnopqrstuvwxyz', { shift: -1 })).toEqual(
            'zabcdefghijklmnopqrstuvwxy',
        );
        expect(encrypt('abc', { shift: 30 })).toEqual('efg');
        expect(encrypt('abc', { shift: -30 })).toEqual('wxy');
    });

    test('Case sensitive', () => {
        expect(encrypt('ABc', { shift: 1, caseSensitive: true })).toEqual(
            'BCd',
        );
        expect(encrypt('aBc', { shift: 1, caseSensitive: false })).toEqual(
            'bcd',
        );
    });

    test('Include foreign chars', () => {
        expect(
            encrypt('ab!c', {
                shift: 1,
                caseSensitive: true,
                includeForeignChars: true,
            }),
        ).toEqual('bc!d');
        expect(
            encrypt('ab!c', {
                shift: 1,
                caseSensitive: true,
                includeForeignChars: false,
            }),
        ).toEqual('bcd');
    });

    test('Custom alphabet', () => {
        expect(() => encrypt('a', { shift: 1, alphabet: ['a'] })).toThrow(
            'Invalid alphabet: it needs to be at least 2 characters long.',
        );
        expect(() =>
            encrypt('abc', { shift: 1, alphabet: ['c', 'b', 'a', 'c', 'd'] }),
        ).toThrow('Invalid alphabet: it must not contain duplicates.');
        expect(
            encrypt('Ако не почнеш, нећеш ни завршити', {
                shift: 10,
                caseSensitive: true,
                includeForeignChars: true,
                alphabet: ALPHABET_SR_CYR,
            }),
        ).toEqual('Јтч хњ џчжхњи, хњвњи хр пјлширбр');
    });

    test('Various', () => {
        expect(
            encrypt(
                'Ignavi coram morte quidem animam trahunt, audaces autem illam non saltem advertunt.',
                { shift: 5 },
            ),
        ).toBe(
            'Nlsfan htwfr rtwyj vznijr fsnrfr ywfmzsy, fzifhjx fzyjr nqqfr sts xfqyjr fiajwyzsy.',
        );
        expect(
            encrypt('Veni, vidi, vici.', {
                shift: 22,
                caseSensitive: false,
                includeForeignChars: false,
            }),
        ).toBe('rajerezereye');
    });
});

describe('Caesar cipher - decryption', () => {
    test('Shift', () => {
        expect(decrypt('bcdefghijklmnopqrstuvwxyza', { shift: 1 })).toEqual(
            'abcdefghijklmnopqrstuvwxyz',
        );
        expect(decrypt('zabcdefghijklmnopqrstuvwxy', { shift: -1 })).toEqual(
            'abcdefghijklmnopqrstuvwxyz',
        );
        expect(decrypt('efg', { shift: 30 })).toEqual('abc');
        expect(decrypt('wxy', { shift: -30 })).toEqual('abc');
    });

    test('Case sensitive', () => {
        expect(decrypt('BCd', { shift: 1, caseSensitive: true })).toEqual(
            'ABc',
        );
        expect(decrypt('bCd', { shift: 1, caseSensitive: false })).toEqual(
            'abc',
        );
    });

    test('Include foreign chars', () => {
        expect(
            decrypt('bc!d', {
                shift: 1,
                caseSensitive: true,
                includeForeignChars: true,
            }),
        ).toEqual('ab!c');
        expect(
            decrypt('bc!d', {
                shift: 1,
                caseSensitive: true,
                includeForeignChars: false,
            }),
        ).toEqual('abc');
    });

    test('Custom alphabet', () => {
        expect(() => decrypt('a', { shift: 1, alphabet: ['a'] })).toThrow(
            'Invalid alphabet: it needs to be at least 2 characters long.',
        );
        expect(() =>
            decrypt('bcd', { shift: 1, alphabet: ['c', 'b', 'a', 'c', 'd'] }),
        ).toThrow('Invalid alphabet: it must not contain duplicates.');
        expect(
            decrypt('Јтч хњ џчжхњи, хњвњи хр пјлширбр', {
                shift: 10,
                caseSensitive: true,
                includeForeignChars: true,
                alphabet: ALPHABET_SR_CYR,
            }),
        ).toEqual('Ако не почнеш, нећеш ни завршити');
    });

    test('Various', () => {
        expect(
            decrypt('T slgp yz topl hsle T lx oztyr', { shift: -15 }),
        ).toEqual('I have no idea what I am doing');
        expect(decrypt('Qjen wx onja xo rln lxum KNNA', { shift: 9 })).toEqual(
            'Have no fear of ice cold BEER',
        );
    });
});

describe('Caesar cipher - console.log output', () => {
    test('Print shift', () => {
        const consoleLogSpy = vi.spyOn(global.console, 'log');

        printShift('abc', { shift: 1 });

        expect(consoleLogSpy).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith('bcd');
        expect(consoleLogSpy.mock.calls).toContainEqual(['bcd']);

        consoleLogSpy.mockRestore();
    });

    test('Print all shift', () => {
        const consoleLogSpy = vi.spyOn(global.console, 'log');

        printAllShifts('a', { alphabet: ['a', 'b', 'c'] });

        expect(consoleLogSpy).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledTimes(3);
        expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'a');
        expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'b');
        expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'c');
        expect(consoleLogSpy.mock.calls).toEqual([['a'], ['b'], ['c']]);

        consoleLogSpy.mockRestore();
    });
});
