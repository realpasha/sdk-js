// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
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

  describe("#getRoles()", () => {
    it("Defaults to an empty object if no parameters are passed", () => {
      client.getRoles();
      expect(client.api.get).to.have.been.calledWith("/roles", {});
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getRoles("params")).to.throw();
    });

    it("Calls get() for the right endpoint", async () => {
      client.getRoles({ limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/roles", { limit: 50 });
    });
  });

  describe("#getRole()", () => {
    it("Errors if parameter `primaryKey` does not exist", () => {
      expect(client.getRole).to.throw();
    });

    it("Errors if parameter `primaryKey` is of a wrong type", () => {
      expect(() => client.getRole({})).to.throw();
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getRole(4, "params")).to.throw();
    });

    it("Calls get() for the right endpoint", async () => {
      client.getRole(4, { fields: "name,id" });
      expect(client.api.get).to.have.been.calledWith("/roles/4", {
        fields: "name,id",
      });
    });
  });

  describe("#updateRole()", () => {
    it("Errors on missing `primaryKey` parameter", () => {
      expect(client.updateRole).to.throw();
    });

    it("Errors on missing `body` parameter", () => {
      expect(() => client.updateRole(15)).to.throw();
    });

    it("Calls patch() for the right endpoint", () => {
      client.updateRole(15, { name: "Intern" });
      expect(client.api.patch).to.have.been.calledWith("/roles/15", {
        name: "Intern",
      });
    });
  });

  describe("#createRole()", () => {
    it("Errors on missing `body` parameter", () => {
      expect(client.createRole).to.throw();
    });

    it("Errors on wrong `body` parameter type", () => {
      expect(() => client.createRole(15)).to.throw();
    });

    it("Calls post() for the right endpoint", () => {
      client.createRole({ name: "Intern" });
      expect(client.api.post).to.have.been.calledWith("/roles", {
        name: "Intern",
      });
    });
  });

  describe("#deleteRole()", () => {
    it("Errors on missing `primaryKey` parameter", () => {
      expect(client.deleteRole).to.throw();
    });

    it("Calls delete() for the right endpoint", () => {
      client.deleteRole(15);
      expect(client.api.delete).to.have.been.calledWith("/roles/15");
    });
  });
});
