/**
 * Enumeration of the available QR parsing modes supported by the library.
 * Each mode affects how the TLV entities are interpreted and mapped.
 */
export enum QRParseMode {
  /**
   * Returns the raw TLV entities as-is, without transformation.
   */
  TLV = 'TLV',

  /**
   * Returns a flat object with raw tag keys and direct values.
   * If sub-tags exist, they are also mapped as raw keys.
   */
  RAW_OBJECT = 'RAW_OBJECT',

  /**
   * Returns an object with human-readable field names based on
   * the EMVCo specification (default international mapping).
   */
  GLOBAL = 'GLOBAL',

  /**
   * Returns a named object with Colombia-specific field names,
   * following local naming and custom subtag mapping conventions.
   */
  CO = 'CO',
}
