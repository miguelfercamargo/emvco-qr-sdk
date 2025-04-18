import {validateQRString} from "../../../../../src";
import {PARSE_ERRORS} from "../../../../../src/application/constants/qr-errors.constant";


describe('validateQRString', () => {
    /**
     * @description
     * Should not throw when provided a non-empty, TLV-compliant string.
     */
    it('should pass for a valid TLV string', () => {
        // "00" tag, length "02", value "AB"
        expect(() => validateQRString('0002AB')).not.toThrow();
    });

    /**
     * @description
     * Should throw the EMPTY_QR error when the string is empty or only whitespace.
     */
    it('should throw EMPTY_QR error for empty or whitespace-only string', () => {
        expect(() => validateQRString('')).toThrowError(PARSE_ERRORS.EMPTY_QR);
        expect(() => validateQRString('   ')).toThrowError(PARSE_ERRORS.EMPTY_QR);
    });

    /**
     * @description
     * Should throw INVALID_TLV_FORMAT error when the string does not follow TLV format.
     */
    it('should throw INVALID_TLV_FORMAT for non-TLV format', () => {
        const input = 'foobar';
        expect(() => validateQRString(input)).toThrowError(
            PARSE_ERRORS.INVALID_TLV_FORMAT(input)
        );
    });
});
