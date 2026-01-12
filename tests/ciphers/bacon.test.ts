import { describe, expect, test } from 'vitest';
import {
    encrypt,
    decrypt,
    encryptInText,
    decryptInText,
} from '../../src/ciphers/bacon';

describe('Bacon cipher v1', () => {
    test('Encryption', () => {
        expect(encrypt('abcdefghijklmnopqrstuvwxyz', { version: 1 })).toEqual(
            'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbaabbbabaabababbabbababbb',
        );
        expect(encrypt('abc jinx vulture', { version: 1 })).toEqual(
            'aaaaaaaaabaaaba abaaaabaaaabbaababab baabbbaabbabababaababaabbbaaaaaabaa',
        );
        expect(
            encrypt('abc jinx vulture', {
                version: 1,
                includeForeignChars: false,
            }),
        ).toEqual(
            'aaaaaaaaabaaabaabaaaabaaaabbaabababbaabbbaabbabababaababaabbbaaaaaabaa',
        );
    });

    test('Decryption', () => {
        expect(
            decrypt(
                'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbaabbbabaabababbabbababbb',
                { version: 1 },
            ),
        ).toEqual('abcdefghiiklmnopqrstuuwxyz');
        expect(
            decrypt(
                'aaaaaaaaabaaaba abaaaabaaaabbaababab baabbbaabbabababaababaabbbaaaaaabaa',
                { version: 1 },
            ),
        ).toEqual('abciinxuulture');
        expect(
            decrypt(
                'gFaX8_Akl2:aog4Acz$B6olaeD)Awqµ#aK.OrnaSAJ_ax;kPa*q]_aB=jtn?Aöw€. MdairhGlkBC"=hzBVaÜv%iTmebxaO7hl3bnID+Fb6wkL(a§ö;a_s#7iA|pZbgp2~asoTaöZ8vaqaK/n4rBUep=a03_a!EdlvA71a,3BürbqsxA gA3_lu(1pevB+anh4TB#a6jrEK_9l?öB9€_bUqAv.a=öbBM)R?e55[B1&Äa7AB_9rb6a91A#fBa3d_Ak',
                { version: 1 },
            ),
        ).toEqual('baconiinxuue');
    });

    test('Encrypt in text', () => {
        expect(
            encryptInText(
                'jinx uve',
                'The quick brown fox jumps over the lazy dog',
                { version: 1 },
            ),
        ).toEqual('tHe quiCk broWN foX jUmPS ovER The LAzy Dog');
        expect(() =>
            encryptInText('abc', 'some short text', { version: 1 }),
        ).toThrow(
            `Text should not contain less letters than encrypted message (${
                'abc'.length * 5
            }), please provide more letters.`,
        );
    });
    test('Decrypt in text', () => {
        expect(
            decryptInText('tHe quiCk broWN foX jUmPS ovER The LAzy Dog', {
                version: 1,
            }),
        ).toEqual('iinxuue');
    });
});

describe('Bacon cipher v2', () => {
    test('Encryption', () => {
        // version 2 is default
        expect(encrypt('abcdefghijklmnopqrstuvwxyz')).toEqual(
            'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbabaabababbabbababbbbbaaabbaab',
        );
        expect(encrypt('abcdefghijklmnopqrstuvwxyz', { version: 2 })).toEqual(
            'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbabaabababbabbababbbbbaaabbaab',
        );
        expect(encrypt('abc jinx vulture', { version: 2 })).toEqual(
            'aaaaaaaaabaaaba abaababaaaabbabbabbb bababbabaaababbbaabbbabaabaaabaabaa',
        );
        expect(
            encrypt('abc jinx vulture', {
                version: 2,
                includeForeignChars: false,
            }),
        ).toEqual(
            'aaaaaaaaabaaabaabaababaaaabbabbabbbbababbabaaababbbaabbbabaabaaabaabaa',
        );
    });

    test('Decryption', () => {
        // version 2 is default
        expect(
            decrypt(
                'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbabaabababbabbababbbbbaaabbaab',
            ),
        ).toEqual('abcdefghijklmnopqrstuvwxyz');
        expect(
            decrypt(
                'aaaaaaaaabaaabaaaabbaabaaaababaabbaaabbbabaaaabaabababaababbabbaaabbababbbaabbbbbaaaabaaabbaababaabbbabaabababbabbababbbbbaaabbaab',
                { version: 2 },
            ),
        ).toEqual('abcdefghijklmnopqrstuvwxyz');
        expect(
            decrypt(
                'aaaaaaaaabaaaba abaababaaaabbabbabbb bababbabaaababbbaabbbabaabaaabaabaa',
                { version: 2 },
            ),
        ).toEqual('abcjinxvulture');
        expect(
            decrypt(
                'maD&aFA=a9b5K1ä:a-6rah;AyqvaoK*_a(g4dZuaalAÖbaabMeBbaG3abUBazbaQ8bAP=aQbafbWaA7o]kccanDabKµ923bk#FAbbd_ablBqb71fGb90aBa9oa8bAkb2aBp3aaBf4a6a7hc2jz62ipfr',
                { version: 2 },
            ),
        ).toEqual('baconjinxuve');
    });

    test('Encrypt in text', () => {
        expect(
            encryptInText(
                'jinx uve',
                'The quick brown fox jumps over the lazy dog',
                { version: 2 },
            ),
        ).toEqual('tHe qUiCk broWN fOX jUMPS oVer ThE lAzy Dog');
        expect(() =>
            encryptInText('abc', 'some short text', { version: 2 }),
        ).toThrow(
            `Text should not contain less letters than encrypted message (${
                'abc'.length * 5
            }), please provide more letters.`,
        );
    });
    test('Decrypt in text', () => {
        expect(
            decryptInText('tHe qUiCk broWN fOX jUMPS oVer ThE lAzy Dog', {
                version: 2,
            }),
        ).toEqual('jinxuve');
    });
});

test('Various', () => {
    expect(encrypt('Abc!', { includeForeignChars: true })).toEqual(
        'aaaaaaaaabaaaba!',
    );
    expect(encrypt('Abc!', { includeForeignChars: false })).toEqual(
        'aaaaaaaaabaaaba',
    );
    expect(
        encryptInText('abc', 'Find what you love and let it kill you.'),
    ).toEqual('find what yOu loVe and let it kill you.');
    expect(decryptInText('find what yOu loVe and let it kill you.')).toEqual(
        'abcaaa',
    );
    expect(() => encrypt('abc', { version: 3 })).toThrow(
        "Bacon cipher version '3' unknown - please select version 1 or 2.",
    );
});
