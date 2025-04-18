import { TagNameResolverUtil } from './tag-name-resolver.util';

/**
 * Facade utility class for resolving TLV tag and subtag names.
 *
 * Delegates tag name resolution to the appropriate region-specific resolver.
 * Provides a clean interface for resolving field names from raw TLV tags.
 */
export class TLVUtil {
  /**
   * Resolves a TLV tag to its EMVCo standard name.
   *
   * @param tag - A string tag identifier (e.g., "00", "54").
   * @returns The corresponding field name or the raw tag.
   */
  public static getStandardName(tag: string): string {
    return TagNameResolverUtil.getStandardName(tag);
  }

  /**
   * Resolves a TLV tag to its Colombian-specific name.
   *
   * @param tag - A string tag identifier.
   * @returns The field name under Colombian QR mapping or the raw tag.
   */
  public static getColombianName(tag: string): string {
    return TagNameResolverUtil.getColombianName(tag);
  }

  /**
   * Resolves a subtag for a given parent tag based on Colombian QR mappings.
   *
   * @param parentTag - The top-level TLV tag.
   * @param subtag - A subfield tag under the parent.
   * @returns The resolved subfield name or the raw subtag if unknown.
   */
  public static getColombianSubtagName(parentTag: string, subtag: string): string {
    return TagNameResolverUtil.getColombianSubtagName(parentTag, subtag);
  }
}
