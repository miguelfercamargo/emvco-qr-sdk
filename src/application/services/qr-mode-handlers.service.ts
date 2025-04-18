/**
 * Provides handler functions for different QR parsing modes.
 * Each handler converts TLV entities into a structure based on the selected strategy.
 */

import { TlvEntity } from '../../domain/entities/tlv.entity';
import { QRParseMode } from '../../domain/enums/qr-parse-mode.enum';
import { NamedFieldsMapper } from '../mappers/named-fields.mapper';
import { TLVUtil } from '../utils/resolvers/tlv.util';
import { RawObjectMapperService } from './raw-object-mapper.service';

/**
 * Map of handlers used to convert parsed TLVs into objects based on the QR parsing mode.
 */
export const PARSE_MODE_HANDLERS: Record<
  QRParseMode,
  (tlvs: TlvEntity[]) => TlvEntity[] | Record<string, any>
> = {
  [QRParseMode.TLV]: (tlvs: TlvEntity[]) => tlvs,
  [QRParseMode.RAW_OBJECT]: (tlvs: TlvEntity[]) => RawObjectMapperService.map(tlvs),
  [QRParseMode.GLOBAL]: (tlvs: TlvEntity[]) => NamedFieldsMapper.map(tlvs, TLVUtil.getStandardName),
  [QRParseMode.CO]: (tlvs: TlvEntity[]) =>
    NamedFieldsMapper.map(tlvs, TLVUtil.getColombianName, TLVUtil.getColombianSubtagName),
};

/**
 * Returns the appropriate handler for mapping TLVs using named fields, restricted to GLOBAL or CO.
 *
 * @param mode - The QR parse mode to use (must be GLOBAL or CO).
 * @returns A function that maps TLVs to named key/value objects.
 */
export const getNamedHandler = (
  mode: QRParseMode.GLOBAL | QRParseMode.CO
): ((tlvs: TlvEntity[]) => Record<string, any>) => {
  return PARSE_MODE_HANDLERS[mode] as (tlvs: TlvEntity[]) => Record<string, any>;
};
