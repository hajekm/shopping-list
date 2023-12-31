const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
let token
let user
beforeAll(async () => await connect());

beforeEach(async () => {
    const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
    const uResponse = await request(app)
        .post('/user')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200);
    user = uResponse.body;
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

describe('Get user tests', () => {
    it('responds with requested user object', async () => {
        const response = await request(app)
            .get(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.createdAt).toEqual(user.createdAt);
        expect(response.body._id).toEqual(user._id);
        expect(response.body.email).toEqual(user.email);
        expect(response.body.password).toEqual("****");
        expect(response.body.role).toEqual(user.role);
    });

    it('responds with invalid user id', async () => {
        const response = await request(app)
            .get(`/user/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid User ID");
    });

    it('responds with insufficient rigts', async () => {
        const response = await request(app)
            .get(`/user/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });

    it('responds with user not found', async () => {
        await userModel.findByIdAndDelete(user._id);
        const response = await request(app)
            .get(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("User not found");
    });
});