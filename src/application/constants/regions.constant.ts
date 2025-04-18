/**
 * Constants representing region codes used for strategy resolution and tag interpretation.
 * These values are used internally by the mapping services to resolve tag-specific logic.
 */
export const REGIONS = {
  /**
   * Region code for Colombia-specific parsing strategies.
   */
  CO: 'CO',

  /**
   * Region code for globally standardized parsing (EMVCo default).
   */
  GLOBAL: 'GLOBAL',

  /**
   * Fallback region code when no specific mapping is defined.
   */
  DEFAULT: 'DEFAULT',
} as const;
