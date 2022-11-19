import request from 'supertest';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import app from '../src/app';

const adminUser = {
    username: 'Marikene',
    password: 'test',
};

describe('Posts controller', () => {
        it('Get latest, responds with array and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).get('/posts/latest').set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('array');
            expect(response.statusCode).to.equal(200);
        });

        it('Get post, responds with object and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).get("/posts/119").set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });

        it('Create post, responds with object and statusCode 201', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app)
                .post("/posts/")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "locationName": "Tartu"
                });
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
        });

});
