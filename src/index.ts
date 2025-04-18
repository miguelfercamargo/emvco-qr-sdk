/**
 * EMVCo QR SDK
 *
 * This module exports core QR parsing use cases and utilities for interpreting
 * EMVCo-compliant QR codes, including Colombian-specific extensions.
 *
 * @module emvco-qr-sdk
 */

export type { FullQrParsingOptions } from './application/types/full-parse-options.type';
export type { ParsedQR } from './application/types/parsed-qr.interface';
export type { QrParsingOptions } from './application/types/qr-parsing-options.interface';
export { parseFullQR } from './application/usecases/parse-full-qr.usecase';
export { parseQR } from './application/usecases/parse-qr.usecase';
export { getCrcInfo } from './application/utils/checksum/crc.util';
export { validateQRString } from './application/utils/validators/validate-qr-string.util';
export { isValidTLVFormat } from './application/utils/validators/validate-tlv-format.util';
export { TlvEntity } from './domain/entities/tlv.entity';
export { QRParseMode } from './domain/enums/qr-parse-mode.enum';
export { TlvParserService } from './domain/services/tlv-parser.service';
export { CRC } from './domain/value-objects/crc';
export { Tag } from './domain/value-objects/tag';
