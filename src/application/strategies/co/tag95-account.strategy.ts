import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';

/**
 * Strategy for tag 95 - Origin Account Field.
 *
 * This field typically includes a concatenation of:
 * - FIID (3 chars)
 * - Account Number
 *
 * Example input: "1234567890"
 * Example output:
 * ```ts
 * {
 *   fiid: "123",
 *   accountNumber: "4567890"
 * }
 * ```
 *
 * @param tlv - TLV entity for tag 95
 * @returns Parsed FIID and account number
 */
export const accountFieldStrategy95: TagMappingStrategy = (tlv: TlvEntity): Record<string, any> => {
  const fiid = tlv.value.slice(0, 3);
  const accountNumber = tlv.value.slice(3);
  return {
    fiid,
    accountNumber,
  };
};
