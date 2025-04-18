import { isValidTLVFormat, Tag } from "../../../../../src";

describe('isValidTLVFormat', () => {
    /**
     * @description
     * Returns false for empty or too-short inputs (< 4 chars).
     */
    it('should return false for empty or very short strings', () => {
        expect(isValidTLVFormat('')).toBe(false);
        expect(isValidTLVFormat('000')).toBe(false);
    });

    /**
     * @description
     * Returns false when length substring is non-numeric.
     */
    it('should return false for non-numeric length field', () => {
        expect(isValidTLVFormat('00XXYY')).toBe(false);
    });

    /**
     * @description
     * Returns false if declared length exceeds available data.
     * e.g. length "05" but only "AB" (2 chars) follow.
     */
    it('should return false when declared length exceeds actual data', () => {
        expect(isValidTLVFormat('0005AB')).toBe(false);
    });

    /**
     * @description
     * Returns true for superficially valid TLV patterns.
     */
    it('should return true for a correct TLV header and matching length', () => {
        // "01" tag, length "02", value "AB"
        expect(isValidTLVFormat('0102AB')).toBe(true);
    });

    /**
     * @description
     * Tag.isValid only checks length==2; ensure it is called under the hood.
     */
    it('should rely on Tag.isValid for tag validation', () => {
        const spy = jest.spyOn(Tag, 'isValid');
        isValidTLVFormat('0201X');
        expect(spy).toHaveBeenCalledWith('02');
        spy.mockRestore();
    });
});
