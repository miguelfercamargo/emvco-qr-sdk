import { Tag } from '../../../domain/value-objects/tag';

/**
 * Checks if a string appears to be in a valid TLV format (superficial validation).
 *
 * This does NOT guarantee the entire structure is valid — it only checks the initial pattern.
 *
 * @param tlv - The raw string to validate.
 * @returns True if the string starts with a valid TLV structure, false otherwise.
 */
export function isValidTLVFormat(tlv: string): boolean {
  if (!tlv || tlv.length < 4) return false;

  const tag = tlv.substring(0, 2);
  const lengthStr = tlv.substring(2, 4);
  const length = parseInt(lengthStr, 10);

  return Tag.isValid(tag) && !isNaN(length) && 4 + length <= tlv.length;
}
