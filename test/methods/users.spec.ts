// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Users', () => {
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
    sinon.stub(client, 'updateItem').resolves(responseJSON);
  });

  afterEach(() => {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
    client.updateItem.restore();
  });

  describe('#getUsers()', () => {
    it('Defaults to an empty object if no parameters are passed', () => {
      client.getUsers();
      expect(client.get).to.have.been.calledWith('/users', {});
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getUsers('params')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getUsers({ limit: 50 });
      expect(client.get).to.have.been.calledWith('/users', { limit: 50 });
    });
  });

  describe('#getUser()', () => {
    it('Errors on missing `primaryKey` parameter', () => {
      expect(client.getUser).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getUser('projects', 140)).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getUser(15, { fields: 'first_name' });
      expect(client.get).to.have.been.calledWith('/users/15', {
        fields: 'first_name',
      });
    });
  });

  describe('#getMe()', () => {
    it('Defaults to an empty object if no parameters are passed', () => {
      client.getMe();
      expect(client.get).to.have.been.calledWith('/users/me', {});
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getMe(140)).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getMe({ fields: 'first_name' });
      expect(client.get).to.have.been.calledWith('/users/me', {
        fields: 'first_name',
      });
    });
  });

  describe('#updateUser()', () => {
    it('Errors on missing `primaryKey` parameter', () => {
      expect(client.updateUser).to.throw();
    });

    it('Errors on missing `body` parameter', () => {
      expect(() => client.updateUser(15)).to.throw();
    });

    it('Calls #updateItem()', () => {
      client.updateUser(15, { last_page: '/activity' });
      expect(client.updateItem).to.have.been.calledWith('directus_users', 15, {
        last_page: '/activity',
      });
    });
  });
});
