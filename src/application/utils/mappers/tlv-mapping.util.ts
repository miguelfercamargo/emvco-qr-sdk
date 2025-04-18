import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { SubtagNameResolver } from '../../types/tag-resolver.type';

/**
 * Checks whether a TLV entity contains valid subTags.
 *
 * @param tlv - The TLV entity to check.
 * @returns True if the TLV contains at least one subTag, false otherwise.
 */
export function isTlvWithSubTags(tlv: TlvEntity): boolean {
  return !!(tlv.subTags && tlv.subTags.length > 0);
}

/**
 * Maps an array of subTags into a key-value object, using an optional name resolver.
 *
 * @param parentTag - The parent TLV tag.
 * @param subTags - The list of subtag TLV entities.
 * @param resolveSubtagName - Optional resolver for naming subtags.
 * @returns An object mapping each subtag to its value.
 */
export function mapSubTags(
  parentTag: string,
  subTags: TlvEntity[],
  resolveSubtagName?: SubtagNameResolver
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const sub of subTags) {
    const key = resolveSubtagName ? resolveSubtagName(parentTag, sub.tag) : sub.tag;
    result[key] = sub.value;
  }
  return result;
}
