import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';
import { TagNameResolverUtil } from '../../utils/resolvers/tag-name-resolver.util';

/**
 * Mapping strategy for TLV tags that contain generic GUI-based subfields.
 *
 * This strategy is used for tags that follow the [GUI, value] pattern in their subtags,
 * such as tags 50, 51, 81–85, 90, 91, and 99. It uses the Colombian subtag dictionary
 * to resolve meaningful names for each subfield.
 *
 * Example output:
 * ```ts
 * {
 *   gui: "CO.COM.CRB.RED",
 *   vatCondition: "02",
 *   vatValueOrPercentage: "10.00"
 * }
 * ```
 *
 * @param tlv - The TLV entity to map.
 * @returns An object where subtag keys are replaced with named fields and mapped values.
 */
export const genericGuiStrategy: TagMappingStrategy = (tlv: TlvEntity): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const sub of tlv.subTags ?? []) {
    const key = TagNameResolverUtil.getColombianSubtagName(tlv.tag, sub.tag);
    result[key] = sub.value;
  }
  return result;
};
