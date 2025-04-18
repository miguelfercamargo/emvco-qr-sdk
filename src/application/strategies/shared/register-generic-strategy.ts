import { RegionCode, TagMappingStrategy } from '../../types/tag-resolver.type';
import { defaultStrategy } from '../defaults/default.strategy';

/**
 * Utility function to register a mapping strategy for a list of tags under the Colombian region.
 *
 * This helper automatically assigns the provided strategy to all specified tag codes,
 * while defaulting to a fallback strategy (`defaultStrategy`) for GLOBAL and DEFAULT regions.
 *
 * Used to reduce boilerplate and maintain consistent behavior across tags
 * that follow a shared generic structure (e.g., GUI-based subtags).
 *
 * @param registry - The tag strategy registry to update.
 * @param tags - An array of tag codes to associate with the strategy.
 * @param strategy - The mapping strategy to apply under the CO (Colombia) region.
 */
export function registerGenericStrategyForTags(
  registry: Record<string, Record<RegionCode, TagMappingStrategy>>,
  tags: string[],
  strategy: TagMappingStrategy
): void {
  for (const tag of tags) {
    registry[tag] = {
      CO: strategy,
      GLOBAL: defaultStrategy,
      DEFAULT: defaultStrategy,
    };
  }
}
