const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('../controller/list-controller');
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
app.use("/list", listRouter);

describe('Create list tests', () => {
    it('responds with new list object', async () => {
        const listData = {title: "test"}
        const response = await request(app)
            .post(`/list`)
            .set('Authorization', `Bearer ${token}`)
            .send(listData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.createdAt).toBeDefined();
        expect(response.body._id).toBeDefined();
        expect(response.body.title).toEqual(listData.title);
        expect(response.body._ownerId).toEqual(user._id);
        expect(response.body.members.length).toBeGreaterThan(0);
        expect(response.body.members[0].createdAt).toEqual(user.createdAt);
        expect(response.body.members[0]._id).toEqual(user._id);
        expect(response.body.members[0].email).toEqual(user.email);
        expect(response.body.members[0].username).toEqual(user.username);
        expect(response.body.members[0].role).toEqual(user.role);
        expect(response.body.status).toEqual("new");
    });

    it('responds with title minLength error', async () => {
        const listData = {title: "t"}
        const response = await request(app)
            .post('/list')
            .set('Authorization', `Bearer ${token}`)
            .send(listData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("minLength");
        expect(response.body.reason[0].message).toEqual("must NOT have fewer than 3 characters");
    });

    it('responds with title required error', async () => {
        const response = await request(app)
            .post('/list')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'title'");
    });

    it('responds with owner not found error', async () => {
        await userModel.findByIdAndDelete(user._id);
        const listData = {title: "test"}
        const response = await request(app)
            .post('/list')
            .set('Authorization', `Bearer ${token}`)
            .send(listData)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("Owner not found");
    });
});