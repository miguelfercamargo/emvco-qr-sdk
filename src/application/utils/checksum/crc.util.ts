import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { CRC } from '../../../domain/value-objects/crc';
import { TAG_CRC } from '../../constants/qr.constant';

/**
 * Extracts and validates the CRC (Cyclic Redundancy Check) from a list of TLV entities.
 *
 * @param rawString - The original QR string, required for computing expected CRC.
 * @param tlvs - The parsed list of TLV entities.
 * @returns An object containing the CRC value and its validation result.
 */
export function getCrcInfo(rawString: string, tlvs: TlvEntity[]) {
  const crcTlv = tlvs.find((t) => t.tag === TAG_CRC);
  const value = crcTlv?.value ?? '';
  const isValid = CRC.isValidFormat(value)
    ? new CRC(value).validate(rawString.slice(0, rawString.length - 4))
    : false;

  return { value, isValid };
}
