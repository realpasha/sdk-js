// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../src/index";

const expect = chai.expect;
chai.use(sinonChai);

describe("Request", () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      url: "https://demo-api.getdirectus.com",
    });
  });

  describe("#request()", () => {
    beforeEach(() => {
      sinon.stub(client.xhr, "request").resolves();
    });

    afterEach(() => {
      client.xhr.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.request).to.throw();
    });

    it("Errors on missing parameter endpoint", () => {
      expect(() => client.request("get")).to.throw();
    });

    it("Errors if params is not of the right type", () => {
      expect(() => client.request("get", "/items", "wrong-params")).to.throw();
    });

    describe("Allows arrays and objects for data", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.request("post", "/items", {}, "data")).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.request("post", "/items", {}, [])).to.not.throw();
        expect(() => client.request("post", "/items", {}, {})).to.not.throw();
      });
    });

    it("Errors when there is no API URL set", () => {
      client.url = null;
      expect(() => client.request("get", "/items")).to.throw();
    });

    it("Calls Axios with the right config", () => {
      client.xhr.request.returns(
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

      client.request("get", "/ping");

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        method: "get",
        params: {},
        url: "/ping",
      });
    });

    it("Calls Axios with the right config (body)", () => {
      client.xhr.request.returns(
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

      client.request(
        "post",
        "/utils/random_string",
        {},
        {
          testing: true,
        }
      );

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {
          testing: true,
        },
        method: "post",
        params: {},
        url: "/utils/random_string",
      });
    });

    it("Calls Axios with the right config (params)", () => {
      client.xhr.request.returns(
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

      client.request("get", "/utils/random_string", { queryParam: true });

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        method: "get",
        params: {
          queryParam: true,
        },
        url: "/utils/random_string",
      });
    });

    it("Adds Bearer header if access token is set", () => {
      client.xhr.request.returns(
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

      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });

      client.request("get", "/utils/random_string", { queryParam: true });

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        headers: {
          Authorization: `Bearer ${client.token}`,
        },
        method: "get",
        params: {
          queryParam: true,
        },
        url: "/utils/random_string",
      });
    });

    it("Returns network error if the API did not respond", async () => {
      client.xhr.request.returns(Promise.reject({ request: {} }));

      let error;

      try {
        await client.request("get", "/ping");
      } catch (err) {
        error = err;
      }

      expect(error).to.deep.equal({
        code: -1,
        error: {
          request: {},
        },
        message: "Network Error",
      });
    });

    it("Returns API error if available", async () => {
      client.xhr.request.returns(
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
        await client.request("get", "/ping");
      } catch (err) {
        error = err;
      }

      expect(error).to.deep.equal({
        code: 1,
        message: "Not Found",
      });
    });

    it("Strips out Axios metadata from response", async () => {
      client.xhr.request.resolves({
        data: {
          data: {},
          meta: {},
        },
        request: {},
        status: 200,
      });

      const result = await client.request("get", "/ping");

      expect(result).to.deep.equal({
        data: {},
        meta: {},
      });
    });

    it("Supports an optional fifth parameter to make the request without the env", async () => {
      client.xhr.request.resolves({
        response: {
          data: {
            error: {
              code: 1,
              message: "Not Found",
            },
          },
        },
      });

      await client.request("get", "/interfaces", {}, {});

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {},
        method: "get",
        params: {},
        url: "/interfaces",
      });

      await client.request("get", "/interfaces", {}, {}, true);

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/",
        data: {},
        method: "get",
        params: {},
        url: "/interfaces",
      });
    });
  });

  describe("#get()", () => {
    beforeEach(() => {
      sinon.stub(client, "request");
    });

    afterEach(() => {
      client.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.get).to.throw();
    });

    it("Calls request() with the right parameters", () => {
      client.get("/items/projects", {
        limit: 20,
      });

      expect(client.request).to.have.been.calledWith("get", "/items/projects", {
        limit: 20,
      });
    });
  });

  describe("#post()", () => {
    beforeEach(() => {
      sinon.stub(client, "request");
    });

    afterEach(() => {
      client.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.post).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.post("projects", "body")).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.post("projects", [])).to.not.throw();
        expect(() => client.post("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.post("/items/projects", {
        title: "New Project",
      });

      expect(client.request).to.have.been.calledWith(
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
      sinon.stub(client, "request");
    });

    afterEach(() => {
      client.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.patch).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.patch("projects", "body")).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.patch("projects", [])).to.not.throw();
        expect(() => client.patch("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.patch("/items/projects/1", {
        title: "New Project",
      });

      expect(client.request).to.have.been.calledWith(
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
      sinon.stub(client, "request");
    });

    afterEach(() => {
      client.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.put).to.throw();
    });

    describe("Allows arrays and objects for body", () => {
      it("Errors on a non-array/non-object type", () => {
        expect(() => client.put("projects", "body")).to.throw();
      });

      it("Does not error when body is an array or object", () => {
        expect(() => client.put("projects", [])).to.not.throw();
        expect(() => client.put("projects", {})).to.not.throw();
      });
    });

    it("Calls request() with the right parameters", () => {
      client.put("/items/projects/1", {
        title: "New Project",
      });

      expect(client.request).to.have.been.calledWith(
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
      sinon.stub(client, "request");
    });

    afterEach(() => {
      client.request.restore();
    });

    it("Errors on missing parameter method", () => {
      expect(client.delete).to.throw();
    });

    it("Calls request() with the right parameters", () => {
      client.delete("/items/projects/1");

      expect(client.request).to.have.been.calledWith("delete", "/items/projects/1");
    });
  });
});
