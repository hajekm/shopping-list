const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const tokenModel = require('../model/token');
const Token = require("../model/token");
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

describe('Auth middleware tests', () => {
    it('responds with unauthorized error token invalid objectId format', async () => {
        const response = await request(app)
            .get(`/user`)
            .set('Authorization', `Bearer dkdoe`)
            .send()
            .expect('Content-Type', /json/)
            .expect(401);
        expect(response.body.message).toEqual("unauthorized");
    });

    it('responds with unauthorized error token not found', async () => {
        const response = await request(app)
            .get(`/user`)
            .set('Authorization', `Bearer 659096bbc5b22975df88719a`)
            .send()
            .expect('Content-Type', /json/)
            .expect(401);
        expect(response.body.message).toEqual("unauthorized");
    });

    it('responds with unauthorized error token expired', async () => {
        now = new Date();
        now.setDate(now.getDate() - 1); //for better testing
        const token = new Token({expiresAt: now, _ownerId: user._id});
        await token.save();
        const response = await request(app)
            .get(`/user`)
            .set('Authorization', `Bearer ${token._id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(401);
        expect(response.body.message).toEqual("unauthorized");
    });

    it('responds with insufficient rights due to role', async () => {
        const response = await request(app)
            .delete(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("insufficient rights");
    });
});