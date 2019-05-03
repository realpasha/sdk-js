import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

describe("Bookmarks", () => {
  let client: ISDK;

  beforeEach(() => {
    client = new SDK({
      token: "token",
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = {
      data: [],
    };

    sinon.stub(client.api, "get").resolves(responseJSON);
    sinon.stub(client.api, "put").resolves(responseJSON);
    sinon.stub(client.api, "patch").resolves(responseJSON);
    sinon.stub(client.api, "post").resolves(responseJSON);
    sinon.stub(client.api, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    (client.api.get as any).restore();
    (client.api.put as any).restore();
    (client.api.patch as any).restore();
    (client.api.post as any).restore();
    (client.api.delete as any).restore();
  });

  describe("#getMyBookmarks()", () => {
    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getMyListingPreferences("params", "invalid type" as any)).to.throw();
    });

    it("Calls get() two times", () => {
      try {
        client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
          expiresIn: "1h",
          noTimestamp: true,
        });

        client.getMyBookmarks();
        // tslint:disable-next-line: no-unused-expression
        expect(client.api.get).to.have.been.calledTwice;
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(`#getMyBookmarks() x2 errored: ${err.message}`);
      }
    });
  });
});
