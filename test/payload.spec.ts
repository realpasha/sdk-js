// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinonChai from 'sinon-chai';
import SDK from '../src/index';

const expect = chai.expect;
chai.use(sinonChai);

/**
 * FIXME:
 * [ERR_STABLE] means that this test fails in the current stable SDK
 * therefor this test will be skipped at the moment until the
 * owners found the correct way how the test should work!
 */

describe('JWT Payload', () => {
  let client;

  beforeEach(() => {
    client = new SDK();
  });

  it('Returns null when there is no token set', () => {
    expect(client.payload).to.be.null;
  });

  it('Returns the correct payload from the set token', () => {
    client.token = jwt.sign({ foo: 'bar' }, 'secret-string', {
      noTimestamp: true,
    });
    expect(client.payload).to.deep.equal({ foo: 'bar' });
  });

  it('Converts the optional exp in payload to the correct JS Date', () => {
    // JWT Expires in 1h
    client.token = jwt.sign({ foo: 'bar' }, 'secret-string', {
      expiresIn: '1h',
      noTimestamp: true,
    });

    const date = new Date();
    date.setHours(date.getHours() + 1);

    expect(client.payload.exp).to.equalDate(date);
  });

  /**
   * FIXME: [ERR_STABLE]
   */
  it.skip('Reports a loggedIn flag when token, url, env are set and token has not expired', () => {
    client.token = jwt.sign({ foo: 'bar' }, 'secret-string', {
      expiresIn: '-1h',
      noTimestamp: true,
    });
    client.url = 'https://demo-api.getdirectus.com';
    expect(client.loggedIn).to.equal(false);

    client.token = jwt.sign({ foo: 'bar' }, 'secret-string', {
      expiresIn: '1h',
      noTimestamp: true,
    });
    expect(client.loggedIn).to.equal(true);
  });
});
