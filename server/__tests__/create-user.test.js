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

describe('Create user tests', () => {
    it('responds with new user object', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.createdAt).toBeDefined();
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toEqual(userData.email);
        expect(response.body.password).toEqual("****");
        expect(response.body.role).toEqual("user");
    });

    it('responds with password minLength error', async () => {
        const userData = {email: "ahoj@ahoj.cz", password: "1"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("minLength");
        expect(response.body.reason[0].message).toEqual("must NOT have fewer than 5 characters");
    });

    it('responds with password required error', async () => {
        const userData = {email: "ahoj@ahoj.cz"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'password'");
    });

    it('responds with email required error', async () => {
        const userData = {password: "32131244"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'email'");
    });

    it('responds with email format error', async () => {
        const userData = {email: "ahojahoj.cz", password: "32131244"};
        const response = await request(app)
            .post('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("format");
        expect(response.body.reason[0].message).toEqual("must match format \"email\"");
    });

});