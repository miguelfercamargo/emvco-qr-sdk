/**
 * Represents a single TLV (Tag-Length-Value) structure used in QR codes or similar encoding formats.
 *
 * This entity encapsulates the fundamental components of a TLV:
 * - A tag (identifier)
 * - A value
 * - Its corresponding length (in characters)
 *
 * Optionally, a TLV may contain nested sub-tags (subTags), allowing for hierarchical data structures.
 */
export class TlvEntity {
  /** The tag identifier (2-digit or more hexadecimal string). */
  public readonly tag: string;

  /** The length of the value in characters. */
  public readonly length: number;

  /** The raw value associated with the tag. */
  public readonly value: string;

  /** Optional nested TLVs contained within this TLV's value (for composite TLVs). */
  public readonly subTags?: TlvEntity[];

  /**
   * Creates a new TLV entity.
   *
   * @param tag - The tag that identifies the data field.
   * @param value - The raw value associated with the tag.
   * @param subTags - (Optional) Nested TLV entities parsed from the value.
   */
  constructor(tag: string, value: string, subTags?: TlvEntity[]) {
    this.tag = tag;
    this.value = value;
    this.length = value.length;
    if (subTags && subTags.length > 0) {
      this.subTags = subTags;
    }
  }

  /**
   * Serializes the TLV entity back into its string representation.
   *
   * @returns A string in the format: TAG + LENGTH (2 digits) + VALUE.
   */
  public toString(): string {
    const lenString = this.length.toString().padStart(2, '0');
    return `${this.tag}${lenString}${this.value}`;
  }
}
