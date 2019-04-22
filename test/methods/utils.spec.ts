// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

describe("Utils", () => {
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

    sinon.stub(client, "request").resolves(responseJSON);
    sinon.stub(client, "get").resolves(responseJSON);
    sinon.stub(client, "put").resolves(responseJSON);
    sinon.stub(client, "patch").resolves(responseJSON);
    sinon.stub(client, "post").resolves(responseJSON);
    sinon.stub(client, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    client.request.restore();
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe("#ping()", () => {
    it("It calls get for the ping endpoint", () => {
      client.ping();
      expect(client.request).to.have.been.calledWith("get", "/server/ping", {}, {}, true);
    });
  });

  describe("#getThirdPartyAuthProviders()", () => {
    it("It calls get for the sso endpoint", () => {
      client.getThirdPartyAuthProviders();
      expect(client.get).to.have.been.calledWith("/auth/sso");
    });
  });
});
