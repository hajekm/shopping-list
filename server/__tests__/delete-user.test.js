const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controller/user-controller');
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const listModel = require('../model/list');
const userModel = require('../model/user');
const tokenModel = require('../model/token');
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
    user.role = "admin";
    await userModel.findByIdAndUpdate(user._id, user, {
        new: true,
    });
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

describe('Delete user tests', () => {
    it('responds with ok', async () => {
        const prevTokens = await tokenModel.find({_ownerId: user._id});
        expect(prevTokens.length).toBeGreaterThan(0);
        await request(app)
            .delete(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        const tokens = await tokenModel.find({_ownerId: user._id});
        expect(tokens.length).toEqual(0);
    });

    it('responds with invalid user id', async () => {
        const response = await request(app)
            .delete(`/user/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid User ID");
    });

    it('responds with insufficient rigts', async () => {
        const listprep = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listprep)
        await list.save();

        const response = await request(app)
            .delete(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Cannot delete user still member of active list");
    });
});