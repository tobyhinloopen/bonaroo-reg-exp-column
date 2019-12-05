import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { RegExpColumn } from "../../src/RegExpColumn";

@Entity()
export class Thing {
  @PrimaryGeneratedColumn()
  public id: number;

  @RegExpColumn()
  public foo: RegExp;
}
