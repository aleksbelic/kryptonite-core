import { describe, expect, test, vi } from 'vitest';
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
    });

    test('encrypt with custom separator', () => {
        expect(encrypt('abc', { separator: '-' })).toEqual('11-12-13');
        expect(encrypt('a bc', { separator: '-' })).toEqual('11- -12-13');
        expect(encrypt('ABC', { separator: '-' })).toEqual('11-12-13');
    });
});
