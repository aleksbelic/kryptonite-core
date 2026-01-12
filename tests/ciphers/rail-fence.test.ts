import { describe, expect, test } from 'vitest';
import { decrypt, encrypt } from '../../src/ciphers/rail-fence';

describe('Rail fence', () => {
    test('Rail fence - encryption', () => {
        expect(encrypt('ABCDEFG', { railCount: 1 })).toEqual('ABCDEFG');
        expect(encrypt('ABCDEFG', { railCount: 2 })).toEqual('ACEGBDF');
        expect(encrypt('WE ARE DISCOVERED FLEE AT ONCE')).toEqual(
            'WECRLTEERDSOEEFEAOCAIVDEN',
        );
        expect(
            encrypt('GROUND CONTROL TO MAJOR TOM', { railCount: 6 }),
        ).toEqual('GRTRTOROONLOMUOTJNCOADM');
    });

    test('Rail fence - encryption - case sensitive', () => {
        expect(encrypt('AbCdEfG', { caseSensitive: true })).toEqual('AEbdfCG');
        expect(encrypt('AbCdEfG', { caseSensitive: false })).toEqual('AEBDFCG');
    });

    test('Rail fence - encryption - include whitespace', () => {
        expect(encrypt('AB CD EF', { includeWhitespace: true })).toEqual(
            'ADBC F E',
        );
        expect(encrypt('AB CD EF', { includeWhitespace: false })).toEqual(
            'AEBDFC',
        );
    });

    test('Rail fence - encryption - various', () => {
        expect(
            encrypt('Welcome to the dark side', {
                railCount: 4,
                caseSensitive: true,
                includeWhitespace: true,
            }),
        ).toEqual('Wehkem ter elot  asdcodi');
        expect(
            encrypt('Welcome to the dark side', {
                railCount: 4,
                caseSensitive: false,
                includeWhitespace: true,
            }),
        ).toEqual('WEHKEM TER ELOT  ASDCODI');
        expect(
            encrypt('Welcome to the dark side', {
                railCount: 4,
                caseSensitive: false,
                includeWhitespace: false,
            }),
        ).toEqual('WEDDEMTEAIELOOHRSCTK');
        expect(
            encrypt('Welcome to the dark side', {
                railCount: 4,
                caseSensitive: true,
                includeWhitespace: false,
            }),
        ).toEqual('Weddemteaieloohrsctk');
    });

    test('Rail fence - decryption', () => {
        expect(decrypt('ABCDEFG', { railCount: 1 })).toEqual('ABCDEFG');
        expect(decrypt('ACEGBDF', { railCount: 2 })).toEqual('ABCDEFG');
        expect(decrypt('WECRLTEERDSOEEFEAOCAIVDEN')).toEqual(
            'WEAREDISCOVEREDFLEEATONCE',
        );
        expect(decrypt('GRTRTOROONLOMUOTJNCOADM', { railCount: 6 })).toEqual(
            'GROUNDCONTROLTOMAJORTOM',
        );
    });

    test('Rail fence - decryption - case sensitive', () => {
        expect(decrypt('AEbdfCG', { caseSensitive: true })).toEqual('AbCdEfG');
        expect(decrypt('AeBdFcG', { caseSensitive: false })).toEqual('ABCDEFG');
    });

    test('Rail fence - decryption - include whitespace', () => {
        expect(decrypt('ADBC F E', { includeWhitespace: true })).toEqual(
            'AB CD EF',
        );
        expect(decrypt('AE BD FC', { includeWhitespace: false })).toEqual(
            'ABCDEF',
        );
    });

    test('Rail fence - decryption - various', () => {
        expect(
            decrypt('Wehkem ter elot  asdcodi', {
                railCount: 4,
                caseSensitive: true,
                includeWhitespace: true,
            }),
        ).toEqual('Welcome to the dark side');
        expect(
            decrypt('Wehkem ter elot  asdcodi', {
                railCount: 4,
                caseSensitive: false,
                includeWhitespace: true,
            }),
        ).toEqual('WELCOME TO THE DARK SIDE');
        expect(
            decrypt('Weddemteaieloohrsctk', {
                railCount: 4,
                caseSensitive: false,
                includeWhitespace: false,
            }),
        ).toEqual('WELCOMETOTHEDARKSIDE');
        expect(
            decrypt('Weddemteaieloohrsctk', {
                railCount: 4,
                caseSensitive: true,
                includeWhitespace: false,
            }),
        ).toEqual('Welcometothedarkside');
    });
});
