import { TlvEntity } from '../../domain/entities/tlv.entity';
import { REGIONS } from '../constants/regions.constant';
import { TagMappingRegistryStrategy } from '../strategies/registry/tag-mapping-registry.strategy';
import { RegionCode, SubtagNameResolver, TagNameResolver } from '../types/tag-resolver.type';
import { isTlvWithSubTags, mapSubTags } from '../utils/mappers/tlv-mapping.util';
import { TLVUtil } from '../utils/resolvers/tlv.util';

/**
 * Provides a static mapping function to transform TLV entities into
 * human-readable key-value objects using tag names and mapping strategies.
 *
 * This mapper supports region-specific logic (e.g., Colombia, Global),
 * and resolves tag/subtag names into meaningful labels.
 */
export class NamedFieldsMapper {
  /**
   * Maps an array of TLV entities into a flat object with named keys.
   * For each TLV entity, it determines if a mapping strategy exists
   * for the region and applies it, otherwise it attempts generic subtag mapping
   * or uses the raw value.
   *
   * @param tlvs - List of TLV entities to be mapped.
   * @param resolveTagName - Function that resolves tag IDs to human-readable keys.
   * @param resolveSubtagName - (Optional) Function that resolves subtag IDs to keys (used if subtags are present).
   * @returns An object with resolved keys and values for each TLV.
   */
  public static map(
    tlvs: TlvEntity[],
    resolveTagName: TagNameResolver,
    resolveSubtagName?: SubtagNameResolver
  ): Record<string, any> {
    const result: Record<string, any> = {};
    const region = this.resolveRegion(resolveTagName);

    for (const tlv of tlvs) {
      const key = resolveTagName(tlv.tag);
      const strategy = TagMappingRegistryStrategy[tlv.tag]?.[region];

      result[key] = strategy
        ? strategy(tlv)
        : isTlvWithSubTags(tlv)
          ? mapSubTags(tlv.tag, tlv.subTags!, resolveSubtagName)
          : tlv.value;
    }

    return result;
  }

  /**
   * Determines the current region (CO, GLOBAL, or DEFAULT) based on
   * the resolver function provided. This affects how tags are mapped.
   *
   * @param resolveTagName - Resolver used to identify tag names.
   * @returns The matching region code.
   */
  private static resolveRegion(resolveTagName: TagNameResolver): RegionCode {
    return resolveTagName === TLVUtil.getColombianName
      ? REGIONS.CO
      : resolveTagName === TLVUtil.getStandardName
        ? REGIONS.GLOBAL
        : REGIONS.DEFAULT;
  }
}
