/**
 * Standard EMVCo tag names used globally.
 *
 * This dictionary contains the baseline tag-to-name mapping
 * as defined by the EMVCo QR Code specification.
 *
 * It is used when decoding QR codes without region-specific extensions,
 * and includes only the globally defined tags like merchant info,
 * transaction details, and CRC.
 *
 * Example fields:
 * - "00" → "payloadFormatIndicator"
 * - "54" → "transactionAmount"
 * - "63" → "crc"
 */
export const STANDARD_TAG_NAMES: Record<string, string> = {
  '00': 'payloadFormatIndicator',
  '01': 'pointOfInitiationMethod',
  '52': 'merchantCategoryCode',
  '53': 'transactionCurrency',
  '54': 'transactionAmount',
  '55': 'tipOrConvenienceIndicator',
  '56': 'valueOfConvenienceFeeFixed',
  '57': 'valueOfConvenienceFeePercentage',
  '58': 'countryCode',
  '59': 'merchantName',
  '60': 'merchantCity',
  '61': 'postalCode',
  '62': 'additionalDataFieldTemplate',
  '63': 'crc',
  '64': 'merchantInformationLanguageTemplate',
};
