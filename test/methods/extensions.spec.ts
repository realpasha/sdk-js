// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Items', () => {
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

    sinon.stub(client, 'request').resolves(responseJSON);
  });

  afterEach(() => {
    client.request.restore();
  });

  describe('#getInterfaces()', () => {
    it('Calls request() for the right endpoint', () => {
      client.getInterfaces();
      expect(client.request).to.have.been.calledWith('get', '/interfaces', {}, {}, true);
    });
  });

  describe('#getLayouts()', () => {
    it('Calls request() for the right endpoint', () => {
      client.getLayouts();
      expect(client.request).to.have.been.calledWith('get', '/layouts', {}, {}, true);
    });
  });

  describe('#getPages()', () => {
    it('Calls request() for the right endpoint', () => {
      client.getPages();
      expect(client.request).to.have.been.calledWith('get', '/pages', {}, {}, true);
    });
  });
});
