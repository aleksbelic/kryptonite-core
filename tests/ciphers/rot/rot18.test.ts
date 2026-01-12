import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../../src/ciphers/rot/rot18';

describe('ROT18 cipher - encryption', () => {
    test('Shift', () => {
        expect(encrypt('1234567890abcdefghijklmnopqrstuvwxyz')).toEqual(
            '6789012345nopqrstuvwxyzabcdefghijklm',
        );
        expect(encrypt('123aBc')).toEqual('678nOp');
        expect(encrypt('123aBc', false)).toEqual('678nop');
        expect(encrypt('123 aBc', undefined, true)).toEqual('678 nOp');
        expect(encrypt('123 aBc', undefined, false)).toEqual('678nOp');
    });
});

describe('ROT18 cipher - decryption', () => {
    test('Shift', () => {
        expect(decrypt('6789012345nopqrstuvwxyzabcdefghijklm')).toEqual(
            '1234567890abcdefghijklmnopqrstuvwxyz',
        );
        expect(decrypt('678nOp')).toEqual('123aBc');
        expect(decrypt('678nOp', false)).toEqual('123abc');
        expect(decrypt('678!nOp', undefined, true)).toEqual('123!aBc');
        expect(decrypt('678!nOp', undefined, false)).toEqual('123aBc');
    });
});
