import { TlvEntity } from '../../domain/entities/tlv.entity';
import { REGIONS } from '../constants/regions.constant';

/**
 * A function that resolves a tag (e.g., "54") to a named field (e.g., "transactionAmount").
 */
export type TagNameResolver = (tag: string) => string;

/**
 * A function that resolves a subtag within a parent tag to a descriptive name.
 * Used in CO mode to provide context-aware subfield naming.
 */
export type SubtagNameResolver = (parentTag: string, subtag: string) => string;

/**
 * A function that maps a TLV entity into a named object representation.
 */
export type TagMappingStrategy = (tlv: TlvEntity) => Record<string, any>;

/**
 * The supported region codes for resolving tag strategies.
 */
export type RegionCode = keyof typeof REGIONS;
