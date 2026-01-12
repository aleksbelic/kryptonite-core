import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../../src/ciphers/morse';

describe('Morse code - encryption', () => {
    test('ITU Standard', () => {
        expect(encrypt('abcdefghijklmnopqrstuvwxyz')).toEqual(
            '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..',
        );
        expect(encrypt('1234567890')).toEqual(
            '.---- ..--- ...-- ....- ..... -.... --... ---.. ----. -----',
        );
        expect(encrypt('.,?\'!/()&:;=+-_"$@')).toEqual(
            '.-.-.- --..-- ..--.. .----. -.-.-- -..-. -.--. -.--.- .-... ---... -.-.-. -...- .-.-. -....- ..--.- .-..-. ...-..- .--.-.',
        );
    });

    test('Unknown char', () => {
        expect(() => encrypt('aßc')).toThrow(
            "Character 'ß' is not defined in Morse code.",
        );
    });

    test('Non-unique short mark, long mark or spacing.', () => {
        expect(() =>
            encrypt('abc abc', { short: 'x', long: 'x', space: 'y' }),
        ).toThrow(
            'Please use different characters for short mark, long mark & spacing between the words.',
        );
    });

    test('Whitespace', () => {
        expect(encrypt('The quick brown fox jumps over the lazy dog')).toEqual(
            '- .... . / --.- ..- .. -.-. -.- / -... .-. --- .-- -. / ..-. --- -..- / .--- ..- -- .--. ... / --- ...- . .-. / - .... . / .-.. .- --.. -.-- / -.. --- --.',
        );
    });

    test('Custom short mark, long mark & space', () => {
        expect(
            encrypt(
                "Life is like a box of chocolates. You never know what you're gonna get.",
                { short: 'X', long: '?', space: '*' },
            ),
        ).toEqual(
            'X?XX XX XX?X X * XX XXX * X?XX XX ?X? X * X? * ?XXX ??? ?XX? * ??? XX?X * ?X?X XXXX ??? ?X?X ??? X?XX X? ? X XXX X?X?X? * ?X?? ??? XX? * ?X X XXX? X X?X * ?X? ?X ??? X?? * X?? XXXX X? ? * ?X?? ??? XX? X????X X?X X * ??X ??? ?X ?X X? * ??X X ? X?X?X?',
        );
    });

    test('Various', () => {
        expect(encrypt('abc')).toEqual('.- -... -.-.');
        expect(encrypt('Ab cd')).toEqual('.- -... / -.-. -..');
        expect(encrypt('x y z', { short: 'o', long: '=', space: '#' })).toEqual(
            '=oo= # =o== # ==oo',
        );
    });
});

describe('Morse code - decryption', () => {
    test('Non-unique short mark, long mark or spacing.', () => {
        expect(() =>
            decrypt('x= =xxx =x=x', { short: 'x', long: '=', space: 'x' }),
        ).toThrow(
            'Please use different characters for short mark, long mark & spacing between the words.',
        );
    });

    test('Unknown char', () => {
        expect(() => decrypt('.- -... -.-.-.-.-')).toThrow(
            "Character '-.-.-.-.-' could not be decrypted.",
        );
    });

    test('Various', () => {
        expect(decrypt('.- -... -.-.')).toEqual('abc');
        expect(decrypt('.- -... / -.-. -..')).toEqual('ab cd');
        expect(
            decrypt('=oo= # =o== # ==oo', {
                short: 'o',
                long: '=',
                space: '#',
            }),
        ).toEqual('x y z');
    });
});
