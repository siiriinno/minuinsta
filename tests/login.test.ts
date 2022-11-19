import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser = {
  username: "Marikene",
  password: "test"
};

const wrongUser = {
  email: 'wrong@wrong.ee',
  password: 'wrongpassword',
};

describe('Login controller', () => {
  describe('POST /login', () => {
    it('responds with errormessage and statusCode 404', async () => {
      const response = await request(app).post('/login').send(wrongUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Token not found.');

    });
    it('responds with etoken and statusCode 200', async () => {
      const login = await request(app).post('/login').send(adminUser);
      const token = login.body.token;
      expect(login.statusCode).to.equal(200);
      expect(login.body).to.be.a('object');
      expect(login.body.success).to.be.true;
      expect(login.body.token).to.be.a('string');
      //done();
    });
  });
});
