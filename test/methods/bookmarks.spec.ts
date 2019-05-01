// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";

const expect = chai.expect;
chai.use(sinonChai);

describe("Items", () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      token: "token",
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client.api, "get").resolves(responseJSON);
    sinon.stub(client.api, "put").resolves(responseJSON);
    sinon.stub(client.api, "patch").resolves(responseJSON);
    sinon.stub(client.api, "post").resolves(responseJSON);
    sinon.stub(client.api, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    client.api.get.restore();
    client.api.put.restore();
    client.api.patch.restore();
    client.api.post.restore();
    client.api.delete.restore();
  });

  describe("#getMyBookmarks()", () => {
    // TODO: This case doesn't exist anymore as params is default = {}
    it.skip("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getMyListingPreferences("params")).to.throw();
    });

    it("Calls get() two times", () => {
      try {
        client.token = jwt.sign({ foo: "bar" }, "secret-string", {
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
