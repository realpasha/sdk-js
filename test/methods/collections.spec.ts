import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";

const expect = chai.expect;
chai.use(sinonChai);

describe("Collections", () => {
  let client: SDK;

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
    (client.api.get as any).restore();
    (client.api.put as any).restore();
    (client.api.patch as any).restore();
    (client.api.post as any).restore();
    (client.api.delete as any).restore();
  });

  describe("#getCollections()", () => {
    it("Defaults to an empty object if no parameters are passed", () => {
      client.getCollections();
      expect(client.api.get).to.have.been.calledWith("/collections", {});
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getCollections("params" as any)).to.throw();
    });

    it("Calls get() for the right endpoint", () => {
      client.getCollections({ limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/collections", {
        limit: 50,
      });
    });
  });

  describe("#getCollection()", () => {
    it("Errors on missing `collection` parameter", () => {
      expect(client.getCollection).to.throw();
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getCollection("projects", "params" as any)).to.throw();
    });

    it("Calls get() for the right endpoint", () => {
      client.getCollection("projects", { limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/collections/projects", {
        limit: 50,
      });
    });
  });

  describe("#createCollection()", () => {
    it("Errors on missing `data` parameter", () => {
      expect(client.createCollection).to.throw();
    });

    it("Calls post() for the right endpoint", () => {
      client.createCollection({ collection: "test" });
      expect(client.api.post).to.have.been.calledWith("/collections", {
        collection: "test",
      });
    });
  });

  describe("#updateCollection()", () => {
    it("Errors on missing `collection` parameter", () => {
      expect(client.updateCollection).to.throw();
    });

    it("Errors on missing `data` parameter", () => {
      expect(() => client.updateCollection("test", undefined as any)).to.throw();
    });

    it("Calls patch() for the right endpoint", () => {
      client.updateCollection("test", { note: "test note" });
      expect(client.api.patch).to.have.been.calledWith("/collections/test", {
        note: "test note",
      });
    });
  });

  describe("#deleteCollection()", () => {
    it("Errors on missing `collection` parameter", () => {
      expect(() => client.deleteCollection(undefined as any)).to.throw();
    });

    it("Calls delete() for the right endpoint", () => {
      client.deleteCollection("test");
      expect(client.api.delete).to.have.been.calledWith("/collections/test");
    });
  });
});
