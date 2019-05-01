// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../src/index";
import { ISDK } from "../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

describe("Request", () => {
  let client: ISDK;

  beforeEach(() => {
    client = new SDK({
      url: "https://demo-api.getdirectus.com",
    });
  });

  describe("#request()", () => {
    beforeEach(() => {
      sinon.stub(client.api.xhr, "request").resolves();
    });

    afterEach(() => {
      try {
        (client.api.xhr.request as any).restore();
      } catch (err) {
        // do nothing ...
      }
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.request).to.throw();
    });

    it("Errors on missing parameter endpoint", () => {
      expect(() => client.api.request("get", undefined as any)).to.throw();
    });

    it("Errors if params is not of the right type", () => {
      expect(() => client.api.request("get", "/items", "wrong-params" as any)).to.throw();
    });

    describe("Allows arrays and objects for data", () => {
      it("Errors on a non-array/non-object type", () => {
        (client.api.xhr.request as any).restore();
        expect(() => client.api.request("post", "/items", {}, "data" as any)).to.throw();
        sinon.stub(client.api, "request").resolves();
      });

      it("Does not error when body is an array or object", () => {
        expect(async () => {
          try {
            await client.api.request("post", "/items", {}, []);
          } catch (err) {
            // error allowed, it only will give us "Network Error" because we mock the calls
          }
        }).to.not.throw();
        expect(async () => {
          try {
            await client.api.request("post", "/items", {}, {});
          } catch (err) {
            // error allowed, it only will give us "Network Error" because we mock the calls
          }
        }).to.not.throw();
      });
    });

    it("Errors when there is no API URL set", () => {
      (client.config as any).internalConfiguration.url = undefined;
      expect(() => client.api.request("get", "/items")).to.throw();
    });

    it("Calls Axios with the right config", () => {
      (client.api.xhr.request as any).returns(
        Promise.resolve({
          response: {
            data: {
              error: {
                code: 1,
                message: "Not Found",
              },
            },
          },
        })
      );

      client.api.request("get", "/ping");

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        headers: {},
        method: "get",
        params: {},
        url: "/ping",
      });
    });

    it("Calls Axios with the right config (body)", () => {
      (client.api.xhr.request as any).returns(
        Promise.resolve({
          response: {
            data: {
              error: {
                code: 1,
                message: "Not Found",
              },
            },
          },
        })
      );

      client.api.request(
        "post",
        "/utils/random_string",
        {},
        {
          testing: true,
        }
      );

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {
          testing: true,
        },
        headers: {},
        method: "post",
        params: {},
        url: "/utils/random_string",
      });
    });

    it("Calls Axios with the right config (params)", () => {
      (client.api.xhr.request as any).returns(
        Promise.resolve({
          response: {
            data: {
              error: {
                code: 1,
                message: "Not Found",
              },
            },
          },
        })
      );

      client.api.request("get", "/utils/random_string", { queryParam: true });

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        headers: {},
        method: "get",
        params: {
          queryParam: true,
        },
        url: "/utils/random_string",
      });
    });

    it("Adds Bearer header if access token is set", () => {
      (client.api.xhr.request as any).returns(
        Promise.resolve({
          response: {
            data: {
              error: {
                code: 1,
                message: "Not Found",
              },
            },
          },
        })
      );

      client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });

      client.api.request("get", "/utils/random_string", { queryParam: true });

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        headers: {
          Authorization: `Bearer ${client.config.token}`,
        },
        method: "get",
        params: {
          queryParam: true,
        },
        url: "/utils/random_string",
      });
    });

    it("Returns network error if the API did not respond", async () => {
      (client.api.xhr.request as any).returns(
        Promise.reject({
          request: {},
        })
      );

      let error;

      try {
        await client.api.request("get", "/ping");
      } catch (err) {
        error = err;
      }

      expect(error).to.deep.include({
        code: -1,
        error: {
          request: {},
        },
        message: "Network Error",
      });
    });

    it("Returns API error if available", async () => {
      (client.api.xhr.request as any).returns(
        Promise.reject({
          response: {
            data: {
              error: {
                code: 1,
                message: "Not Found",
              },
            },
          },
        })
      );

      let error;

      try {
        await client.api.request("get", "/ping");
      } catch (err) {
        error = err;
      }

      expect(error.code).to.equal(1);
      expect(error.message).to.equal("Not Found");
    });

    it("Strips out Axios metadata from response", async () => {
      (client.api.xhr.request as any).resolves({
        data: {
          data: {},
          meta: {},
        },
        request: {},
        status: 200,
      });

      const result = await client.api.request("get", "/ping");

      expect(result).to.deep.include({
        data: {},
        meta: {},
      });
    });

    it("Supports an optional fifth parameter to make the request without the env", async () => {
      (client.api.xhr.request as any).resolves({
        response: {
          data: {
            error: {
              code: 1,
              message: "Not Found",
            },
          },
        },
      });

      await client.api.request("get", "/interfaces", {}, {});

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        headers: {},
        method: "get",
        params: {},
        url: "/interfaces",
      });

      await client.api.request("get", "/interfaces", {}, {}, true);

      expect(client.api.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/",
        data: {},
        headers: {},
        method: "get",
        params: {},
        url: "/interfaces",
      });
    });
  });

  describe("#get()", () => {
    beforeEach(() => {
      sinon.stub(client.api, "request");
    });

    afterEach(() => {
      (client.api.request as any).restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.get).to.throw();
    });

    it("Calls request() with the right parameters", () => {
      client.api.get("/items/projects", {
        limit: 20,
      });

      expect(client.api.request).to.have.been.calledWith("get", "/items/projects", {
        limit: 20,
      });
    });
  });

  describe("#post()", () => {
    beforeEach(() => {
      sinon.stub(client.api, "request");
    });

    afterEach(() => {
      (client.api.request as any).restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.post).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.api.post("projects", "body" as any)).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.api.post("projects", [])).to.not.throw();
        expect(() => client.api.post("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.api.post("/items/projects", {
        title: "New Project",
      });

      expect(client.api.request).to.have.been.calledWith(
        "post",
        "/items/projects",
        {},
        {
          title: "New Project",
        }
      );
    });
  });

  describe("#patch()", () => {
    beforeEach(() => {
      sinon.stub(client.api, "request");
    });

    afterEach(() => {
      (client.api.request as any).restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.patch).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.api.patch("projects", "body" as any)).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.api.patch("projects", [])).to.not.throw();
        expect(() => client.api.patch("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.api.patch("/items/projects/1", {
        title: "New Project",
      });

      expect(client.api.request).to.have.been.calledWith(
        "patch",
        "/items/projects/1",
        {},
        {
          title: "New Project",
        }
      );
    });
  });

  describe("#put()", () => {
    beforeEach(() => {
      sinon.stub(client.api, "request");
    });

    afterEach(() => {
      (client.api.request as any).restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.put).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.api.put("projects", "body" as any)).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.api.put("projects", [])).to.not.throw();
        expect(() => client.api.put("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.api.put("/items/projects/1", {
        title: "New Project",
      });

      expect(client.api.request).to.have.been.calledWith(
        "put",
        "/items/projects/1",
        {},
        {
          title: "New Project",
        }
      );
    });
  });

  describe("#delete()", () => {
    beforeEach(() => {
      sinon.stub(client.api, "request");
    });

    afterEach(() => {
      (client.api.request as any).restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.api.delete).to.throw();
    });

    it("Calls request() with the right parameters", () => {
      client.api.delete("/items/projects/1");

      expect(client.api.request).to.have.been.calledWith("delete", "/items/projects/1");
    });
  });
});
