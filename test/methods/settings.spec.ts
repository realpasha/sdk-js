// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Settings', () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      url: 'https://demo-api.getdirectus.com',
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client, 'get').resolves(responseJSON);
    sinon.stub(client, 'put').resolves(responseJSON);
    sinon.stub(client, 'patch').resolves(responseJSON);
    sinon.stub(client, 'post').resolves(responseJSON);
    sinon.stub(client, 'delete').resolves(responseJSON);
  });

  afterEach(() => {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe('#getSettings()', () => {
    it('Defaults to an empty object if no parameters are passed', () => {
      client.getSettings();
      expect(client.get).to.have.been.calledWith('/settings', {});
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getSettings('params')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getSettings({ limit: 50 });
      expect(client.get).to.have.been.calledWith('/settings', {
        limit: 50,
      });
    });
  });
});
