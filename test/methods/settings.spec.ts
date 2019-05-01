// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

describe("Settings", () => {
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

  describe("#getSettings()", () => {
    it("Defaults to an empty object if no parameters are passed", () => {
      client.getSettings();
      expect(client.api.get).to.have.been.calledWith("/settings", {});
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getSettings("params")).to.throw();
    });

    it("Calls get() for the right endpoint", () => {
      client.getSettings({ limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/settings", {
        limit: 50,
      });
    });
  });
});
