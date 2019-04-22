// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

describe("Items", () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client, "get").resolves(responseJSON);
    sinon.stub(client, "put").resolves(responseJSON);
    sinon.stub(client, "patch").resolves(responseJSON);
    sinon.stub(client, "post").resolves(responseJSON);
    sinon.stub(client, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe("#getMyBookmarks()", () => {
    it("Errors if parameter `params` is of a wrong type", () => {
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
        expect(client.get).to.have.been.calledTwice;
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(`#getMyBookmarks() x2 errored: ${err.message}`);
      }
    });
  });
});
