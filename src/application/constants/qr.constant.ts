import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';

/**
 * Default behavior for TLV QR parsing.
 */
export const DEFAULT_RECURSIVE = true;

/**
 * Default QR parse mode (EMVCo TLV format).
 */
export const DEFAULT_PARSE_MODE = QRParseMode.TLV;

/**
 * TLV tag reserved for CRC checksum validation.
 */
export const TAG_CRC = '63';

/**
 * Common subtag representing a GUI (Globally Unique Identifier).
 */
export const TAG_GUI = '00';

/**
 * Fallback value used when no payload version is explicitly defined.
 */
export const FALLBACK_TLV_VERSION = '01';

/**
 * Constant string representing the EMVCo QR format.
 */
export const EMV_QR_FORMAT = 'EMVCO';

/**
 * Default field name used to extract the payload version from the TLV.
 */
export const DEFAULT_PAYLOAD_VERSION_FIELD = 'payloadFormatIndicator';

/**
 * List of tags that follow a common pattern: they include a GUI (subtag 00)
 * and additional subfields following a generic interpretation strategy.
 */
export const TAGS_WITH_GENERIC_GUI_STRATEGY = [
  '50',
  '51',
  '81',
  '82',
  '83',
  '84',
  '85',
  '90',
  '91',
];
