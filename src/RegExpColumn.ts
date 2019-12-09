import { Column, ColumnOptions, BeforeInsert, BeforeUpdate, AfterLoad, AfterInsert, AfterUpdate } from "typeorm";
import { RegExpStringTransformer } from "./RegExpStringTransformer";

/**
 * RegExpColumn allows storing a RegExp in the db using RegExpStringTransformer.
 *
 * Because TypeORM cannot properly serialize RegExp objects (even if a
 * transformer is used), this function uses Before* and After* hooks to
 * serialize and deserialize the RegExp manually using RegExpStringTransformer.
 * @param opts
 * @see https://github.com/typeorm/typeorm/pull/5182
 */
export function RegExpColumn(opts: ColumnOptions = {}) {
  opts.type = String;
  const colFn = Column(opts);
  const beforeInsertFn = BeforeInsert();
  const beforeUpdateFn = BeforeUpdate();
  const afterLoadFn = AfterLoad();
  const afterInsertFn = AfterInsert();
  const afterUpdateFn = AfterUpdate();

  return function (object: Object, propertyName: string) {
    const serializeRegExp = `RegExpColumn__serializeRegExp__${propertyName}`;
    const deserializeRegExp = `RegExpColumn__deserializeRegExp__${propertyName}`;

    Object.defineProperty(object, serializeRegExp, {
      enumerable: false,
      writable: false,
      value: function() {
        this[propertyName] = RegExpStringTransformer.to(this[propertyName]);
      },
    });

    Object.defineProperty(object, deserializeRegExp, {
      enumerable: false,
      writable: false,
      value: function() {
        this[propertyName] = RegExpStringTransformer.from(this[propertyName]);
      }
    });

    beforeInsertFn(object, serializeRegExp);
    beforeUpdateFn(object, serializeRegExp);
    afterLoadFn(object, deserializeRegExp);
    afterInsertFn(object, deserializeRegExp);
    afterUpdateFn(object, deserializeRegExp);

    return colFn(object, propertyName);
  }
}
