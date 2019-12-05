import { Column, ColumnOptions } from "typeorm";
import { RegExpStringTransformer } from "./RegExpStringTransformer";

export function RegExpColumn(opts: ColumnOptions = {}) {
  opts.type = String;
  opts.transformer = RegExpStringTransformer;
  return Column(opts)
}
