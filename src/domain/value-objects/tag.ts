/**
 * Represents a Tag value object in a TlvEntity structure.
 *
 * This class encapsulates the tag identifier ensuring that it complies with the expected format.
 * According to the EMVCo specifications, a valid Tag is typically a two-character string.
 */
export class Tag {
  private readonly _value: string;

  /**
   * Constructs a Tag value object.
   *
   * @param value - The tag string. It must be exactly two characters.
   * @throws {Error} If the tag is not exactly two characters.
   */
  constructor(value: string) {
    if (!Tag.isValid(value)) {
      throw new Error(`Invalid Tag: ${value}. A valid tag must be exactly 2 characters.`);
    }
    this._value = value;
  }

  /**
   * Returns the tag value as a string.
   *
   * @returns The tag as a string.
   */
  public toString(): string {
    return this._value;
  }

  /**
   * Validates the provided tag value.
   *
   * @param value - The tag value to validate.
   * @returns True if the tag is exactly two characters, false otherwise.
   */
  public static isValid(value: string): boolean {
    return typeof value === 'string' && value.length === 2;
  }
}
