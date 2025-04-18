import { ParsedQR, parseFullQR, QRParseMode } from '../../../../src';
import { PARSE_ERRORS } from '../../../../src/application/constants/qr-errors.constant';

/**
 * Unit tests for the parseFullQR use case.
 */
describe('parseFullQR Use Case', () => {
    // A full QR string including tags 00 (version), 53, 54, 59, 63 (CRC).
    // This example uses the CRC value "CADC" for illustration.
    const rawQR = [
        '00','02','01',           // payloadFormatIndicator = "01"
        '53','03','170',          // transactionCurrency = "170"
        '54','06','100.53',       // transactionAmount = "100.53"
        '59','13','Test Merchant',// merchantName = "Test Merchant"
        '63','04','CADC'          // CRC = "CADC"
    ].join('');

    it('should parse full QR in GLOBAL mode', () => {
        const result = parseFullQR(rawQR, { parseMode: QRParseMode.GLOBAL });
        const full = result as ParsedQR;

        // TLV array
        expect(Array.isArray(full.tlvs)).toBe(true);
        expect(full.tlvs.length).toBe(5);

        // Named fields
        expect(full.named.payloadFormatIndicator).toBe('01');
        expect(full.named.transactionCurrency).toBe('170');
        expect(full.named.transactionAmount).toBe('100.53');
        expect(full.named.merchantName).toBe('Test Merchant');

        // Raw object must be defined, then inspect its entries
        expect(full.raw).toBeDefined();
        expect(full.raw!['00']).toBe('01');
        expect(full.raw!['53']).toBe('170');
        expect(full.raw!['54']).toBe('100.53');
        expect(full.raw!['59']).toBe('Test Merchant');
        expect(full.raw!['63']).toBe('CADC');

        // CRC info
        expect(full.crc.value).toBe('CADC');
        expect(typeof full.crc.isValid).toBe('boolean');

        // Meta must be defined, then inspect
        expect(full.meta).toBeDefined();
        expect(full.meta!.format).toBe('EMVCO');
        expect(full.meta!.version).toBe('01');
        expect(full.meta!.region).toBe(QRParseMode.GLOBAL);
    });

    it('should parse full QR in CO mode', () => {
        const full = parseFullQR(rawQR, { parseMode: QRParseMode.CO }) as ParsedQR;

        // Region and some named fields
        expect(full.meta).toBeDefined();
        expect(full.meta!.region).toBe(QRParseMode.CO);
        expect(full.named.payloadFormatIndicator).toBe('01');
        expect(full.named.transactionCurrency).toBe('170');
    });

    it('should throw EMPTY_QR error for empty input', () => {
        expect(() => parseFullQR('', { parseMode: QRParseMode.GLOBAL }))
            .toThrowError(PARSE_ERRORS.EMPTY_QR);
    });

    it('should throw INVALID_TLV_FORMAT error for malformed input', () => {
        const bad = '1234';
        expect(() => parseFullQR(bad, { parseMode: QRParseMode.CO }))
            .toThrowError(PARSE_ERRORS.INVALID_TLV_FORMAT(bad));
    });

    it('should throw UNSUPPORTED_MODE error when mode is not GLOBAL or CO', () => {
        // @ts-expect-error testing invalid mode
        expect(() => parseFullQR(rawQR, { parseMode: QRParseMode.RAW_OBJECT }))
            .toThrowError(PARSE_ERRORS.UNSUPPORTED_MODE(QRParseMode.RAW_OBJECT));
    });
});
