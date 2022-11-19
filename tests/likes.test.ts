import request from 'supertest';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import app from '../src/app';

const adminUser = {
    username: 'Marikene',
    password: 'test',
};

describe('Likes controller', () => {
        it('Get likes count, responds with number and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).get('/likes/88').set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('number');
            expect(response.statusCode).to.equal(200);
        });

        it('Add like, responds with object and statusCode 201', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).post("/likes/153").set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
        });

        it('Delete like, responds with object and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app)
                .delete("/likes/153")
                .set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });

});
