const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
let token
beforeAll(async () => await connect());

beforeEach(async () => {
    for (let i = 0; i < 5; i++) {
        const userData = {email: `ahoj${i}@ahoj.cz`, password: `32131244`};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
    }
    const userData = {email: "ahoj1@ahoj.cz", password: "32131244"};
    const response = await request(app)
        .post('/user/login')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200);
    expect(response.body._id).toBeDefined();
    token = response.body._id;
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

describe('List users tests', () => {
    it('responds with list of user objects', async () => {
        const response = await request(app)
            .get(`/user`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toEqual(5);
        response.body.forEach((u) => {
            expect(u.password).toEqual("****");
            expect(u.createdAt).toBeDefined();
            expect(u._id).toBeDefined();
            expect(u.email).toBeDefined();
            expect(u.role).toBeDefined();
        });
    });
});