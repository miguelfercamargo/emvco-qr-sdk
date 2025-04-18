import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';
import { resolveAcquirerNetworkName } from '../../utils/acquirer/acquirer-network.util';

/**
 * Mapping strategy for tag 49 - Acquirer Network Identifier.
 *
 * Tag 49 contains:
 * - Subtag 00: GUI (Globally Unique Identifier, e.g., CO.COM.CRB.RED)
 * - Subtag 01: Short code (e.g., CRB)
 *
 * This strategy resolves and maps the subtags, and adds a human-readable network name.
 *
 * Example output:
 * ```ts
 * {
 *   gui: "CO.COM.CRB.RED",
 *   networkId: "CRB",
 *   networkName: "Credibanco"
 * }
 * ```
 *
 * @param tlv - TLV entity for tag 49
 * @returns An object with `gui`, `networkId`, and resolved `networkName`
 */
export const acquirerNetworkStrategy: TagMappingStrategy = (
  tlv: TlvEntity
): Record<string, any> => {
  const subTags = tlv.subTags ?? [];
  const result: Record<string, any> = {};

  const guiTag = subTags.find((sub) => sub.tag === '00');
  const networkIdTag = subTags.find((sub) => sub.tag === '01');

  if (guiTag) {
    result['gui'] = guiTag.value;
    result['networkName'] = resolveAcquirerNetworkName(guiTag.value);
  }

  if (networkIdTag) {
    result['networkId'] = networkIdTag.value;
  }

  return result;
};
