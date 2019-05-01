// tslint:disable: no-unused-expression
import * as chai from "chai";
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

    sinon.stub(client.api, "request").resolves(responseJSON);
  });

  afterEach(() => {
    client.api.request.restore();
  });

  describe("#getInterfaces()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getInterfaces();
      expect(client.api.request).to.have.been.calledWith("get", "/interfaces", {}, {}, true);
    });
  });

  describe("#getLayouts()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getLayouts();
      expect(client.api.request).to.have.been.calledWith("get", "/layouts", {}, {}, true);
    });
  });

  describe("#getPages()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getPages();
      expect(client.api.request).to.have.been.calledWith("get", "/pages", {}, {}, true);
    });
  });
});
