import { ALPHABET_EN } from './globals';

/**
 * Checks if given char or string is upper case.
 *
 * @param text
 * @returns true if given char or string is upper case
 *
 * @example
 * isUpperCase('a');
 * // returns false
 *
 * isUpperCase('A');
 * // returns true
 */
export function isUpperCase(text: string): boolean {
    if (text.length === 0)
        throw new Error('Invalid param: an empty string provided.');
    return text === text.toUpperCase();
}

/**
 * Returns key of the specified value for given map
 *
 * @param map
 * @param value value whose key we're looking for
 * @returns key for given value or undefined if value not found in map
 *
 * @example
 * getMapKeyByValue(new Map([['a', 'alpha'],['b', 'beta']]),'alpha')
 * // returns 'a'
 *
 * getMapKeyByValue(new Map([['a', 'alpha'],['b', 'beta']]),'gama')
 * // returns undefined
 */
export function getMapKeyByValue(
    map: Map<string, string>,
    value: string,
): string | undefined {
    if (!(map instanceof Map)) {
        throw new Error('Invalid param: please provide an instance of Map.');
    }

    for (const [k, v] of map) {
        if (v === value) return k;
    }

    return undefined;
}

/**
 * Returns an array of unique chars for specified text
 *
 * @param text
 * @param [caseSensitive=false] if upper/lower case makes difference
 * @returns array of unique chars
 *
 * @example
 * getUniqueCharsFromText('abba');
 * // returns ['a', 'b']
 *
 * getUniqueCharsFromText('ABba', true);
 * // returns ['A', 'B', 'b', 'a']
 *
 * getUniqueCharsFromText('Today was a good day');
 * // returns ['T', 'o', 'd', 'a', 'y', ' ', 'w', 's', 'g']
 */
export function getUniqueCharsFromText(
    text: string,
    caseSensitive = false,
): string[] {
    if (!caseSensitive) {
        text = text.toLowerCase();
    }
    return [...new Set(text)];
}

/**
 * Returns shifted pair-letter for given char, rotation number & alphabet
 *
 * @param char letter in alphabet whose shifted pair we're looking for, case insensitive
 * @param shift number of left or right alphabet rotations
 * @param [alphabet=ALPHABET_EN] used alphabet
 * @returns shifted character
 *
 * @example
 * getShiftedChar('a', 1)
 * // returns 'b'
 *
 * getShiftedChar('a', -1)
 * // returns 'z'
 */
export function getShiftedChar(
    char: string,
    shift: number,
    alphabet = ALPHABET_EN,
): string | undefined {
    if (Math.abs(shift) > alphabet.length) {
        shift %= alphabet.length;
    }
    if (shift < 0) {
        shift = alphabet.length + shift;
    }

    let shiftedChar: string | undefined = undefined;
    const charIndexInAlphabet = alphabet.indexOf(char.toLowerCase());

    if (charIndexInAlphabet !== -1) {
        shiftedChar = alphabet[(charIndexInAlphabet + shift) % alphabet.length];
    }

    return shiftedChar;
}

/**
 * Checks if user defined alphabet is valid
 *
 * @param alphabet user defined alphabet being checked
 * @returns true
 */
export function checkAlphabet(alphabet: string[]): boolean | never {
    if (!Array.isArray(alphabet)) {
        throw new Error(
            'Invalid alphabet: please provide an array of single-letter chars.',
        );
    }

    if (alphabet.length < 2) {
        throw new Error(
            'Invalid alphabet: it needs to be at least 2 characters long.',
        );
    }

    for (const char of alphabet) {
        if (
            typeof char !== 'string' ||
            char.length !== 1 ||
            char.length !== char.trim().length
        ) {
            throw new Error(
                'Invalid alphabet: it should contain only single-letter chars.',
            );
        }
    }

    if (
        alphabet.toString().toLowerCase() !==
        [...new Set(alphabet.map(char => char.toLowerCase()))].toString()
    ) {
        throw new Error('Invalid alphabet: it must not contain duplicates.');
    }

    return true;
}

/**
 * Returns random printable ASCII char
 *
 * @returns random printable ASCII char
 *
 * @example
 * getRandomAsciiChar()
 * // returns 'k'
 */
export function getRandomAsciiChar(): string {
    return String.fromCharCode(Math.floor(Math.random() * 95) + 32);
}

/**
 * Returns count of existing chars found in provided text
 * 
 * @param text
 * @param [caseSensitive=false] if correct input of upper case and lower case matters
 * @param [onlyLetters=true] count only letters, skip special characters
 * @returns count of existing chars found in provided text
 * 
 * @example
 * getCharCount('This is some text.')
 * // returns
[
  { char: 't', count: 3 },
  { char: 'h', count: 1 },
  { char: 'i', count: 2 },
  { char: 's', count: 3 },
  { char: 'o', count: 1 },
  { char: 'm', count: 1 },
  { char: 'e', count: 2 },
  { char: 'x', count: 1 }
]
 */
export function getCharCount(
    text: string,
    caseSensitive = false,
    onlyLetters = true,
): Array<{ char: string; count: number }> {
    if (onlyLetters) {
        text = text.replace(/[^\p{Letter}]/gu, '');
    }

    if (!caseSensitive) {
        text = text.toLowerCase();
    }

    const charCountArray: Array<{ char: string; count: number }> = [];
    let charFound: boolean;

    for (const textChar of text) {
        charFound = false;
        for (const charCountArrayItem of charCountArray) {
            if (charCountArrayItem.char === textChar) {
                charCountArrayItem.count++;
                charFound = true;
                break;
            }
        }
        if (!charFound) {
            charCountArray.push({ char: textChar, count: 1 });
        }
    }

    return charCountArray;
}

/**
 * Returns relative frequency of existing chars found in provided text
 *
 * @param text
 * @param [caseSensitive=false] if correct input of upper case and lower case matters
 * @param [onlyLetters=true] count only letters, skip special characters
 * @returns count of existing chars found in provided text
 *
 * @example
 * getCharFrequency('This is some text.')
 * returns
 */
export function getCharFrequency(
    text: string,
    caseSensitive = false,
    onlyLetters = true,
): Array<{ char: string; freq: number }> {
    if (onlyLetters) {
        text = text.replace(/[^\p{Letter}]/gu, '');
    }

    if (!caseSensitive) {
        text = text.toLowerCase();
    }

    const charCountArray = getCharCount(text, caseSensitive, onlyLetters);
    const charFrequencyArray: { char: string; freq: number }[] = [];

    for (const charCountArrayItem of charCountArray) {
        charFrequencyArray.push({
            char: charCountArrayItem.char,
            freq: Number((charCountArrayItem.count / text.length).toFixed(4)),
        });
    }

    return charFrequencyArray;
}

/**
 * TODO
 */
export function sortCharCountArray(
    charCountArray: Array<{ char: string; count: number }>,
    sortType = 'dsc',
): Array<{ char: string; count: number }> {
    let sortedCharCountArray: Array<{ char: string; count: number }> = [];
    if (sortType.toLowerCase() === 'dsc') {
        sortedCharCountArray = charCountArray.sort(
            (char1, char2) => char2.count - char1.count,
        );
    } else if (sortType.toLowerCase() === 'asc') {
        sortedCharCountArray = charCountArray.sort(
            (char1, char2) => char1.count - char2.count,
        );
    } else {
        throw new Error(`Invalid param: sort type '${sortType}' unknown.`);
    }

    return sortedCharCountArray;
}

/**
 * Replaces all chars found in provided map with their replacement pair
 *
 * @param text
 * @param replacementMap map of replacement pairs
 * @param caseSensitive // TODO
 * @returns count of existing chars found in provided text
 *
 * @example
 * replaceChars('abc', new Map([['a', 'x'], ['b', 'y']]))
 * // returns 'xyc'
 */
export function replaceChars(
    text: string,
    replacementMap: Map<string, string>,
): string {
    replacementMap.forEach((replacement, original) => {
        text = text.replaceAll(original, replacement);
    });

    return text;
}
