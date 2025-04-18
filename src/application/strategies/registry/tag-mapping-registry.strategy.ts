/**
 * Central registry of tag mapping strategies used during TLV transformation.
 *
 * Each entry in the registry defines how a tag is interpreted for a specific region
 * (e.g., CO, GLOBAL, DEFAULT). Strategies are pure functions that receive a TLV entity
 * and return a structured object for output.
 */

import { TAGS_WITH_GENERIC_GUI_STRATEGY } from '../../constants/qr.constant';
import { RegionCode, TagMappingStrategy } from '../../types/tag-resolver.type';
import { acquirerNetworkStrategy } from '../co/tag49-acquirer-network.strategy';
import { accountFieldStrategy95 } from '../co/tag95-account.strategy';
import { accountFieldStrategy96 } from '../co/tag96-account.strategy';
import { transferProductTypeStrategy } from '../co/tag98-transfer-product.strategy';
import { defaultStrategy } from '../defaults/default.strategy';
import { genericGuiStrategy } from '../shared/generic-gui.strategy';
import { guiAndTypedStrategy } from '../shared/gui-and-typed.strategy';
import { registerGenericStrategyForTags } from '../shared/register-generic-strategy';

const registry: Record<string, Record<RegionCode, TagMappingStrategy>> = {};

registry['26'] = {
  CO: guiAndTypedStrategy,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registry['80'] = {
  CO: guiAndTypedStrategy,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registry['49'] = {
  CO: acquirerNetworkStrategy,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registry['95'] = {
  CO: accountFieldStrategy95,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registry['96'] = {
  CO: accountFieldStrategy96,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registry['98'] = {
  CO: transferProductTypeStrategy,
  GLOBAL: defaultStrategy,
  DEFAULT: defaultStrategy,
};

registerGenericStrategyForTags(registry, TAGS_WITH_GENERIC_GUI_STRATEGY, genericGuiStrategy);

/**
 * Exports the final registry used by mappers to determine
 * how to decode TLV tag values.
 */
export const TagMappingRegistryStrategy = registry;
