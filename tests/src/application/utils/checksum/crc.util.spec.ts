import {CRC, getCrcInfo, TlvEntity} from "../../../../../src";
import { TAG_CRC } from "../../../../../src/application/constants/qr.constant";


describe('getCrcInfo', () => {
    /**
     * Should extract the CRC value from TLVs and return isValid = true
     * when CRC.isValidFormat() is true and CRC.validate() returns true.
     */
    it('returns the CRC value and marks it valid when format and check both succeed', () => {
        const raw = 'PAYLOADABCD';           // assume 'ABCD' is the 4‑char CRC at the end
        const crcValue = 'ABCD';
        const tlvs = [ new TlvEntity(TAG_CRC, crcValue) ];

        // stub static and instance methods
        jest.spyOn(CRC, 'isValidFormat').mockReturnValue(true);
        jest.spyOn(CRC.prototype, 'validate').mockReturnValue(true);

        const info = getCrcInfo(raw, tlvs);
        expect(info).toEqual({ value: crcValue, isValid: true });

        // restore spies
        (CRC.isValidFormat as jest.Mock).mockRestore();
        (CRC.prototype.validate as jest.Mock).mockRestore();
    });

    /**
     * Should return isValid = false when CRC format is invalid,
     * without calling CRC.validate().
     */
    it('returns isValid = false when CRC format is invalid', () => {
        const raw = 'ANYDATA0000';
        const tlvs = [ new TlvEntity(TAG_CRC, '0000') ];

        const formatSpy = jest.spyOn(CRC, 'isValidFormat').mockReturnValue(false);
        const validateSpy = jest.spyOn(CRC.prototype, 'validate');

        const info = getCrcInfo(raw, tlvs);
        expect(info).toEqual({ value: '0000', isValid: false });
        expect(formatSpy).toHaveBeenCalledWith('0000');
        expect(validateSpy).not.toHaveBeenCalled();

        formatSpy.mockRestore();
        validateSpy.mockRestore();
    });

    /**
     * Should return empty value and isValid = false when no CRC TLV is present.
     */
    it('returns empty value and isValid = false when CRC tag is missing', () => {
        const raw = 'SOMEDATA1234';
        const tlvs = [ new TlvEntity('00', '01'), new TlvEntity('53', '170') ];

        const info = getCrcInfo(raw, tlvs);
        expect(info).toEqual({ value: '', isValid: false });
    });
});
