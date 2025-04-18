import { ACQUIRER_NETWORK_GUI_MAP } from '../../constants/acquirer.constant';

/**
 * Resolves the human-readable network name from a given GUI string.
 *
 * @param gui - The GUI string from tag 49 subtag 00 (e.g., "CO.COM.CRB.RED")
 * @returns The resolved name of the network, or "Unknown" if not found.
 */
export function resolveAcquirerNetworkName(gui: string): string {
  return ACQUIRER_NETWORK_GUI_MAP[gui] ?? 'Unknown';
}
