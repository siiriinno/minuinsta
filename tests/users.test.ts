import request from 'supertest';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import app from '../src/app';

const adminUser = {
    username: 'Marikene',
    password: 'test',
};

describe('Users controller', () => { //testid kasutaja endpointide kontrolliks
    describe('GET /users/:id', () => {
        it('responds with object and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).get('/users/19').set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });
        it('responds with object and statusCode 404', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).get('/users/-19').set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(404);
        });
        it('sisselogimata kasutaja test ja statusCode 401', async () => {
            const response = await request(app).get('/users/19');
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(401);
        });
    });
    describe('Kasutajate jälgimine', () => { //testid jälgitavate kontrolliks
        it('responds with message and statusCode 201', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).post("/users/following/119").set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
        });
        it('responds with message and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app).delete("/users/following/119").set('Authorization', `Bearer ${token}`);
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });
    });
    describe('PUT /users/:id', () => { //kasutajate muutmise testimine
        it('responds with message and statusCode 200', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app)
                .put("/users/119")
                .set('Authorization', `Bearer ${token}`)
                .send({
                "email": "newEmail@gmail.com"
            });
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(200);
        });
    });
    describe('POST /users/', () => {  //kasutajate lisamise test
        it('responds with message and statusCode 201', async () => {
            const login = await request(app).post('/login').send(adminUser);
            const token = login.body.token;
            const response = await request(app)
                .post("/users/")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "Mari",
                    "username": "Marikene2",
                    "genderID": 2,
                    "bio": "Tere Insta" ,
                    "password": "test"
                });
            expect(response.body).to.be.a('object');
            expect(response.statusCode).to.equal(201);
        });
    });
});
