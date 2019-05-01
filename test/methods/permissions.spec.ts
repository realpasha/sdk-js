// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";

const expect = chai.expect;
chai.use(sinonChai);

describe("Relations", () => {
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

  describe("#getPermissions()", () => {
    it("Defaults to an empty object if no parameters are passed", () => {
      client.getPermissions();
      expect(client.api.get).to.have.been.calledWith("/permissions", {});
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getPermissions("params")).to.throw();
    });

    it("Calls get() for the right endpoint", () => {
      client.getPermissions({ limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/permissions", {
        limit: 50,
      });
    });
  });

  describe("#updatePermissions()", () => {
    it("Errors on missing `data` parameter", () => {
      expect(client.updatePermissions).to.throw();
    });

    it("Errors on wrong `data` parameter", () => {
      expect(() => client.createPermissions("projects")).to.throw();
    });

    it("Calls post() for the right endpoint", () => {
      client.createPermissions([{ read: "none", collection: "projects" }]);
      expect(client.api.post).to.have.been.calledWith("/permissions", [{ read: "none", collection: "projects" }]);
    });
  });

  describe("#updatePermissions()", () => {
    it("Errors on missing `data` parameter", () => {
      expect(client.updatePermissions).to.throw();
    });

    it("Errors on wrong `data` parameter", () => {
      expect(() => client.updatePermissions("projects")).to.throw();
    });

    it("Calls post() for the right endpoint", () => {
      client.updatePermissions([{ read: "none", collection: "projects" }]);
      expect(client.api.patch).to.have.been.calledWith("/permissions", [{ read: "none", collection: "projects" }]);
    });
  });
});
