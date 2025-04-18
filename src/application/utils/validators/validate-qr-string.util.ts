import { PARSE_ERRORS } from '../../constants/qr-errors.constant';
import { isValidTLVFormat } from './validate-tlv-format.util';

/**
 * Validates that a QR string is non-empty and follows the TLV format.
 *
 * This function checks two things:
 * 1. The string must not be empty or whitespace.
 * 2. It must follow a pattern consistent with EMVCo TLV encoding
 *    (e.g., `ID + LENGTH + VALUE`).
 *
 * Throws meaningful errors if the input fails these validations.
 *
 * @param rawQRString - The QR string to validate.
 * @throws {Error} If the QR string is empty or not TLV-compliant.
 */
export function validateQRString(rawQRString: string): void {
  if (!rawQRString || rawQRString.trim().length === 0) {
    throw new Error(PARSE_ERRORS.EMPTY_QR);
  }

  if (!isValidTLVFormat(rawQRString)) {
    throw new Error(PARSE_ERRORS.INVALID_TLV_FORMAT(rawQRString));
  }
}
