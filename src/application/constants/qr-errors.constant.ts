/**
 * Collection of parse-time error messages and error factories.
 */
export const PARSE_ERRORS = {
  EMPTY_QR: 'The QR string is empty or invalid.',

  INVALID_TLV_FORMAT: (value: string) =>
    `The QR string does not follow expected TLV format: "${value}"`,

  INVALID_LENGTH: (lengthStr: string, tag: string) =>
    `Invalid length '${lengthStr}' for tag ${tag}.`,

  EXCEEDS_AVAILABLE: (tag: string) => `The value for tag ${tag} exceeds the available characters.`,

  UNSUPPORTED_MODE: (mode: string) => `Unsupported parse mode for full QR: ${mode}`,
};
