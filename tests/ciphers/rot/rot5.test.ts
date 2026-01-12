import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../../src/ciphers/rot/rot5';

describe('ROT5 cipher - encryption', () => {
    test('Shift', () => {
        expect(encrypt('1234567890')).toEqual('6789012345');
        expect(encrypt('ab!c 123', true)).toEqual('ab!c 678');
        expect(encrypt('ab!c 123', false)).toEqual('678');
    });
});

describe('ROT5 cipher - decryption', () => {
    test('Shift', () => {
        expect(decrypt('6789012345')).toEqual('1234567890');
        expect(decrypt('ab!c 678', true)).toEqual('ab!c 123');
        expect(decrypt('ab!c 678', false)).toEqual('123');
    });
});
