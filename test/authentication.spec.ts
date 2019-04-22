// tslint:disable: no-unused-expression
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../src/index";

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

describe("Authentication", () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      url: "https://demo-api.getdirectus.com",
    });

    sinon.stub(client.xhr, "request").resolves({
      data: {
        data: {
          token: "abcdef",
        },
      },
    });
  });

  afterEach(() => {
    client.xhr.request.restore();
  });

  describe("#login()", () => {
    it("Errors on missing parameter credentials", () => {
      expect(client.login).to.throw();
    });

    it("Errors on missing parameter credentials.email", () => {
      expect(() => client.login({})).to.throw();
    });

    it("Errors on missing parameter credentials.password", () => {
      expect(() => client.login({ email: "test@example.com" })).to.throw();
    });

    it("Sets the url in use when passed in credentials", async () => {
      await client.login({
        email: "test@example.com",
        password: "testPassword",
        url: "https://testing.getdirectus.com",
      });

      expect(client.url).to.equal("https://testing.getdirectus.com");
    });

    it("Calls Axios with the right parameters", async () => {
      await client.login({
        email: "test@example.com",
        password: "testPassword",
      });

      expect(client.xhr.request).to.have.been.calledWith({
        baseURL: "https://demo-api.getdirectus.com/_/",
        data: {
          email: "test@example.com",
          password: "testPassword",
        },
        method: "post",
        params: {},
        url: "/auth/authenticate",
      });
    });

    it("Replaces the stored token", async () => {
      await client.login({
        email: "text@example.com",
        password: "testPassword",
      });

      expect(client.token).to.equal("abcdef");
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Replaces env and url if passed", async () => {
      await client.login({
        email: "text@example.com",
        env: "testEnv",
        password: "testPassword",
        url: "https://example.com",
      });

      expect(client.url).to.equal("https://example.com");
      expect(client.env).to.equal("testEnv");
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Resolves with the currently logged in token, url, and env", async () => {
      const result = await client.login({
        email: "text@example.com",
        env: "testEnv",
        password: "testPassword",
        url: "https://example.com",
      });

      expect(result).to.deep.include({
        env: "testEnv",
        token: "abcdef",
        url: "https://example.com",
      });
    });
  });

  describe("#logout()", () => {
    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Nullifies the token, url, and env", () => {
      client.logout();
      expect(client.token).to.be.null;
      expect(client.url).to.be.null;
      expect(client.env).to.equal("_");
    });
  });

  describe("#refresh()", () => {
    it("Errors on missing parameter token", () => {
      expect(client.refresh).to.throw();
    });

    it("Resolves with the new token", async () => {
      const result = await client.refresh("oldToken");
      expect(result).to.deep.include({
        data: {
          token: "abcdef",
        },
      });
    });
  });

  describe("#refreshIfNeeded()", () => {
    it("Does nothing when token, url, env, or payload.exp is missing", () => {
      // Nothing
      client.url = null;
      client.env = null;
      expect(client.refreshIfNeeded()).to.be.undefined;
      // URL
      client.url = "https://demo-api.getdirectus.com";
      expect(client.refreshIfNeeded()).to.be.undefined;
      // URL + ENV
      client.env = "_";
      expect(client.refreshIfNeeded()).to.be.undefined;
      // URL + ENV + TOKEN (no exp in payload)
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        noTimestamp: true,
      });
      expect(client.refreshIfNeeded()).to.be.undefined;
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Overwrites the saved token with the new one", async () => {
      sinon.stub(client, "refresh").resolves({
        data: {
          token: "abcdef",
        },
      });
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });
      await client.refreshIfNeeded();
      expect(client.token).to.equal("abcdef");
      client.refresh.restore();
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Calls refresh() if expiry date is within 30 seconds of now", () => {
      sinon.stub(client, "refresh").resolves();
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "1h",
        noTimestamp: true,
      });
      expect(client.refreshIfNeeded()).to.be.undefined;
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });
      client.refreshIfNeeded();
      expect(client.refresh).to.have.been.calledWith(client.token);
      client.refresh.restore();
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Calls the optional onAutoRefreshSuccess() callback when the request succeeds", done => {
      sinon.stub(client, "refresh").resolves({
        data: {
          token: "abcdef",
        },
      });

      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });

      client.onAutoRefreshSuccess = info => {
        expect(info).to.deep.include({
          env: "_",
          token: "abcdef",
          url: "https://demo-api.getdirectus.com",
        });
        done();
      };

      client.refreshIfNeeded();

      client.refresh.restore();
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Calls the optional onAutoRefreshError() callback when request fails", done => {
      sinon.stub(client, "refresh").rejects({
        code: -1,
        message: "Network Error",
      });

      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });

      client.onAutoRefreshError = error => {
        expect(error).to.deep.include({
          code: -1,
          message: "Network Error",
        });
        done();
      };

      client.refreshIfNeeded();

      client.refresh.restore();
    });

    it("Does nothing if the token is expired and no onAutoRefreshError() callback has been given", () => {
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "-20s",
        noTimestamp: true,
      });
      expect(client.refreshIfNeeded()).to.be.undefined;
    });

    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Calls the optional onAutoRefreshError() callback when trying to refresh an expired token", done => {
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "-20s",
        noTimestamp: true,
      });

      client.onAutoRefreshError = error => {
        expect(error).to.deep.include({
          code: 102,
          message: "auth_expired_token",
        });
        done();
      };

      client.refreshIfNeeded();
    });
  });

  describe("Interval", () => {
    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
      sinon.stub(client, "refreshIfNeeded");
    });

    afterEach(() => {
      this.clock.restore();
      client.refreshIfNeeded.restore();
    });

    describe("#startInterval()", () => {
      it("Starts the interval", () => {
        client.startInterval();
        expect(client.refreshInterval).to.be.not.null;
      });

      it("Fires immediately if true has been passed as parameter", () => {
        client.startInterval(true);
        expect(client.refreshIfNeeded).to.have.been.calledOnce;
      });
    });

    describe("#stopInterval()", () => {
      it("Stops (deletes) the interval", () => {
        client.startInterval();
        client.stopInterval();
        expect(client.refreshInterval).to.be.null;
      });
    });

    describe("#login()", () => {
      it("Starts the interval if persist key has been passed", () => {
        client.login({
          email: "testing@example.com",
          password: "testPassword",
          persist: true,
          url: "https://demo-api.getdirectus.com",
        });

        expect(client.refreshInterval).to.be.not.null;

        // cleanup
        client.logout();
      });

      /**
       * FIXME: [ERR_STABLE]
       */
      it.skip("Does not start the interval without the persist key", () => {
        client.login({
          email: "testing@example.com",
          password: "testPassword",
          url: "https://demo-api.getdirectus.com",
        });

        expect(client.refreshInterval).to.be.null;
      });
    });

    describe("#logout()", () => {
      it("Removes any interval on logout", () => {
        client.login({
          email: "testing@example.com",
          password: "testPassword",
          persist: true,
          url: "https://demo-api.getdirectus.com",
        });

        client.logout();

        expect(client.refreshInterval).to.be.null;
      });
    });

    describe("#requestPasswordReset()", () => {
      beforeEach(() => {
        sinon.stub(client, "post");
      });

      afterEach(() => {
        client.post.restore();
      });

      it("Errors when email parameter is missing", () => {
        expect(client.requestPasswordReset).to.throw();
      });

      /**
       * FIXME: [ERR_STABLE]
       */
      it.skip("Calls post sending the required body", () => {
        client.requestPasswordReset("test@example.com");
        expect(client.post).to.have.been.calledWith("/auth/reset-request", {
          email: "test@example.com",
          instance: "https://demo-api.getdirectus.com",
        });
      });
    });

    it("Fires refreshIfNeeded() every 10 seconds", () => {
      client.login({
        email: "testing@example.com",
        password: "testPassword",
        persist: true,
        url: "https://demo-api.getdirectus.com",
      });

      expect(client.refreshIfNeeded).to.have.not.been.called;

      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });

      this.clock.tick(11000);

      expect(client.refreshIfNeeded).to.have.been.calledOnce;

      this.clock.tick(11000);

      expect(client.refreshIfNeeded).to.have.been.calledTwice;
    });
  });

  describe("#loggedIn", () => {
    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Returns true if the client has a valid accesstoken, url, env, and is not expired", () => {
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });
      expect(client.loggedIn).to.equal(true);
    });
    /**
     * FIXME: [ERR_STABLE]
     */
    it.skip("Returns false if the accesstoken, url, or env is missing", () => {
      client.url = null;
      expect(client.loggedIn).to.equal(false);
      client.token = jwt.sign({ foo: "bar" }, "secret-string", {
        expiresIn: "20s",
        noTimestamp: true,
      });
      expect(client.loggedIn).to.equal(false);
      client.url = "https://demo-api.getdirectus.com";
      expect(client.loggedIn).to.equal(true);
    });
  });
});
