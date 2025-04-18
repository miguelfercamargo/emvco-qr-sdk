import { TlvEntity } from '../../domain/entities/tlv.entity';
import { isTlvWithSubTags, mapSubTags } from '../utils/mappers/tlv-mapping.util';

/**
 * Service to map TLV entities into raw key/value objects using original tag codes.
 * No naming strategy is applied.
 */
export class RawObjectMapperService {
  /**
   * Converts a list of TLV entities into a plain object using raw tag values as keys.
   *
   * If subTags are found, it builds a nested object with raw subtag values as keys.
   *
   * @param tlvs - The TLV entities to convert.
   * @returns A plain object representing the raw structure of the TLVs.
   */
  public static map(tlvs: TlvEntity[]): Record<string, any> {
    const result: Record<string, any> = {};

    for (const tlv of tlvs) {
      const key = tlv.tag;
      result[key] = isTlvWithSubTags(tlv) ? mapSubTags(tlv.tag, tlv.subTags!) : tlv.value;
    }

    return result;
  }
}
