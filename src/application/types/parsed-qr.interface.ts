import { TlvEntity } from '../../domain/entities/tlv.entity';
import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';

/**
 * Represents the full result of parsing a QR string into various structured forms.
 */
export interface ParsedQR {
  /**
   * The QR data mapped into a human-readable object (either GLOBAL or CO format).
   */
  named: Record<string, any>;

  /**
   * (Optional) Raw representation using TLV entities indexed by tag.
   */
  raw?: Record<string, TlvEntity>;

  /**
   * The parsed TLV entities from the raw QR string.
   */
  tlvs: TlvEntity[];

  /**
   * CRC (Cyclic Redundancy Check) information used to validate data integrity.
   */
  crc: {
    /** The original CRC value found in the QR code. */
    value: string;

    /** Indicates whether the CRC value is valid. */
    isValid: boolean;
  };

  /**
   * Optional metadata about the QR format and parsing mode.
   */
  meta?: {
    /** The QR code format standard used (e.g., EMVCO). */
    format: 'EMVCO';

    /** TLV format version as found in the QR tag 00. */
    version: string;

    /** The parsing mode used to generate the named output. */
    region?: QRParseMode;
  };
}
