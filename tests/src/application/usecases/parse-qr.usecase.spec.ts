/**
 * Unit tests for the parseQR use case.
 */
import {parseQR, QRParseMode, TlvEntity} from "../../../../src";
import {PARSE_ERRORS} from "../../../../src/application/constants/qr-errors.constant";

describe('parseQR Use Case', () => {
    /** Simple TLV string: tag "00" → "01", tag "53" → "170". */
    const simpleTlv = '0002015303170';

    /**
     * Ensures that TLV mode returns an array of TlvEntity instances.
     */
    it('should return TlvEntity[] in TLV mode (default)', () => {
        const result = parseQR(simpleTlv);
        expect(Array.isArray(result)).toBe(true);
        const entities = result as TlvEntity[];
        expect(entities).toHaveLength(2);
        expect(entities[0]).toBeInstanceOf(TlvEntity);
        expect(entities[0].tag).toBe('00');
        expect(entities[0].value).toBe('01');
        expect(entities[1].tag).toBe('53');
        expect(entities[1].value).toBe('170');
    });

    /**
     * Validates RAW_OBJECT mode returns a flat object with raw tag keys.
     */
    it('should return a raw object in RAW_OBJECT mode', () => {
        const raw = parseQR(simpleTlv, { parseMode: QRParseMode.RAW_OBJECT });
        expect(typeof raw).toBe('object');
        const obj = raw as Record<string, any>;
        expect(obj['00']).toBe('01');
        expect(obj['53']).toBe('170');
        expect(obj['54']).toBeUndefined();
    });

    /**
     * Verifies GLOBAL mode maps tags to standard EMVCo field names.
     */
    it('should return named global fields in GLOBAL mode', () => {
        const global = parseQR(simpleTlv, { parseMode: QRParseMode.GLOBAL });
        const g = global as Record<string, any>;
        expect(g.payloadFormatIndicator).toBe('01');
        expect(g.transactionCurrency).toBe('170');
    });

    /**
     * Verifies CO mode uses Colombian-specific mappings.
     */
    it('should return named Colombian fields in CO mode', () => {
        const co = parseQR(simpleTlv, { parseMode: QRParseMode.CO });
        const c = co as Record<string, any>;
        expect(c.payloadFormatIndicator).toBe('01');
        expect(c.transactionCurrency).toBe('170');
    });

    /**
     * Throws an error when the input string is empty.
     */
    it('should throw EMPTY_QR error for empty input', () => {
        expect(() => parseQR('')).toThrowError(PARSE_ERRORS.EMPTY_QR);
    });

    /**
     * Throws an error when the input is not TLV-formatted.
     */
    it('should throw INVALID_TLV_FORMAT error for malformed input', () => {
        const bad = 'abcd';
        expect(() => parseQR(bad)).toThrowError(
            PARSE_ERRORS.INVALID_TLV_FORMAT(bad)
        );
    });
});
