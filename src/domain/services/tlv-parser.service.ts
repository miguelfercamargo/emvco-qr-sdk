import { PARSE_ERRORS } from '../../application/constants/qr-errors.constant';
import { TlvEntity } from '../entities/tlv.entity';

/**
 * Service responsible for parsing a raw TLV-encoded string into structured `TlvEntity` objects.
 *
 * Supports recursive parsing of nested TLVs (e.g., value fields that themselves contain TLV structures),
 * commonly used in QR codes that follow the EMVCo standard.
 */
export class TlvParserService {
  /**
   * Parses a TLV-encoded string into a list of `TlvEntity` instances.
   *
   * The TLV (Tag-Length-Value) format assumes that:
   * - Each tag is 2 characters long.
   * - Each length is 2 characters, representing the length of the value in characters.
   * - The value follows the length field, and may itself be recursively parsed as a TLV string.
   *
   * @param tlvString - The raw TLV-encoded string.
   * @param recursive - Whether to recursively parse value fields that are TLV-encoded. Defaults to `true`.
   *
   * @returns An array of parsed `TlvEntity` objects representing the structure of the input string.
   *
   * @throws {Error} If the input string is invalid (e.g., incomplete, malformed length, or overflows).
   */
  public static parse(tlvString: string, recursive: boolean = true): TlvEntity[] {
    const result: TlvEntity[] = [];
    let index = 0;

    while (index < tlvString.length) {
      if (index + 4 > tlvString.length) {
        throw new Error(PARSE_ERRORS.EMPTY_QR);
      }

      const tag = tlvString.substring(index, index + 2);
      index += 2;

      const lengthStr = tlvString.substring(index, index + 2);
      index += 2;

      const length = parseInt(lengthStr, 10);
      if (isNaN(length)) {
        throw new Error(PARSE_ERRORS.INVALID_LENGTH(lengthStr, tag));
      }

      if (index + length > tlvString.length) {
        throw new Error(PARSE_ERRORS.EXCEEDS_AVAILABLE(tag));
      }

      const value = tlvString.substring(index, index + length);
      index += length;

      let subTags: TlvEntity[] | undefined = undefined;

      if (recursive && value.length >= 4) {
        try {
          const parsed = TlvParserService.parse(value, recursive);
          const reconstructed = parsed.map((child) => child.toString()).join('');

          if (reconstructed === value && parsed.length > 0) {
            subTags = parsed;
          }
        } catch (error) {
          // Nested value is not a valid TLV string — assumed to be raw data (e.g., merchant name).
        }
      }

      result.push(new TlvEntity(tag, value, subTags));
    }

    return result;
  }
}
