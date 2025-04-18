/**
 * Dictionary of Colombian EMVCo QR subtag names by parent tag.
 *
 * This map provides friendly, human-readable names for each subtag defined
 * under specific tags in the Colombian EMVCo QR specification.
 *
 * These names are used during TLV decoding and mapping to structured JSON.
 *
 * Example:
 * - Tag 49 includes subtags:
 *   - "00" → "gui"
 *   - "01" → "networkId"
 *
 * - Tag 62 includes additional commerce data fields like:
 *   - "01" → "billNumber"
 *   - "10" → "paymentReferenceNumber"
 */
export const COLOMBIA_SUBTAG_NAMES: Record<string, Record<string, string>> = {
  '26': {
    '00': 'gui',
    '01': 'IDENTIFICATION',
    '02': 'MOBILE_NUMBER',
    '03': 'EMAIL',
    '04': 'ALPHANUMERIC',
    '05': 'MERCHANT_ID',
  },
  '49': {
    '00': 'gui',
    '01': 'networkId',
  },
  '50': {
    '00': 'gui',
    '01': 'value',
  },
  '51': {
    '00': 'gui',
    '01': 'value',
  },
  '80': {
    '00': 'gui',
    '01': 'channel',
  },
  '81': {
    '00': 'gui',
    '01': 'value',
  },
  '82': {
    '00': 'gui',
    '01': 'value',
  },
  '83': {
    '00': 'gui',
    '01': 'value',
  },
  '84': {
    '00': 'gui',
    '01': 'value',
  },
  '85': {
    '00': 'gui',
    '01': 'value',
  },
  '90': {
    '00': 'gui',
    '01': 'value',
  },
  '91': {
    '00': 'gui',
    '01': 'securityHash',
  },
  '99': {
    '00': 'gui',
    '01': 'discountIndicator',
    '02': 'discountAmount',
    '03': 'vatOnDiscount',
    '04': 'discountPercentage',
    '05': 'discountValue',
    '06': 'discountConsultation',
  },
  '62': {
    '01': 'billNumber',
    '02': 'mobileNumber',
    '03': 'storeLabel',
    '04': 'loyaltyNumber',
    '05': 'referenceLabel',
    '06': 'customerLabel',
    '07': 'terminalLabel',
    '08': 'purposeOfTransaction',
    '09': 'consumerDataRequest',
    '10': 'paymentReferenceNumber',
    '11': 'promotionCode',
    '12': 'campaignIdentifier',
    '13': 'productCode',
    '14': 'channelCode',
  },
  '64': {
    '00': 'languageCode',
    '01': 'merchantNameAlt',
    '02': 'merchantCityAlt',
  },
};
