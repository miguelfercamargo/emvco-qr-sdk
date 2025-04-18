/**
 * Use case for parsing a raw EMVCo QR string into structured TLV or mapped objects.
 *
 * Supports multiple output modes: TLV array, raw object, or named field mappings.
 */

import { TlvEntity } from '../../domain/entities/tlv.entity';
import { TlvParserService } from '../../domain/services/tlv-parser.service';
import { DEFAULT_PARSE_MODE, DEFAULT_RECURSIVE } from '../constants/qr.constant';
import { PARSE_MODE_HANDLERS } from '../services/qr-mode-handlers.service';
import { QrParsingOptions } from '../types/qr-parsing-options.interface';
import { validateQRString } from '../utils/validators/validate-qr-string.util';

/**
 * Parses a raw EMVCo QR string into TLV structures or mapped objects, depending on the selected mode.
 *
 * This function supports multiple output formats based on the `parseMode`:
 *
 * - `TLV`: Returns an array of `TlvEntity` instances. Each object represents a raw TLV entry (Tag, Length, Value),
 *   including nested sub-tags if applicable.
 *
 * - `RAW_OBJECT`: Returns a plain object (`Record<string, any>`) where keys are the raw tag identifiers (e.g., `"26"`),
 *   and values are either:
 *   - The raw value (string), or
 *   - A nested object containing sub-tag values (e.g., `{ "00": "...", "01": "..." }`).
 *
 * - `GLOBAL`: Returns a plain object with named keys, using the standard EMVCo field names (e.g., `"merchantName"`, `"transactionAmount"`),
 *   including sub-tags mapped to readable keys when available.
 *
 * - `CO`: Same as `GLOBAL`, but uses tag names and mappings specific to Colombia's EASPBV QR implementation,
 *   such as `"gui"`, `"transactionId"`, `"securityHash"`, etc.
 *
 * @param rawQRString - The raw string containing the QR in EMVCo TLV format.
 * @param options - Parsing options including the desired output mode and recursive parsing toggle.
 *
 * @returns Depending on the `parseMode`, either:
 * - An array of `TlvEntity[]` when in `TLV` mode, or
 * - A mapped object `Record<string, any>` with fields parsed and transformed.
 *
 * @throws {Error} If the QR string is empty or malformed.
 */
export function parseQR(
  rawQRString: string,
  options: QrParsingOptions = { parseMode: DEFAULT_PARSE_MODE }
): TlvEntity[] | Record<string, any> {
  validateQRString(rawQRString);

  const recursive = options.recursiveParsing ?? DEFAULT_RECURSIVE;
  const mode = options.parseMode ?? DEFAULT_PARSE_MODE;

  const tlvs = TlvParserService.parse(rawQRString, recursive);
  const handler = PARSE_MODE_HANDLERS[mode];

  return handler ? handler(tlvs) : tlvs;
}
