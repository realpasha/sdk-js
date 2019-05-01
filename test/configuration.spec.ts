import * as chai from "chai";
import { Configuration } from "../src/Configuration";

const expect = chai.expect;

const fakeStorageFor = (fakeStorage: any): any => {
  let internalFakeStorage = fakeStorage;

  return {
    values: internalFakeStorage,
    getItem() {
      return JSON.stringify(internalFakeStorage);
    },
    setItem(values: any) {
      internalFakeStorage = values;
    },
  };
};

describe("Configuration", () => {
  describe("#constructor", () => {
    it("should construct correctly without storage", () => {
      const config = new Configuration({
        url: "https://demo-api.getdirectus.com",
      });

      expect(config.url).to.equal("https://demo-api.getdirectus.com");
      expect(config.project).to.equal("_");
      expect(config.token).to.equal(undefined);
      expect(config.localExp).to.equal(undefined);
      expect(config.tokenExpirationTime).to.equal(5 * 6 * 1000);
    });

    it("should rehydrate from the store if given", () => {
      const fakeStorage = fakeStorageFor({
        localExp: new Date().getTime(),
        project: "rehydration",
        token: "abcdef",
        tokenExpirationTime: 10 * 6 * 1000,
        url: "https://demo-api.getdirectus.com",
      });

      const config = new Configuration({
        url: "https://demo-api.getdirectus.com",
      }, fakeStorage);

      expect(config.url).to.equal("https://demo-api.getdirectus.com");
      expect(config.project).to.equal(fakeStorage.values.project);
      expect(config.token).to.equal(fakeStorage.values.token);
      expect(config.localExp).to.equal(fakeStorage.values.localExp);
      expect(config.tokenExpirationTime).to.equal(fakeStorage.values.tokenExpirationTime);
    });
  });

  describe("#set", () => {
    it("should update the store on config updates if provided", () => {
      it("should rehydrate from the store if given", () => {
        const fakeStorage = fakeStorageFor({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-api.getdirectus.com",
        });

        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        }, fakeStorage);

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

      it("should replace the previously stored token anyways", () => {
        const fakeStorage = fakeStorageFor({
          localExp: new Date().getTime(),
          project: "rehydration",
          token: "abcdef",
          tokenExpirationTime: 10 * 6 * 1000,
          url: "https://demo-api.getdirectus.com",
        });

        const config = new Configuration({
          url: "https://demo-api.getdirectus.com",
        }, fakeStorage);

        expect(config.token).toEqual("abcdef");

        config.token = "fedcab";
        expect(config.token).toEqual("fedcab");

        config.token = "ghijklm";
        expect(config.token).toEqual("ghijklm");
      });
    });
  });
});
