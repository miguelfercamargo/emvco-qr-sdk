import { TlvEntity } from '../../../domain/entities/tlv.entity';
import { TAG_GUI } from '../../constants/qr.constant';
import { TagMappingStrategy } from '../../types/tag-resolver.type';
import { TagNameResolverUtil } from '../../utils/resolvers/tag-name-resolver.util';

/**
 * Mapping strategy for TLV tags that contain a `gui` and a typed value.
 *
 * This is used for structures like tag 26 (merchantAccountInfo) or tag 80 (channel),
 * which include a GUI (Globally Unique Identifier) subtag ("00"), and a typed value
 * with a subtag code ("01", "02", etc.).
 *
 * Example output:
 * ```ts
 * {
 *   gui: "CO.COM.CRB.RED",
 *   rawType: "01",
 *   type: "MOBILE_NUMBER",
 *   value: "3123456789"
 * }
 * ```
 *
 * @param tlv - The TLV entity to transform.
 * @returns An object with `gui`, `rawType`, `type` (resolved name), and `value`.
 */
export const guiAndTypedStrategy: TagMappingStrategy = (tlv: TlvEntity) => {
  const subTags = tlv.subTags ?? [];
  const gui = subTags.find((s) => s.tag === TAG_GUI)?.value;
  const typed = subTags.find((s) => s.tag !== TAG_GUI);

  return {
    gui,
    ...(typed && {
      rawType: typed.tag,
      type: TagNameResolverUtil.getColombianSubtagName(tlv.tag, typed.tag),
      value: typed.value,
    }),
  };
};
