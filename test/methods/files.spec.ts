// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

describe("Items", () => {
  let client: ISDK;

  beforeEach(() => {
    client = new SDK({
      token: "abcdef",
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client.api.xhr, "post").resolves(responseJSON);
  });

  afterEach(() => {
    (client.api.xhr.post as any).restore();
  });

  describe("#uploadFiles()", () => {
    it("Errors on missing `fileslist` parameter", () => {
      expect(client.uploadFiles).to.throw();
    });

    it("Calls post() for the right endpoint", async () => {
      await client.uploadFiles(["fileA", "fileB"]);

      // Validate against upload post parameters
      expect(client.api.xhr.post).to.have.been.calledWith(
        "https://demo-api.getdirectus.com/_/files",
        ["fileA", "fileB"]
        // {
        //   headers: { Authorization: "Bearer abcdef", "Content-Type": "multipart/form-data" },
        //   onUploadProgress: function onUploadProgress() { }
        // }
      );
    });
  });
});
