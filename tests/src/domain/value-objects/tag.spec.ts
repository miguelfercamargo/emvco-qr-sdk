import {Tag} from "../../../../src";

describe('Tag Value Object', () => {
    /**
     * @description
     * Verifies that a two-character string can be used to construct a valid Tag.
     * Also ensures that `toString()` returns the original value.
     */
    it('should construct successfully for a valid two-character tag', () => {
        const value = 'A1';
        const tag = new Tag(value);
        expect(tag).toBeInstanceOf(Tag);
        expect(tag.toString()).toBe(value);
    });

    /**
     * @description
     * Ensures that constructing a Tag with an empty string
     * throws an error explaining the invalid length.
     */
    it('should throw if constructed with an empty string', () => {
        expect(() => new Tag('')).toThrowError(
            'Invalid Tag: . A valid tag must be exactly 2 characters.'
        );
    });

    /**
     * @description
     * Ensures that constructing a Tag with a one-character string
     * throws an error specifying the invalid input.
     */
    it('should throw if constructed with a one-character string', () => {
        expect(() => new Tag('X')).toThrowError(
            'Invalid Tag: X. A valid tag must be exactly 2 characters.'
        );
    });

    /**
     * @description
     * Ensures that constructing a Tag with a three-character string
     * throws an error specifying the invalid input.
     */
    it('should throw if constructed with a three-character string', () => {
        expect(() => new Tag('XYZ')).toThrowError(
            'Invalid Tag: XYZ. A valid tag must be exactly 2 characters.'
        );
    });

    /**
     * @description
     * Tests the static `isValid()` helper for various inputs.
     */
    it('should correctly validate tag strings with isValid()', () => {
        expect(Tag.isValid('00')).toBe(true);
        expect(Tag.isValid('AB')).toBe(true);
        expect(Tag.isValid('')).toBe(false);
        expect(Tag.isValid('A')).toBe(false);
        expect(Tag.isValid('ABC')).toBe(false);
        expect(Tag.isValid((123 as unknown) as string)).toBe(false);
    });
});
