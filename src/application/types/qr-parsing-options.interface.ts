import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';

/**
 * Parsing options provided to QR parsing use cases.
 */
export interface QrParsingOptions {
  /**
   * Indicates whether nested TLV tags should be parsed recursively.
   * @default true
   */
  recursiveParsing?: boolean;

  /**
   * Determines how the parsed QR data should be returned.
   * - TLV: Returns the TLV entities.
   * - RAW_OBJECT: Returns a flat object with raw tag keys.
   * - GLOBAL: Returns a named object using EMVCo tags.
   * - CO: Returns a named object using Colombian tags.
   */
  parseMode?: QRParseMode;
}
