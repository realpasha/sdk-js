import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../src/SDK";
import { mockAxiosResponse } from "../mock/response";

const expect = chai.expect;
chai.use(sinonChai);

describe("Files", () => {
  let client: ISDK;

  beforeEach(() => {
    client = new SDK({
      token: "abcdef",
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = mockAxiosResponse({
      data: {
        data: {},
      },
    });

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
