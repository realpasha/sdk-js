// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

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

    sinon.stub(client.api, "request").resolves(responseJSON);
    sinon.stub(client.api, "get").resolves(responseJSON);
    sinon.stub(client.api, "put").resolves(responseJSON);
    sinon.stub(client.api, "patch").resolves(responseJSON);
    sinon.stub(client.api, "post").resolves(responseJSON);
    sinon.stub(client.api, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    client.api.request.restore();
    client.api.get.restore();
    client.api.put.restore();
    client.api.patch.restore();
    client.api.post.restore();
    client.api.delete.restore();
  });

  describe("#uploadFiles()", () => {
    it("Errors on missing `fileslist` parameter", () => {
      expect(client.uploadFiles).to.throw();
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Calls post() for the right endpoint", () => {
      client.uploadFiles(["fileA", "fileB"]);
      expect(client.api.request).to.have.been.calledWith("POST", "/files", {}, ["fileA", "fileB"], false, {
        "Content-Type": "multipart/form-data",
      });
    });
  });
});
