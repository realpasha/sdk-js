import * as chai from "chai";
import { Configuration } from '../src/Configuration';
import { mockStorage } from './mock/storage';

const expect = chai.expect;

describe("Configuration", () => {
  describe("accessors", () => {
    describe("initial", () => {
      it("url", () => {
        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        });

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
      });

      it("token", () => {
        const config = new Configuration({
          token: "abc",
          url: "https://demo-api.getdirectus.com",
        });

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
        expect(config.token).to.equal("abc");
      });
    });

    describe("defaults", () => {
      it("project", () => {
        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        });
        expect(config.project).to.equal("_");
      });
      it("tokenExpirationTime", () => {
        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        });
        expect(config.tokenExpirationTime).to.equal(5 * 6 * 1000);
      });

      describe("custom defaults", () => {
        beforeEach(() => {
          Configuration.defaults = {
            project: "custom",
            tokenExpirationTime: 10
          };
        });

        afterEach(() => {
          Configuration.defaults = {
            project: "_",
            tokenExpirationTime: 5 * 6 * 1000
          };
        });

        it("project", () => {
          const config = new Configuration({
            url: "https://demo-api.getdirectus.com",
          });
          expect(config.project).to.equal("custom");
        });

        it("tokenExpirationTime", () => {
          const config = new Configuration({
            url: "https://demo-api.getdirectus.com",
          });
          expect(config.tokenExpirationTime).to.equal(10);
        });
      });
    });

    describe("override", () => {
      it("url", () => {
        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        });

        config.url = "https://new-demo-api.getdirectus.com";

        expect(config.url).to.equal("https://new-demo-api.getdirectus.com");
      });

      it("token", () => {
        const config = new Configuration({
          token: "abc",
          url: "https://demo-api.getdirectus.com",
        });

        config.token = "def";

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
        expect(config.token).to.equal("def");
      });
    });
  });

  describe("#constructor", () => {
    it("should construct correctly", () => {
      const config = new Configuration({
        url: "https://demo-api.getdirectus.com",
      });

      expect(config.url).to.equal("https://demo-api.getdirectus.com");
      expect(config.project).to.equal("_");
      expect(config.token).to.equal(undefined);
      expect(config.localExp).to.equal(undefined);
      expect(config.tokenExpirationTime).to.equal(5 * 6 * 1000);
    });
  });

  describe("#computed", () => {
    it("should calculate the tokenExpirationTime correctly", () => {
      const config = new Configuration({
        url: "https://demo-api.getdirectus.com",
      });

      config.tokenExpirationTime = 14; // 10s equals 840k ms
      expect(config.tokenExpirationTime).to.equal(840 * 1000);
    });
  });

  describe("#storage", () => {
    describe("hydration", () => {
      it("should not rehydrate without the persist flag", () => {
        const fakeStorage = mockStorage({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-rehydrated-api.getdirectus.com",
        });

        const config = new Configuration(
          {
            url: "https://demo-api.getdirectus.com",
            persist: undefined,
          },
          fakeStorage
        );

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
        expect(config.project).to.equal("_"); // default value
        expect(config.token).to.be.undefined;
        expect(config.localExp).to.be.undefined;
        expect(config.tokenExpirationTime).to.equal(30000); // default value
      });

      it("should rehydrate from the store if persist flag given", () => {
        const fakeStorage = mockStorage({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-api.getdirectus.com",
        });

        const config = new Configuration(
          {
            url: "https://demo-api.getdirectus.com",
            persist: true,
          },
          fakeStorage
        );

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
        expect(config.project).to.equal(fakeStorage.values.project);
        expect(config.token).to.equal(fakeStorage.values.token);
        expect(config.localExp).to.equal(fakeStorage.values.localExp);
        expect(config.tokenExpirationTime).to.equal(fakeStorage.values.tokenExpirationTime);
      });

      it("should replace the previously stored token always", () => {
        const fakeStorage = mockStorage({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          persist: true,
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-api.getdirectus.com",
        });

        const config = new Configuration(
          {
            url: "https://demo-api.getdirectus.com",
            persist: true,
          },
          fakeStorage
        );

        expect(config.token).to.equal("abcdef");

        config.token = "fedcab";
        expect(config.token).to.equal("fedcab");

        config.token = "ghijklm";
        expect(config.token).to.equal("ghijklm");
      });

      it("should override rehydrated values on set", () => {
        const fakeStorage = mockStorage({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-api.getdirectus.com",
        });

        const config = new Configuration(
          {
            url: "https://demo-api.getdirectus.com",
            persist: true,
          },
          fakeStorage
        );

        expect(config.url).to.equal("https://demo-api.getdirectus.com");
        expect(config.project).to.equal(fakeStorage.values.project);
        expect(config.token).to.equal(fakeStorage.values.token);
        expect(config.localExp).to.equal(fakeStorage.values.localExp);
        expect(config.tokenExpirationTime).to.equal(fakeStorage.values.tokenExpirationTime);

        config.token = "ghijklm";
        config.project = "updated";
        config.tokenExpirationTime = 5 * 6 * 1000;

        expect(fakeStorage.values.token).to.equal(config.token);
        expect(fakeStorage.values.project).to.equal(config.project);
        expect(fakeStorage.values.tokenExpirationTime).to.equal(config.tokenExpirationTime);
      });
    });
  });
});
