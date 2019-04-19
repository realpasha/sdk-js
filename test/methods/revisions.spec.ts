// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Revisions', () => {
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

  describe('#getItemRevisions()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getItemRevisions).to.throw();
    });

    it('Errors on missing `primaryKey` parameter', () => {
      expect(() => client.getItemRevisions('projects')).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getItemRevisions('projects', 15, 140)).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getItemRevisions('projects', 15, {
        fields: ['title', 'author'],
      });
      expect(client.get).to.have.been.calledWith('/items/projects/15/revisions', { fields: ['title', 'author'] });
    });

    it('Calls get() for the system endpoint if a directus_* table is requested', () => {
      client.getItemRevisions('directus_users', 15, {
        fields: ['title', 'author'],
      });
      expect(client.get).to.have.been.calledWith('/users/15/revisions', {
        fields: ['title', 'author'],
      });
    });
  });

  describe('#revert()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.revert).to.throw();
    });

    it('Errors on missing `primaryKey` parameter', () => {
      expect(() => client.revert('projects')).to.throw();
    });

    it('Errors on missing `revisionID` parameter', () => {
      expect(() => client.revert('projects', 15)).to.throw();
    });

    it('Calls patch() for the right endpoint', () => {
      client.revert('projects', 15, 130);
      expect(client.patch).to.have.been.calledWith('/items/projects/15/revert/130');
    });

    it('Calls patch() for the system endpoint if a directus_* table is requested', () => {
      client.revert('directus_users', 15, 130);
      expect(client.patch).to.have.been.calledWith('/users/15/revert/130');
    });
  });
});
