import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";

import { mockAxiosResponse } from "../mock/response";

const expect = chai.expect;
chai.use(sinonChai);

describe("Files", () => {
  let client: SDK;

  beforeEach(() => {
    client = new SDK({
      token: "abcdef",
      url: "https://demo-api.getdirectus.com",
      project: "testProject",
      mode: "jwt",
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
    it("Calls post() for the right endpoint", async () => {
      await client.uploadFiles(["fileA", "fileB"]);

      // Validate against upload post parameters
      expect(client.api.xhr.post).to.have.been.calledWith(
        "https://demo-api.getdirectus.com/testProject/files",
        ["fileA", "fileB"]
        // {
        //   headers: {
        //     Authorization: "Bearer abcdef",
        //     "Content-Type": "multipart/form-data",
        //     "X-Directus-Project": "testProject",
        //   },
        //   onUploadProgress: function onUploadProgress() {
        //   },
        // },
      );
    });
  });
});
