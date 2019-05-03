import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

describe("Collection Presets", () => {
  let client: ISDK;

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

  describe("#createCollectionPreset", () => {
    it("Errors when the data parameter is missing", () => {
      expect(client.createCollectionPreset).to.throw();
    });

    it("Calls post with the right parameters", async () => {
      await client.createCollectionPreset({
        view_type: "tiles",
      });
      expect(client.api.post).to.have.been.calledWith("/collection_presets", {
        view_type: "tiles",
      });
    });
  });

  describe("#updateCollectionPreset", () => {
    it("Errors when the primaryKey parameter is missing", () => {
      expect(client.updateCollectionPreset).to.throw();
    });

    it("Errors when the data parameter is missing", () => {
      expect(() => client.updateCollectionPreset(15, undefined as any)).to.throw();
    });

    it("Calls patch with the right parameters", async () => {
      await client.updateCollectionPreset(15, {
        view_type: "tiles",
      });
      expect(client.api.patch).to.have.been.calledWith("/collection_presets/15", {
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
      expect(client.api.delete).to.have.been.calledWith("/collection_presets/15");
    });
  });
});
