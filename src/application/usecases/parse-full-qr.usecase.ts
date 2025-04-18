/**
 * Use case for parsing and fully interpreting an EMVCo QR string.
 *
 * Outputs the raw TLV, named fields, and metadata including CRC validation.
 */

import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';
import { TlvParserService } from '../../domain/services/tlv-parser.service';
import { PARSE_ERRORS } from '../constants/qr-errors.constant';
import {
  DEFAULT_PAYLOAD_VERSION_FIELD,
  DEFAULT_RECURSIVE,
  EMV_QR_FORMAT,
  FALLBACK_TLV_VERSION,
} from '../constants/qr.constant';
import { getNamedHandler } from '../services/qr-mode-handlers.service';
import { RawObjectMapperService } from '../services/raw-object-mapper.service';
import { FullQrParsingOptions } from '../types/full-parse-options.type';
import { ParsedQR } from '../types/parsed-qr.interface';
import { getCrcInfo } from '../utils/checksum/crc.util';
import { validateQRString } from '../utils/validators/validate-qr-string.util';

/**
 * Parses a full EMVCo QR code and returns a complete structured representation with metadata and validation.
 *
 * This use case is specifically designed for high-level use where all parts of the QR code need to be analyzed,
 * including its decoded content, format version, CRC validation, and mapping by region.
 *
 * The return object includes:
 *
 * - `named`: A fully mapped object using either global (EMVCo standard) or Colombian (EASPBV) tag names.
 * - `raw`: Returns a plain object (`Record<string, any>`) where keys are the raw tag identifiers (e.g., `"26"`),
 *   and values are either:
 *   - The raw value (string), or
 *   - A nested object containing sub-tag values (e.g., `{ "00": "...", "01": "..." }`).
 *  This representation preserves the original numeric tag structure without applying any naming strategies.
 * - `tlvs`: The raw TLV array (`TlvEntity[]`) parsed from the input string.
 * - `crc`: Information about the Cyclic Redundancy Check (CRC):
 *    - `value`: The CRC value found in the tag `"63"`.
 *    - `isValid`: Whether the calculated CRC matches the value in the QR.
 * - `meta`: Additional metadata:
 *    - `format`: Will always be `"EMVCO"`.
 *    - `version`: The payload format version (usually from tag `"00"`), or a fallback default.
 *    - `region`: The region-specific mode used (`GLOBAL` or `CO`).
 *
 * @param rawQRString - The raw QR string in EMVCo TLV format.
 * @param options - Parsing options (only supports `GLOBAL` or `CO` modes).
 *
 * @returns A comprehensive `ParsedQR` object including TLVs, mapped fields, validation results, and metadata.
 *
 * @throws {Error} If the QR string is empty, malformed, or the parse mode is unsupported.
 */
export function parseFullQR(rawQRString: string, options: FullQrParsingOptions): ParsedQR {
  validateQRString(rawQRString);
  const recursive = options.recursiveParsing ?? DEFAULT_RECURSIVE;
  const mode = options.parseMode ?? QRParseMode.GLOBAL;

  if (![QRParseMode.GLOBAL, QRParseMode.CO].includes(mode)) {
    throw new Error(PARSE_ERRORS.UNSUPPORTED_MODE(mode));
  }

  const tlvs = TlvParserService.parse(rawQRString, recursive);
  const named = getNamedHandler(mode)(tlvs);
  const crc = getCrcInfo(rawQRString, tlvs);

  return {
    named,
    raw: RawObjectMapperService.map(tlvs),
    tlvs,
    crc,
    meta: {
      format: EMV_QR_FORMAT,
      version: named[DEFAULT_PAYLOAD_VERSION_FIELD] || FALLBACK_TLV_VERSION,
      region: mode,
    },
  };
}
