/**
 * Mapping of top-level EMVCo QR tags to Colombian-specific field names.
 *
 * This dictionary defines how raw tag identifiers (e.g., "54", "62") should be
 * interpreted according to the Colombian EMVCo v1.3 specification.
 *
 * These keys are resolved during named field transformation when parsing
 * QR codes under the "CO" (Colombia) region.
 *
 * Includes fields for:
 * - Merchant identifiers (tags 50, 51)
 * - Transaction metadata (tags 53, 54, 55, etc.)
 * - Extended custom data (tags 80–99)
 * - Transfer-related tags (95–98)
 */
export const COLOMBIA_TAG_NAMES: Record<string, string> = {
  '00': 'payloadFormatIndicator',
  '01': 'pointOfInitiationMethod',
  '26': 'merchantAccountInfo',
  '49': 'acquirerNetworkId',
  '50': 'merchantId',
  '51': 'aggregatorMerchantCode',
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
  '80': 'channel',
  '81': 'vatCondition',
  '82': 'vatValue',
  '83': 'vatBase',
  '84': 'incCondition',
  '85': 'incValue',
  '90': 'transactionId',
  '91': 'securityField',
  '92': 'collectionServiceCode',
  '93': 'collectionReference',
  '94': 'collectionProductType',
  '95': 'originAccount',
  '96': 'destinationAccount',
  '97': 'destinationReference',
  '98': 'transferProductType',
  '99': 'discountField',
};
