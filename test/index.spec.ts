import { hello } from "../src";

test("hello", function() {
  expect(hello()).toEqual("Hello");
});
