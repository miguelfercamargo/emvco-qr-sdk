import { COLOMBIA_SUBTAG_NAMES } from '../../config/qr-mapping/colombia-subtags.map';
import { COLOMBIA_TAG_NAMES } from '../../config/qr-mapping/colombia-tags.map';
import { STANDARD_TAG_NAMES } from '../../config/qr-mapping/standard-tags.map';

/**
 * Utility class for resolving tag and subtag names based on region.
 *
 * This resolver provides name translations for TLV tag identifiers,
 * supporting both the EMVCo standard set and Colombian QR extensions.
 */
export class TagNameResolverUtil {
  /**
   * Resolves a tag to its EMVCo standard field name.
   *
   * @param tag - A 2-character TLV tag.
   * @returns A human-readable name for the tag, or the raw tag if not found.
   */
  public static getStandardName(tag: string): string {
    return STANDARD_TAG_NAMES[tag] ?? tag;
  }

  /**
   * Resolves a tag to its Colombian-specific field name.
   *
   * @param tag - A 2-character TLV tag.
   * @returns A mapped field name for the Colombian format, or the raw tag if not found.
   */
  public static getColombianName(tag: string): string {
    return COLOMBIA_TAG_NAMES[tag] ?? tag;
  }

  /**
   * Resolves a subtag within a parent tag according to the Colombian QR spec.
   *
   * @param tag - The parent tag (e.g., "26", "49").
   * @param subtag - The subfield tag (e.g., "00", "01").
   * @returns The subfield name, or the raw subtag if not mapped.
   */
  public static getColombianSubtagName(tag: string, subtag: string): string {
    return COLOMBIA_SUBTAG_NAMES[tag]?.[subtag] ?? subtag;
  }
}
