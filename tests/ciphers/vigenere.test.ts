import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../src/ciphers/vigenere';

describe('Vigenère cipher - encryption', () => {
    test('Basic', () => {
        expect(encrypt('', { key: 'secretkey' })).toEqual('');
        expect(
            encrypt('abcdefghijklmnopqrstuvwxyz', { key: 'cowabunga' }),
        ).toEqual('cpydfztnilyhmoicwruhqvxrlf');
        expect(
            encrypt('this is my secret message', { key: 'secretkey' }),
        ).toEqual('llkj ml wc qwgtvx fowqskg');
        expect(
            encrypt('My name is Bond, James Bond.', {
                key: 'secretkey',
                caseSensitive: true,
            }),
        ).toEqual('Ec prqx sw Zgrf, Aefow Zgrf.');
        expect(
            encrypt('My name is Bond, James Bond.', {
                key: 'secretkey',
                caseSensitive: false,
            }),
        ).toEqual('ec prqx sw zgrf, aefow zgrf.');
        expect(
            encrypt('My name is Bond, James Bond.', {
                key: 'secretkey',
                includeForeignChars: false,
            }),
        ).toEqual('EcprqxswZgrfAefowZgrf');
    });
});

describe('Vigenère cipher - decryption', () => {
    test('Basic', () => {
        expect(decrypt('', { key: 'secretkey' })).toEqual('');
        expect(
            decrypt('cpydfztnilyhmoicwruhqvxrlf', { key: 'cowabunga' }),
        ).toEqual('abcdefghijklmnopqrstuvwxyz');
        expect(
            decrypt('llkj ml wc qwgtvx fowqskg', { key: 'secretkey' }),
        ).toEqual('this is my secret message');
        expect(
            decrypt('Ec prqx sw Zgrf, Aefow Zgrf.', {
                key: 'secretkey',
                caseSensitive: true,
            }),
        ).toEqual('My name is Bond, James Bond.');
        expect(
            decrypt('Ec prqx sw Zgrf, Aefow Zgrf.', {
                key: 'secretkey',
                caseSensitive: false,
            }),
        ).toEqual('my name is bond, james bond.');
        expect(
            decrypt('Ec prqx sw Zgrf, Aefow Zgrf.', {
                key: 'secretkey',
                includeForeignChars: false,
            }),
        ).toEqual('MynameisBondJamesBond');
    });
});
