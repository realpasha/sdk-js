// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Relations', () => {
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

  describe('#getCollectionRelations()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getCollectionRelations).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getCollectionRelations('projects', 'params')).to.throw();
    });

    it('Calls get() twice', async () => {
      client.getCollectionRelations('projects', { limit: 50 });
      // tslint:disable-next-line: no-unused-expression
      expect(client.get).to.have.been.calledTwice;
    });
  });
});
