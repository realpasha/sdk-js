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

  describe('#createItem()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.createItem).to.throw();
    });

    it('Errors on missing `body` parameter', () => {
      expect(() => client.createItem('projects')).to.throw();
    });

    it('Calls post() for the right endpoint', () => {
      client.createItem('projects', { title: 'Groetjes uit NYC' });
      expect(client.post).to.have.been.calledWith('/items/projects', {
        title: 'Groetjes uit NYC',
      });
    });

    it('Calls post() for the system endpoint if a directus_* table is requested', () => {
      client.createItem('directus_users', { title: 'Groetjes uit NYC' });
      expect(client.post).to.have.been.calledWith('/users', {
        title: 'Groetjes uit NYC',
      });
    });
  });

  describe('#updateItems()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.updateItems).to.throw();
    });

    it('Errors on missing `body` parameter', () => {
      expect(() => client.updateItems('projects')).to.throw();
    });

    it('Calls patch() for the right endpoint', () => {
      client.updateItems('projects', [{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
      expect(client.patch).to.have.been.calledWith('/items/projects', [{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
    });

    it('Calls patch() for the system endpoint if a directus_* table is requested', () => {
      client.updateItems('directus_users', [{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
      expect(client.patch).to.have.been.calledWith('/users', [{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
    });
  });

  describe('#updateItem()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.updateItem).to.throw();
    });

    it('Errors on missing `primaryKey` parameter', () => {
      expect(() => client.updateItem('projects')).to.throw();
    });

    it('Errors on missing `body` parameter', () => {
      expect(() => client.updateItem('projects', '15')).to.throw();
    });

    it('Calls patch() for the right endpoint', () => {
      client.updateItem('projects', '15', { title: 'Groetjes uit NYC' });
      expect(client.patch).to.have.been.calledWith('/items/projects/15', {
        title: 'Groetjes uit NYC',
      });
    });

    it('Calls patch() for the system endpoint if a directus_* table is requested', () => {
      client.updateItem('directus_users', '15', {
        title: 'Groetjes uit NYC',
      });
      expect(client.patch).to.have.been.calledWith('/users/15', {
        title: 'Groetjes uit NYC',
      });
    });
  });

  describe('#getItems()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getItems).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getItems('projects', 'params')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getItems('projects', { limit: 50 });
      expect(client.get).to.have.been.calledWith('/items/projects', {
        limit: 50,
      });
    });

    it('Calls get() for the system endpoint if a directus_* table is requested', () => {
      client.getItems('directus_users', { limit: 50 });
      expect(client.get).to.have.been.calledWith('/users', { limit: 50 });
    });
  });

  describe('#getItem()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getItem).to.throw();
    });

    it('Errors on missing `primaryKey` parameter', () => {
      expect(() => client.getItem('projects')).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getItem('projects', 15, 140)).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getItem('projects', 15, { fields: ['title', 'author'] });
      expect(client.get).to.have.been.calledWith('/items/projects/15', {
        fields: ['title', 'author'],
      });
    });

    it('Calls get() for the system endpoint if a directus_* table is requested', () => {
      client.getItem('directus_users', 15, {
        fields: ['title', 'author'],
      });
      expect(client.get).to.have.been.calledWith('/users/15', {
        fields: ['title', 'author'],
      });
    });
  });

  describe('#deleteItem()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.deleteItem).to.throw();
    });

    it('Errors on missing `primaryKey` parameter', () => {
      expect(() => client.deleteItem('projects')).to.throw();
    });

    it('Calls delete() for the right endpoint', () => {
      client.deleteItem('projects', 15);
      expect(client.delete).to.have.been.calledWith('/items/projects/15');
    });

    it('Calls delete() for the system endpoint if a directus_* table is requested', () => {
      client.deleteItem('directus_users', 15);
      expect(client.delete).to.have.been.calledWith('/users/15');
    });
  });

  describe('#deleteItems()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.deleteItems).to.throw();
    });

    it('Errors on missing `primaryKeys` parameter', () => {
      expect(() => client.deleteItems('projects')).to.throw();
    });

    it('Calls delete() for the right endpoint', () => {
      client.deleteItems('projects', [15, 21]);
      expect(client.delete).to.have.been.calledWith('/items/projects/15,21');
    });

    it('Calls delete() for the system endpoint if a directus_* table is requested', () => {
      client.deleteItems('directus_users', [15, 21]);
      expect(client.delete).to.have.been.calledWith('/users/15,21');
    });
  });
});
