import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';

/**
 * Strategy for tag 96 - Destination Account Field.
 *
 * Same behavior as tag 95, but intended for destination accounts.
 *
 * Input: FIID + AccountNumber
 *
 * Example:
 * ```ts
 * {
 *   fiid: "456",
 *   accountNumber: "789123"
 * }
 * ```
 *
 * @param tlv - TLV entity for tag 96
 * @returns Object with parsed `fiid` and `accountNumber`
 */
export const accountFieldStrategy96: TagMappingStrategy = (tlv: TlvEntity): Record<string, any> => {
  const fiid = tlv.value.slice(0, 3);
  const accountNumber = tlv.value.slice(3);
  return {
    fiid,
    accountNumber,
  };
};
