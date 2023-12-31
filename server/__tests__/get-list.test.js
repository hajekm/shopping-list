const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
const listModel = require("../model/list");
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

describe('Get list tests', () => {
    it('responds with requested list object', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .get(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.createdAt).toEqual(new Date(list.createdAt).toISOString());
        expect(response.body._id).toEqual(list._id.toString());
        expect(response.body.title).toEqual(list.title);
        expect(response.body._ownerId).toEqual(list._ownerId.toString());
        expect(response.body.members.length).toBeGreaterThan(0);
        expect(response.body.members[0].createdAt).toEqual(user.createdAt);
        expect(response.body.members[0]._id).toEqual(user._id);
        expect(response.body.members[0].email).toEqual(user.email);
        expect(response.body.members[0].password).toEqual("****");
        expect(response.body.members[0].role).toEqual(user.role);
        expect(response.body.status).toEqual(list.status);
    });

    it('responds with invalid list id', async () => {
        const response = await request(app)
            .put(`/list/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid List ID");
    });

    it('responds with list not found', async () => {
        const response = await request(app)
            .get(`/list/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
    });

    it('responds with user not found', async () => {
        const userData = {email: "abcd@bcda.cz", password: "ewdewf324"}
        const newUser = new userModel(userData);
        await newUser.save();
        const listData = {title: "test", members: [newUser], _ownerId: newUser._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .get(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });
});