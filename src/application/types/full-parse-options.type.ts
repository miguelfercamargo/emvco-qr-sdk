import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';
import { QrParsingOptions } from './qr-parsing-options.interface';

/**
 * Specialized options for full QR parsing use case.
 * Only supports named parsing in GLOBAL or CO modes.
 */
export type FullQrParsingOptions = Omit<QrParsingOptions, 'parseMode'> & {
  /**
   * The named parsing mode: GLOBAL or CO.
   */
  parseMode?: QRParseMode.GLOBAL | QRParseMode.CO;
};
