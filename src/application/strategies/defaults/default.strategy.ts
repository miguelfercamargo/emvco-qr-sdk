import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TagMappingStrategy } from '../../types/tag-resolver.type';

/**
 * Default strategy used when no specific interpretation is required.
 *
 * This strategy simply returns the raw TLV object without transformation.
 * Used for fallback behavior in GLOBAL or DEFAULT regions.
 *
 * @param tlv - The original TLV entity.
 * @returns The unmodified TLV entity.
 */
export const defaultStrategy: TagMappingStrategy = (tlv: TlvEntity) => tlv;
