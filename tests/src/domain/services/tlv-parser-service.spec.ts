import {TlvEntity, TlvParserService} from "../../../../src";
import {PARSE_ERRORS} from "../../../../src/application/constants/qr-errors.constant";

describe("TlvParserService", () => {
    /**
     * Parses a simple flat TLV string containing two basic fields.
     * Expects two TlvEntity instances without nested subtags.
     */
    it("should parse a simple TLV string into TlvEntity array", () => {
        const tlvString = "0002015303170";
        const result = TlvParserService.parse(tlvString);

        expect(result).toHaveLength(2);

        const [first, second] = result;
        expect(first).toBeInstanceOf(TlvEntity);
        expect(first.tag).toBe("00");
        expect(first.value).toBe("01");
        expect(first.length).toBe(2);
        expect(first.subTags).toBeUndefined();

        expect(second.tag).toBe("53");
        expect(second.value).toBe("170");
        expect(second.length).toBe(3);
        expect(second.subTags).toBeUndefined();
    });

    /**
     * Validates that when `recursive = true`, a TLV entity with a nested TLV value
     * is parsed recursively and subTags are assigned.
     * Example input: tag 26 → value is "00041002", which itself is TLV ("00": "1002").
     */
    it("should parse nested TLV when recursive is true", () => {
        const nestedString = "260800041002";
        const [entity] = TlvParserService.parse(nestedString);

        expect(entity.tag).toBe("26");
        expect(entity.value).toBe("00041002");
        expect(entity.length).toBe(8);
        expect(entity.subTags).toBeDefined();
        expect(entity.subTags).toHaveLength(1);

        const sub = entity.subTags![0];
        expect(sub.tag).toBe("00");
        expect(sub.value).toBe("1002");
        expect(sub.length).toBe(4);
        expect(sub.subTags).toBeUndefined();
    });

    /**
     * Ensures that no recursive parsing is performed when `recursive = false`,
     * even if the value could be interpreted as a TLV.
     */
    it("should not parse nested TLV when recursive is false", () => {
        const nestedString = "260800041002";
        const [entity] = TlvParserService.parse(nestedString, false);
        expect(entity.subTags).toBeUndefined();
    });

    /**
     * Parses an empty string — expected to return an empty TLV array.
     */
    it("should return an empty array for an empty string", () => {
        expect(TlvParserService.parse("", true)).toEqual([]);
    });

    /**
     * Validates that a too-short string (e.g., "00") throws an EMPTY_QR error,
     * as it cannot represent a valid TLV block (needs tag+length at least).
     */
    it("should throw EMPTY_QR error for a too-short non‑empty string", () => {
        expect(() => TlvParserService.parse("00", true)).toThrowError(
            PARSE_ERRORS.EMPTY_QR
        );
    });

    /**
     * Simulates a case where the length field is not a valid number (e.g., "XX").
     * Should throw INVALID_LENGTH for the tag involved.
     */
    it("should throw INVALID_LENGTH error for non-numeric length", () => {
        const invalidLength = "00XX01";
        expect(() => TlvParserService.parse(invalidLength)).toThrowError(
            PARSE_ERRORS.INVALID_LENGTH("XX", "00")
        );
    });

    /**
     * Simulates a case where the specified length exceeds the actual remaining
     * characters in the TLV string. Should throw EXCEEDS_AVAILABLE.
     */
    it("should throw EXCEEDS_AVAILABLE error when length exceeds available data", () => {
        const exceeds = "00050001"; // tag 00, length 05, but only 2 chars remain ("01")
        expect(() => TlvParserService.parse(exceeds)).toThrowError(
            PARSE_ERRORS.EXCEEDS_AVAILABLE("00")
        );
    });
});
