import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';

/**
 * Strategy for tag 98 - Transfer Product Type.
 *
 * This tag defines what type of product is used in the transaction:
 * - "01" → Savings Account
 * - "02" → Checking Account
 * - "03" → Digital Wallet
 *
 * Example:
 * ```ts
 * {
 *   id: "01",
 *   value: "SAVINGS_ACCOUNT"
 * }
 * ```
 *
 * @param tlv - TLV entity for tag 98
 * @returns Object with id and readable value
 */
export const transferProductTypeStrategy: TagMappingStrategy = (
  tlv: TlvEntity
): Record<string, any> => {
  const mapping: Record<string, string> = {
    '01': 'SAVINGS_ACCOUNT',
    '02': 'CHECKING_ACCOUNT',
    '03': 'WALLET',
  };

  return {
    id: tlv.value,
    value: mapping[tlv.value] ?? 'Unknown',
  };
};
