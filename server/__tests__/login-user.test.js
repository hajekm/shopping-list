const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

describe('Login user tests', () => {
    it('responds with new token object', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response2 = await request(app)
            .post('/user/login')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const now = new Date();
        now.setDate(now.getDate() + 7);
        expect(response2.body._id).toBeDefined();
        expect(response2.body.createdAt).toBeDefined();
        expect(new Date(response2.body.expiresAt).getFullYear()).toBeGreaterThanOrEqual(now.getFullYear());
        expect(new Date(response2.body.expiresAt).getMonth()).toBeGreaterThanOrEqual(now.getMonth());
        expect(new Date(response2.body.expiresAt).getDate()).toBeGreaterThanOrEqual(now.getDate());
        expect(response.body._id).toEqual(response2.body._ownerId);
    });

    it('responds with invalid credentials - email', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const loginData = {email: "ahoj@aj.cz", password: "32131244"};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response = await request(app)
            .post('/user/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid credentials");
    });

    it('responds with invalid credentials - password', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const loginData = {email: "ahoj@ahoj.cz", password: "32244"};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response = await request(app)
            .post('/user/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid credentials");
    });

    it('responds with email format error', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const loginData = {email: "ahojoj.cz", password: "32131244"};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response = await request(app)
            .post('/user/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("format");
        expect(response.body.reason[0].message).toEqual("must match format \"email\"");
    });

    it('responds with email required error', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const loginData = {password: "32131244"};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response = await request(app)
            .post('/user/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'email'");
    });

    it('responds with password required error', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const loginData = {email: "ahoj@ahoj.cz"};
        await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        const response = await request(app)
            .post('/user/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'password'");
    });

});