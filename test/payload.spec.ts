import * as chai from "chai";
// @ts-ignore wrong module format of chai-datetime!
import * as chaiDateTime from "chai-datetime";
import * as jwt from "jsonwebtoken";
import * as sinonChai from "sinon-chai";

import SDK from "../src/index";

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiDateTime);

describe("Payload", () => {
  let client: SDK;

  beforeEach(() => {
    client = new SDK(undefined as any);
  });

  it("Returns null when there is no token set", () => {
    expect(client.payload).to.be.null;
  });

  it("Returns the correct payload from the set token", () => {
    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      noTimestamp: true,
    });
    expect(client.payload).to.deep.include({ foo: "bar" });
  });

  it("Converts the optional exp in payload to the correct JS Date", () => {
    // JWT Expires in 1h
    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      expiresIn: "1h",
      noTimestamp: true,
    });

    const date = new Date();
    date.setHours(date.getHours() + 1);

    expect(client.payload.exp).to.equalDate(date);
  });
});
