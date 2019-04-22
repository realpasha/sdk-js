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

    sinon.stub(client, "get").resolves(responseJSON);
    sinon.stub(client, "put").resolves(responseJSON);
    sinon.stub(client, "patch").resolves(responseJSON);
    sinon.stub(client, "post").resolves(responseJSON);
    sinon.stub(client, "delete").resolves(responseJSON);
  });

  afterEach(() => {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe("#createCollectionPreset", () => {
    it("Errors when the data parameter is missing", () => {
      expect(client.createCollectionPreset).to.throw();
    });

    it("Calls post with the right parameters", async () => {
      await client.createCollectionPreset({
        view_type: "tiles",
      });
      expect(client.post).to.have.been.calledWith("/collection_presets", {
        view_type: "tiles",
      });
    });
  });

  describe("#updateCollectionPreset", () => {
    it("Errors when the primaryKey parameter is missing", () => {
      expect(client.updateCollectionPreset).to.throw();
    });

    it("Errors when the data parameter is missing", () => {
      expect(() => client.updateCollectionPreset(15)).to.throw();
    });

    it("Calls patch with the right parameters", async () => {
      await client.updateCollectionPreset(15, {
        view_type: "tiles",
      });
      expect(client.patch).to.have.been.calledWith("/collection_presets/15", {
        view_type: "tiles",
      });
    });
  });

  describe("#updateCollectionPreset", () => {
    it("Errors when the primaryKey parameter is missing", () => {
      expect(client.updateCollectionPreset).to.throw();
    });

    it("Calls delete with the right parameters", async () => {
      await client.deleteCollectionPreset(15);
      expect(client.delete).to.have.been.calledWith("/collection_presets/15");
    });
  });
});
