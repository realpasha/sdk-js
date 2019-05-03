import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

describe("Activity", () => {
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

  describe("#getActivity()", () => {
    it("Defaults to an empty object if no parameters are passed", () => {
      client.getActivity();
      expect(client.api.get).to.have.been.calledWith("/activity", {});
    });

    it("Errors if parameter `params` is of a wrong type", () => {
      expect(() => client.getActivity("params" as any)).to.throw();
    });

    it("Calls get() for the right endpoint", () => {
      client.getActivity({ limit: 50 });
      expect(client.api.get).to.have.been.calledWith("/activity", {
        limit: 50,
      });
    });
  });
});
