import { Thing } from "./support/Thing";
import { createConnection, Repository, Connection } from "typeorm";
import { promises } from "fs";

const database = `/tmp/bonaroo-reg-exp-test-${Math.random()}.sqlite`;
let connection: Connection;
let thingRepo: Repository<Thing>;

beforeAll(async function() {
  connection = await createConnection({
    type: "sqlite",
    database,
    entities: [ Thing ],
    synchronize: true,
    logging: true
  });
  thingRepo = connection.getRepository(Thing);
});

afterAll(async function() {
  if (connection) {
    await connection.close();
  }
  promises.unlink(database);
});

test("entity with RegExpColumn stores regular expression", async function() {
  const thing = new Thing();
  thing.foo = /foo/i;
  const savedThing = await thingRepo.save(thing);
  expect(savedThing.foo).toEqual(/foo/i);
  const storedThing = await thingRepo.findOne(savedThing.id);
  expect(storedThing.foo).toEqual(/foo/i);
});
