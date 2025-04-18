/**
 * Represents a CRC (Cyclic Redundancy Check) value object used to verify data integrity.
 *
 * This class encapsulates the CRC value and provides utility methods for CRC calculation and validation.
 * It implements the CRC-16/CCITT-FALSE algorithm, which is commonly used in EMVCo QR codes.
 * The algorithm uses:
 *  - Initial value: 0xFFFF
 *  - Polynomial: 0x1021
 *  - No final XOR operation
 *
 * The calculated CRC is represented as a 4-character uppercase hexadecimal string.
 */
export class CRC {
  private readonly _value: string;

  /**
   * Constructs a CRC value object.
   *
   * @param value - A 4-character hexadecimal string representing the CRC.
   * @throws {Error} If the provided CRC does not match the required format.
   */
  constructor(value: string) {
    if (!CRC.isValidFormat(value)) {
      throw new Error(
        `Invalid CRC format: ${value}. A valid CRC must be a 4-character hexadecimal string.`
      );
    }
    this._value = value.toUpperCase();
  }

  /**
   * Returns the CRC value as a string.
   *
   * @returns The CRC value.
   */
  public toString(): string {
    return this._value;
  }

  /**
   * Validates the format of a CRC string.
   *
   * @param value - The CRC string to validate.
   * @returns True if the string is a valid 4-character hexadecimal, false otherwise.
   */
  public static isValidFormat(value: string): boolean {
    return /^[A-F0-9]{4}$/i.test(value);
  }

  /**
   * Calculates the CRC-16/CCITT-FALSE for the given input string.
   *
   * This algorithm processes the input data byte by byte using the following parameters:
   * - Initial value: 0xFFFF
   * - Polynomial: 0x1021
   * - No final XOR operation
   *
   * @param data - The input data (as a string) over which to calculate the CRC.
   * @returns A 4-character uppercase hexadecimal string representing the calculated CRC.
   */
  public static calculate(data: string): string {
    let crc = 0xffff;
    // Process each character in the input string
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff; // Ensure CRC remains a 16-bit value
      }
    }
    // Convert the result to a 4-digit uppercase hexadecimal string.
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  /**
   * Validates that the CRC of the provided data matches the stored CRC value.
   *
   * @param data - The data (as a string) over which to compute the CRC.
   * @returns True if the computed CRC matches the stored value; otherwise, false.
   */
  public validate(data: string): boolean {
    const computedCRC = CRC.calculate(data);
    return computedCRC === this._value;
  }
}
