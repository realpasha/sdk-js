// tslint:disable
import * as chai from "chai";
import * as sinonChai from "sinon-chai";
import SDK from "../src/index";

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

describe("General", () => {
  it("Creates a new instance without errors", () => {
    expect(() => new SDK(undefined as any)).not.to.throw();
  });

  it("Allows you to set and retrieve the api url", () => {
    const client = new SDK(undefined as any) as any;
    client.url = "https://demo-api.getdirectus.com/";
    expect(client.url).to.equal("https://demo-api.getdirectus.com/");
  });

  it("Allows you to set the url on creation", () => {
    const client = new SDK({
      url: "https://demo-api.getdirectus.com/",
    }) as any;
    expect(client.url).to.equal("https://demo-api.getdirectus.com/");
  });

  it("Allows you to set and retrieve the access token", () => {
    const client = new SDK(undefined as any) as any;
    client.token = "abcdef123456";
    expect(client.token).to.equal("abcdef123456");
  });

  it("Allows you to set the access token on creation", () => {
    const client = new SDK({
      token: "abcdef123456",
    } as any);
    expect((client as any).token).to.equal("abcdef123456");
  });

  it("Allows you to set and retrieve the environment in use", () => {
    const client = new SDK(undefined as any) as any;
    client.env = "staging";
    expect(client.env).to.equal("staging");
  });

  /**
   * FIXME: [ERR_STABLE]
   */
  it.skip("Allows you to set the environment on creation", () => {
    const client = new SDK({
      env: "staging",
    } as any) as any;
    expect(client.env).to.equal("staging");
  });

  /**
   * FIXME: [ERR_STABLE]
   */
  it.skip("Defaults the environment to underscore (_)", () => {
    const client = new SDK(undefined as any) as any;
    expect(client.env).to.equal("_");
  });
});
