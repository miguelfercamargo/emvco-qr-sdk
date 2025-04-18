/**
 * Map of GUI codes used by Acquirer Networks in Colombia
 * to their corresponding human-readable names.
 *
 * Based on Table 1.4 of the Colombian QR EMVCo specification (v1.3, 2024).
 */
export const ACQUIRER_NETWORK_GUI_MAP: Record<string, string> = {
  'CO.COM.ACH.RED': 'ACH',
  'CO.COM.BRC.RED': 'Banco de la República',
  'CO.COM.CRB.RED': 'Credibanco',
  'CO.COM.MCCA.RED': 'Mastercard',
  'CO.COM.RBM.RED': 'Redeban',
  'CO.COM.SVB.RED': 'Servibanca',
  'CO.COM.VCSS.RED': 'Visa',
  'CO.COM.VISI.RED': 'Visionamos',
};
