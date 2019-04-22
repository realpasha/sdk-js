// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

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

  describe("#getMyListingPreferences()", () => {
    it("Errors on missing `collection` parameter", () => {
      expect(client.getMyListingPreferences).to.throw();
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getMyListingPreferences("projects", "params")).to.throw();
    });

    it("Calls get() three times", () => {
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });
      client.getMyListingPreferences("projects");
      // tslint:disable-next-line: no-unused-expression
      expect(client.get).to.have.been.calledThrice;
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Returns the user preferences if there saved user preferences", async () => {
      client.token = jwt.sign({ group: 5, id: 1 }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][null]": 1,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [
            {
              request: "collection",
            },
          ],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [
            {
              request: "group",
            },
          ],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][eq]": 1,
        })
        .resolves({
          data: [
            {
              request: "user",
            },
          ],
        });

      const result = await client.getMyListingPreferences("faq");

      expect(result).to.deep.equal({
        request: "user",
      });
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Returns the group preferences if there are no saved user preferences", async () => {
      client.token = jwt.sign({ group: 5, id: 1 }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][null]": 1,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [
            {
              request: "collection",
            },
          ],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [
            {
              request: "group",
            },
          ],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][eq]": 1,
        })
        .resolves({
          data: [],
        });

      const result = await client.getMyListingPreferences("faq");

      expect(result).to.deep.equal({
        request: "group",
      });
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Returns the collection preferences if there are no saved user or preferences", async () => {
      client.token = jwt.sign({ group: 5, id: 1 }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][null]": 1,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [
            {
              request: "collection",
            },
          ],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][null]": 1,
        })
        .resolves({
          data: [],
        });

      client.get
        .withArgs(`/collection_presets`, {
          "filter[collection][eq]": "faq",
          "filter[group][eq]": 5,
          "filter[title][null]": 1,
          "filter[user][eq]": 1,
        })
        .resolves({
          data: [],
        });

      const result = await client.getMyListingPreferences("faq");

      expect(result).to.deep.equal({
        request: "collection",
      });
    });
  });
});
